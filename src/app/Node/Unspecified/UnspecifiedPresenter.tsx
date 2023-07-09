import React, { useState, useContext } from "react";
import { NodeContext, NodeState } from "../NodeState";
import UnspecifiedView from "./UnspecifiedView";
import { NodeType } from "../NodeState";
import { NodeTypeToString } from "../NodeState";
import { useGraph, updateNode } from "../GraphContext";

const UnspecifiedPresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeModel instance
  const { nodes } = useGraph();

  function setNode(type: NodeType) {
    // Create a new node object with updated type
    if (!node) {
      return;
    }

    const newModel = new NodeState(
      node.position.x,
      node.position.y,
      node.inputs,
      node.outputs,
      type
    );
    newModel.id = node.id;

    const updatedNode = {
      id: node.id.toString(),
      type: NodeTypeToString(type),
      data: {
        newModel,
      },
      position: node.position,
    };

    updateNode({ nodes }, updatedNode);
  }

  return <UnspecifiedView setNode={setNode} />;
};

export default UnspecifiedPresenter;
