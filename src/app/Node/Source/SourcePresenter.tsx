//SourcePresenter.tsx
import React, { useContext } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

function SourcePresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const graph = useGraph();

  function selectNode() {
    graph.selectNode(node);
  }

  return <SourceView selectNode={selectNode} />;
}

export default SourcePresenter;
