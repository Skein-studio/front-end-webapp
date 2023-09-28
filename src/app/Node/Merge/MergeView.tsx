//MergeView.tsx

import React, { useContext } from "react";
import { NodeSmall, NodeIcon, NodeTitle } from "@/app/Node/NodeStyles";
import { NodeContext } from "../NodeState";
import MergeImg from "./merge.svg";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";
import { useUI } from "../GraphFunctions";

/**
 * The view for the Merge node.
 * @returns A NodeSmall component.
 * */
function MergeView() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const ui = useUI();

  function selectNode() {
    ui.selectNode(node);
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
