//SplitView.tsx

import React, { useContext } from "react";
import { NodeSmall, NodeIcon, NodeTitle } from "@/app/Node/NodeStyles";
import { NodeContext } from "../NodeState";
import SplitImg from "./split.svg";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";

interface Props {
  selectNode: () => void;
}

/**
 * The view for the Split node.
 * @returns A NodeSmall component.
 * */
function SplitView(props: Props) {
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
