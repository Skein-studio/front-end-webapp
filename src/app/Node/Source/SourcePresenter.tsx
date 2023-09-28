//SourcePresenter.tsx
import React, { useContext } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { useReactFlow } from "reactflow";
import { useUI } from "../GraphFunctions";

/**
 * The presenter for the Source node.
 * @returns A SourceView component.
 * */
function SourcePresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const ui = useUI();

  function selectNode() {
    ui.selectNode(node);
  }

  return <SourceView selectNode={selectNode} />;
}

export default SourcePresenter;
