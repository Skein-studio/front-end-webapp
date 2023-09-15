//MergeView.tsx

import React, { useContext } from "react";
import { NodeSmall, NodeIcon, NodeTitle } from "@/app/Node/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import MergeImg from "./merge.svg";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";

function MergeView() {
  const graph = useGraph();
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;

  function selectNode() {
    graph.selectNode(node);
  }

  return (
    <NodeSmall
      widthextension={GetWidthExtension(node)}
      selected={node.selected ?? false}
      onClick={selectNode}
    >
      {GenerateHandles(node)}

      <NodeIcon src={MergeImg}></NodeIcon>
      <NodeTitle>merge</NodeTitle>
    </NodeSmall>
  );
}

export default MergeView;
