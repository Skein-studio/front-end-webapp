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

export function GenerateHandles(node: NodeState | undefined) {
  if (!node) {
    return null;
  }

  function createOutputHandles() {
    const handles = [];
    if (node!.outputs) {
      for (let i = 0; i < node!.outputs.length; i++) {
        handles.push(
          <HandleSpacing key={i} handletype="source" offset={i}>
            <StyledHandle
              handleType="source"
              position={Position.Bottom}
              id={node!.outputs[i]}
            />
          </HandleSpacing>
        );
      }
    }
    return handles;
  }

  function createInputHandles() {
    const handles = [];
    if (node!.inputs) {
      for (let i = 0; i < node!.inputs.length; i++) {
        handles.push(
          <HandleSpacing key={i} handletype="target" offset={i}>
            <StyledHandle
              handleType="target"
              position={Position.Top}
              id={node!.inputs[i]}
            
            />
          </HandleSpacing>
        );
      }
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
  if (!node.inputs) {
    if (node.outputs) {
      length = node.outputs.length;
    }
  } else if (!node.outputs) {
    if (node.inputs) {
      length = node.inputs.length;
    }
  } else {
    length =
      node.inputs.length > node.outputs.length
        ? node.inputs.length
        : node.outputs.length;
    if (length > 5) {
      console.log(length);
      return (length - 5) * 50; // 50 is the width of a handle and 5 is the number of handles that fit in the default width
    }
  }
  return 0;
}
