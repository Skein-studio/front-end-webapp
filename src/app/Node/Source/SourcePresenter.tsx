//SourcePresenter.tsx
import React, { useContext, useEffect } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { SourceType } from "@/app/Util/modelTransformation";
import { useGraph } from "../GraphContext";

function SourcePresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData = node.model.Data as SourceType;
  const graph = useGraph();

  function selectNode() {
    graph.selectNode(node);
  }

  return <SourceView selectNode={selectNode} />;
}

export default SourcePresenter;
