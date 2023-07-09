import React, { useState, useContext } from "react";
import { NodeContext } from "../NodeState";
import { AudioContext } from "@/app/Util/AudioContext";
import UnspecifiedView from "./UnspecifiedView";
import { NodeType } from "../NodeState";
import { useDispatch } from "react-redux";
import { updateNode } from "@/app/redux/sketchSlice";
import { NodeTypeToString } from "../NodeState";

const UnspecifiedPresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeModel instance
  const dispatch = useDispatch();

  function setNode(type: NodeType) {
    if (!node) {
      return;
    }

    // Create a new node object with updated type
    const updatedNode = {
      id: node.id.toString(),
      type: NodeTypeToString(type),
      data: {
        label: NodeTypeToString(type),
        nodeModel: {
          position: node.position,
          id: node.id,
          inputs: node.inputs,
          outputs: node.outputs,
          type: type, // Update the type here
        },
      },
      position: node.position,
    };

    // Dispatch the updated node to the store
    dispatch(updateNode(updatedNode));
  }

  return <UnspecifiedView setNode={setNode} />;
};

export default UnspecifiedPresenter;
