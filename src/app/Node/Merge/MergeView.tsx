//MergeView.tsx

import React, { useContext } from "react";
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import {
  NodeSmall,
  NodeIcon,
  NodeTitle,
  StyledHandle,
} from "@/app/Util/Flow/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";

import MergeImg from "./merge.svg";
import { styled } from "styled-components";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";

interface SplitViewProps {
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
  addTargetHandle: () => void;
}

function MergeView({
  numberOfSourceHandles,
  numberOfTargetHandles,
  addTargetHandle,
}: SplitViewProps) {
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  function selectNode() {
    graph.selectNode(node);
  }
  function renderButton() {
    if (node!.inputs!.length < 10) {
      // If the number of inputs is less than 10, then the button is enabled
      return <AddButton onClick={addTargetHandle}>+</AddButton>;
    } else {
      return <AddButton disabled={true}>+</AddButton>;
    }
  }

  return (
    <NodeSmall
      widthextension={GetWidthExtension(node)}
      selected={node?.selected ?? false}
      onClick={selectNode}
    >
      {GenerateHandles(node)}

      <NodeIcon src={MergeImg}></NodeIcon>
      <NodeTitle>merge</NodeTitle>

      <Container>{renderButton()}</Container>
    </NodeSmall>
  );
}

const AddButton = styled.button`
  position: absolute;
  top: 5px;
  right: 5px;
  border-radius: 50%;
  font-family: "verdana";
`;

export default MergeView;
