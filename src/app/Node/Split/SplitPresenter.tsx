//SplitPresenter.tsx

import React, { useContext } from "react";
import SplitView from "./SplitView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

function SplitPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const graph = useGraph();

  function selectNode() {
    graph.selectNode(node);
  }

  return <SplitView selectNode={selectNode} />;
}

export default SplitPresenter;
