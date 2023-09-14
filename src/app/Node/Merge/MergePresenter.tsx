//MergePresenter.tsx

import React, { useEffect, useContext } from "react";
import MergeView from "./MergeView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

const MergePresenter: React.FC = () => {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const graph = useGraph();

  useEffect(() => {
    // Check if all target handles are connected

    const numberOfTargetHandles = node.model.Inputs?.length || 0;
    let connectedHandles = 0;

    // Iterate over edges to find the number of connections for this node's target handles
    graph.edges.forEach((edge) => {
      if (edge.target === node.model.ID) {
        connectedHandles++;
      }
    });

    // If all target handles are connected, add a new one
    if (
      numberOfTargetHandles > 0 &&
      connectedHandles >= numberOfTargetHandles
    ) {
      addTargetHandle();
    }
  }, [node, graph.edges]);

  const addTargetHandle = () => {
    if (node.model.Inputs!.length >= 10) {
      return;
    }
    node.addTargetHandle();
    nodeContext.forceReload();
    graph.reloadComponent(); // TODO: This should be replaced, instead of reloading the whole graph, just reload the node that was changed (currently causes issues when connecting to newly added target handle)
  };

  return (
    <MergeView
      numberOfSourceHandles={node.model.Outputs.length}
      numberOfTargetHandles={node.model.Inputs.length}
      addTargetHandle={addTargetHandle}
    />
  );
};

export default MergePresenter;
