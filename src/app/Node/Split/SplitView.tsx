//SplitView.tsx

import React, { useContext } from "react";
import { NodeSmall, NodeIcon, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import SplitImg from "./split.svg";
import { Position } from "reactflow";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";

interface SplitViewProps {
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
}

function SplitView({
  numberOfSourceHandles,
  numberOfTargetHandles,
}: SplitViewProps) {
  const graph = useGraph();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;

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

      <NodeIcon src={SplitImg}></NodeIcon>
      <NodeTitle>split</NodeTitle>
    </NodeSmall>
  );
}

export default SplitView;
