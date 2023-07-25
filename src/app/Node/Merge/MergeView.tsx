//MergeView.tsx

import React, { useContext } from "react";
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeIcon, NodeTitle, StyledHandle } from "@/app/Util/Flow/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";

import MergeImg from "./merge.svg";
import { Handle, Position } from "reactflow";

interface SplitViewProps {
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
  addTargetHandle: () => void;
}

function MergeView({
  numberOfSourceHandles,
  numberOfTargetHandles,
  addTargetHandle,
} : SplitViewProps){
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

      <NodeIcon src={MergeImg}></NodeIcon>
      <NodeTitle>merge</NodeTitle>

      <Container>
        <button onClick={addTargetHandle}>+</button>
      </Container>
      
    </NodeSmall>
  );
};

export default MergeView;
