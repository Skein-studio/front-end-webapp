import { createContext, useContext } from "react";
import { NodeState } from "./NodeState";

type Graph = {
  nodes: NodeState[];
};

export const GraphContext = createContext<Graph>({
  nodes: [] 
});

export function useGraph() {
  return useContext(GraphContext);
}
