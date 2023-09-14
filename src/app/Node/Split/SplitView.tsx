//SplitView.tsx

import React, { useContext } from "react";
import { NodeSmall, NodeIcon, NodeTitle } from "@/app/Node/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import SplitImg from "./split.svg";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";

interface Props {
  selectNode: () => void;
}


function SplitView(props:Props) {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;

  return (
    <NodeSmall
      widthextension={GetWidthExtension(node)}
      selected={node.selected ?? false}
      onClick={props.selectNode}
    >
      {GenerateHandles(node, true)}

      <NodeIcon src={SplitImg}></NodeIcon>
      <NodeTitle>split</NodeTitle>
    </NodeSmall>
  );
}

export default SplitView;
