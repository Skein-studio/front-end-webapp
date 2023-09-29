//SplitPresenter.tsx

import React, { useContext } from "react";
import SplitView from "./SplitView";
import { NodeContext } from "../NodeState";
import { useReactFlow } from "reactflow";

/**
 * The presenter for the Split node.
 * @returns A SplitView component.
 * */
function SplitPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const reactFlowInstance = useReactFlow();

  function selectNode() {
    reactFlowInstance.getNodes().forEach((n) => {
      if (n.id != node.model.ID) {
        n.data.nodeState.selected = false;
      }
    });
    node.selected = true;
  }

  return <SplitView selectNode={selectNode} />;
}

export default SplitPresenter;
