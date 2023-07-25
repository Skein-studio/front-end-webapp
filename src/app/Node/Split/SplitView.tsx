//SplitView.tsx

import React, { useContext } from "react";
import { Container } from "@/app/Util/BaseStyles";
import {
  NodeSmall,
  NodeIcon,
  NodeTitle,
  StyledHandle,
} from "@/app/Util/Flow/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";

import SplitImg from "./split.svg";
import { Handle, Position } from "reactflow";

const SmallView = () => {
  return <Container></Container>;
};

interface SplitViewProps {
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
}

function SplitView({
  numberOfSourceHandles,
  numberOfTargetHandles,
}: SplitViewProps){
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  function selectNode() {
    graph.selectNode(node);
  }

  return (
    <NodeSmall
      widthextension={0}
      selected={node?.selected ?? false}
      onClick={selectNode}
    >
      <StyledHandle handleType="target" position={Position.Top}/>
      <StyledHandle handleType="source" position={Position.Bottom}/>

      <NodeIcon src={SplitImg}></NodeIcon>
      <NodeTitle>split</NodeTitle>

      <SmallView />

    </NodeSmall>
  );
};

export default SplitView;
