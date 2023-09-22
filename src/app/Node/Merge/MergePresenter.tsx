//MergePresenter.tsx

import React, { useEffect, useContext } from "react";
import MergeView from "./MergeView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

/**
 * The presenter for the Merge node.
 * @returns A MergeView component.
 * */
const MergePresenter: React.FC = () => {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const graph = useGraph();

  useEffect(() => {
    // Check if all target handles are connected

    const numberOfTargetHandles = node.model.Inputs.length;
    let connectedHandles = 0;

    // Iterate over edges to find the number of connections for this node's target handles
    graph.edges.forEach((edge) => {
      if (edge.target === node.getID()) {
        connectedHandles++;
      }
    });

    // If all target handles are connected, add a new one
    if (
      numberOfTargetHandles > 0 &&
      connectedHandles == numberOfTargetHandles
    ) {
      addTargetHandle();
    }
  }, [node, graph.edges]);

  const addTargetHandle = () => {
    if (node.model.Inputs.length >= 10) {
      return;
    }
    node.addTargetHandle();
    graph.refresh();
  };

  return <MergeView />;
};

export default MergePresenter;
