// src/redux/nodesSlice.ts

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Node, Edge } from "reactflow";

interface NodesState {
  nodes: Node[];
  edges: Edge[],
}

const initialState: NodesState = {
  nodes: [
    
  ],
  edges:[],
};

const sketchSlice = createSlice({
  name: "nodes",
  initialState,
  reducers: {
    setNodes: (state, action: PayloadAction<Node[]>) => {
      state.nodes = action.payload;
    },
    setEdges: (state, action: PayloadAction<Edge[]>) => {
      state.edges = action.payload;
    },
    addNode: (state, action: PayloadAction<Node>) => {
      state.nodes.push(action.payload);
    },
    addEdge: (state, action: PayloadAction<Edge>) => {
      state.edges.push(action.payload);
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

export const { setNodes, addNode, updateNode, setEdges, addEdge } = sketchSlice.actions;

export default sketchSlice.reducer;
