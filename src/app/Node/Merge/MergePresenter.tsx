//MergePresenter.tsx
import { useReactFlow, useUpdateNodeInternals } from 'reactflow';
import React, { useEffect, useContext } from "react";
import MergeView from "./MergeView";
import { NodeContext } from "../NodeState";

/**
 * The presenter for the Merge node.
 * @returns A MergeView component.
 * */
const MergePresenter: React.FC = () => {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const reactFlowInstance = useReactFlow();
  const updateInternals = useUpdateNodeInternals();

  useEffect(() => {
    // Check if all target handles are connected

    const numberOfTargetHandles = node.model.Inputs.length;
    let connectedHandles = 0;

    // Iterate over edges to find the number of connections for this node's target handles
    reactFlowInstance.getEdges().forEach((edge) => {
      if (edge.target === node.model.ID) {
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

  }, [node, reactFlowInstance.getEdges()]);

  const addTargetHandle = () => {
    updateInternals(node.model.ID);
    if (node.model.Inputs.length >= 10) {
      return;
    }
    node.addTargetHandle();
    
  };

  return <MergeView />;
};

export default MergePresenter;
