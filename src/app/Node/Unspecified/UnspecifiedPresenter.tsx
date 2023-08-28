//UnspecifiedPresenter.tsx

import React, { useState, useContext } from "react";
import { NodeContext, NodeState } from "../NodeState";
import UnspecifiedView from "./UnspecifiedView";
import { NodeType } from "../NodeState";
import { NodeTypeToString } from "../NodeState";
import { useGraph, setNode } from "../GraphContext";

function UnspecifiedPresenter() {
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const graph = useGraph();

  function changeType(type: NodeType) {
    // Create a new node object with updated type
    if (!node) {
      return;
    }
    const nodeState = new NodeState(
      node.position.x,
      node.position.y,
      type,
      node.id
    );
    const updatedNode = {
      id: node.id!.toString(),
      type: NodeTypeToString(type),
      data: {
        nodeState,
      },
      position: node.position,
    };

    setNode(graph, updatedNode, graph.setNodes);
  }

  return <UnspecifiedView setNode={changeType} />;
}

export default UnspecifiedPresenter;
