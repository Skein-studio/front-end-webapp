// src/redux/nodesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node } from "reactflow";
import { NodeModel } from "../Node/NodeModel";

interface NodesState {
  nodes: Node[];
}

const initialState: NodesState = {
  nodes: [],
};

const nodesSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    updateNode: (state, action: PayloadAction<Node>) => {
      const index = state.nodes.findIndex(
        (node) => node.id === action.payload.id
      );
      if (index !== -1) {
        state.nodes[index] = action.payload;
      }
    },
  },
});

export const { setNodes, addNode, updateNode } = nodesSlice.actions;

export default nodesSlice.reducer;
