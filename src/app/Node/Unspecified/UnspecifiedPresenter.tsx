//UnspecifiedPresenter.tsx

import React, { useState, useContext } from "react";
import { NodeContext, NodeState } from "../NodeState";
import UnspecifiedView from "./UnspecifiedView";
import { NodeType } from "../NodeState";
import { NodeTypeToString } from "../NodeState";
import { useGraph, setNode } from "../GraphContext";

/*
  We don't know if we will use tis class or not, but the purpose is 
  to have an unspecified node which you can choose the type of
*/

const UnspecifiedPresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const {
    nodes,
    edges,
    reloadComponent,
    setSelectedNode: setOpenNode,
  } = useGraph();

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

    setNode(
      { nodes, edges, reloadComponent, setSelectedNode: setOpenNode },
      updatedNode
    );
  }

  return <UnspecifiedView setNode={changeType} />;
};

export default UnspecifiedPresenter;