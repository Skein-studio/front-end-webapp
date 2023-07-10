import { createContext, useContext } from "react";
import { NodeState, NodeTypeToString, NodeType} from "./NodeState";
import { Node } from "reactflow";

type Graph = {
  nodes: Node[];
};

export function getNode(context:Graph, id:number){
  for (const element of context.nodes) {
    if (element.id == id.toString()) {
      return element;
    }
  }
}

export function setNode(context: Graph, node: Node) {
  for (let i = 0; i < context.nodes.length; i++) {
    if (context.nodes[i].id == node.id) {
      context.nodes[i] = node;
      return;
    }
  }
}

export function createNewNode(x: number, y: number, nodeType: NodeType) {
  const newModel = new NodeState(x, y, [], [], nodeType);

  const newNode: Node = {
    // specify the type here
    id: newModel.getID().toString(),
    type: NodeTypeToString(nodeType),
    data: {
      nodeState: newModel,
    },
    position: { x: x, y: y },
  };
  return newNode;
}

export const GraphContext = createContext<Graph>({
  nodes: [],
});

export function useGraph() {
  return useContext(GraphContext);
}
