//UnspecifiedPresenter.tsx

import React, { useContext } from "react";
import {
  NodeContext,
  NodeState,
  NodeTypeToString,
  NodeType,
} from "../NodeState";
import UnspecifiedView from "./UnspecifiedView";
import { setNode } from "../GraphFunctions";
import { useReactFlow } from "reactflow";

/**
 * The presenter for the Unspecified node.
 * @returns A UnspecifiedView component.
 * */

/**
 * The presenter for the Unspecified node.
 * @returns A UnspecifiedView component.
 * */

function UnspecifiedPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const reactFlowInstance = useReactFlow();

  function changeType(type: NodeType) {
    // Create a new node object with updated type
    if (!node) {
      return;
    }
    const nodeState = new NodeState(
      node.model.Position.x,
      node.model.Position.y,
      type,
      node.model.ID
    );
    const updatedNode = {
      id: node.model.ID,
      type: NodeTypeToString(type),
      data: {
        nodeState,
      },
      position: node.model.Position,
    };

    setNode(
      reactFlowInstance.getNodes(),
      updatedNode,
      reactFlowInstance.setNodes
    );
  }

  return <UnspecifiedView setNode={changeType} />;
}

export default UnspecifiedPresenter;
