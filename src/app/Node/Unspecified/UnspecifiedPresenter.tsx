//UnspecifiedPresenter.tsx

import React, { useContext } from "react";
import {
  NodeContext,
  NodeState,
  NodeTypeToString,
  NodeType,
} from "../NodeState";
import UnspecifiedView from "./UnspecifiedView";
import { useGraph, setNode } from "../GraphContext";

/**
 * The presenter for the Unspecified node.
 * @returns A UnspecifiedView component.
 * */

function UnspecifiedPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const graph = useGraph();

  function changeType(type: NodeType) {
    // Create a new node object with updated type
    if (!node) {
      return;
    }
    const nodeState = new NodeState(
      node.getPosition().x,
      node.getPosition().y,
      type,
      node.getID()
    );
    const updatedNode = {
      id: node.getID(),
      type: NodeTypeToString(type),
      data: {
        nodeState,
      },
      position: node.getPosition(),
    };

    setNode(graph, updatedNode, graph.setNodes);
  }

  return <UnspecifiedView setNode={changeType} />;
}

export default UnspecifiedPresenter;
