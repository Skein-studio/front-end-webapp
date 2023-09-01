// Handles.tsx

import { Position } from "reactflow";
import { NodeState } from "../Node/NodeState";
import { StyledHandle, NODE_WIDTH } from "./Flow/NodeStyles";
import styled from "styled-components";

interface HandleProps {
  handletype: "source" | "target";
  offset?: number;
}

const HandleSpacing = styled.div<HandleProps>`
  position: absolute;
  top: ${(props) => (props.handletype == "source" ? "100%" : "0%")};
  left: ${(props) =>
    props.offset
      ? NODE_WIDTH / 6 + (props.offset * NODE_WIDTH) / 6 + "px"
      : NODE_WIDTH / 6 + "px"};
`;

import { purple } from "./Flow/NodeStyles";

const HandleName = styled.div` // This is the text that appears above the handle, temporary style // TODO: make this look better
  position: absolute;
  top: -20px;
  left: -15px;
  font-size: 12px;
  font-family: "verdana";
  color: ${purple};
  z-index: 100;
  `;

export function GenerateHandles(node: NodeState, displayOutputHandleNames?:boolean) {
  function createOutputHandles() {
    const handles = [];
    for (let i = 0; i < node.model.Outputs.length; i++) {
      handles.push(
        <HandleSpacing key={i} handletype="source" offset={i}>
          {displayOutputHandleNames && <HandleName>{node.model.Outputs[i].Name}</HandleName>}
          <StyledHandle
            handleType="source"
            position={Position.Bottom}
            id={node.model.Outputs[i].ID}
          />
        </HandleSpacing>
      );
    }
    return handles;
  }

  function createInputHandles() {
    const handles = [];
    for (let i = 0; i < node.model.Inputs.length; i++) {
      handles.push(
        <HandleSpacing key={i} handletype="target" offset={i}>
          <StyledHandle
            handleType="target"
            position={Position.Top}
            id={node.model.Inputs[i].ID}
          />
        </HandleSpacing>
      );
    }

    return handles;
  }

  return (
    <>
      {createOutputHandles()}
      {createInputHandles()}
    </>
  );
}

export function GetWidthExtension(node: NodeState | undefined) {
  // This is a temporary solution to the problem of nodes not being wide enough to fit all their handles
  if (!node) {
    return 0;
  }
  let length = 0;
  if (!node.model.Inputs) {
    if (node.model.Outputs) {
      length = node.model.Outputs.length;
    }
  } else if (!node.model.Outputs) {
    if (node.model.Inputs) {
      length = node.model.Inputs.length;
    }
  } else {
    length =
      node.model.Inputs.length > node.model.Outputs.length
        ? node.model.Inputs.length
        : node.model.Outputs.length;
  }
  if (length > 5) {
    return (length - 5) * 50; // 50 is the width of a handle and 5 is the number of handles that fit in the default width
  }

  return 0;
}
