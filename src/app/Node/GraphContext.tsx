import { createContext, useContext } from "react";
import { NodeState } from "./NodeState";
import { Node } from "reactflow";

type Graph = {
  nodes: Node[];
};

export function updateNode(context: Graph, node: Node) {
  for (let i = 0; i < context.nodes.length; i++) {
    if (context.nodes[i].id == node.id) {
      context.nodes[i] = node;
      return;
    }
  }
}

export const GraphContext = createContext<Graph>({
  nodes: [],
});

export function useGraph() {
  return useContext(GraphContext);
}
