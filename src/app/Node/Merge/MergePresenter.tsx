//MergePresenter.tsx

import React, { useState, useEffect, useContext } from "react";
import MergeView from "./MergeView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

const MergePresenter: React.FC = () => {
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const graph = useGraph();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {
    // Check if all target handles are connected
    if (node) {
      const numberOfTargetHandles = node?.model.Inputs?.length || 0;
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
    }
  }, [node, graph.edges]);

  const addTargetHandle = () => {
    if (node!.model.Inputs!.length >= 10) {
      return;
    }
    node!.addTargetHandle();
    setReload(!reload);
  };

  return (
    <MergeView
      numberOfSourceHandles={node?.model.Outputs?.length || 0}
      numberOfTargetHandles={node?.model.Inputs?.length || 0}
      addTargetHandle={addTargetHandle}
    />
  );
};

export default MergePresenter;
