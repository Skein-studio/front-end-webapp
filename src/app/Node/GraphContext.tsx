//GraphContext.tsx

import { createContext, useContext } from "react";
import { NodeState, NodeTypeToString, NodeType} from "./NodeState";
import { Edge, Node } from "reactflow";

type Graph = {
  nodes: Node[];
  edges: Edge[];
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

export function addConnection(context:Graph, edge:Edge){
  for (let i = 0; i < context.edges.length; i++) {
    const element = context.edges[i];
    if(element.source == edge.source && element.target == edge.target){
      console.log("This connection already exists");
      return;
    }
  }
  context.edges.push(edge);
}

export function createNewNode(x: number, y: number, nodeType: NodeType, context:Graph) {
  let newModel;
  const existingNode = context.nodes.find(node => node.type === NodeTypeToString(nodeType));

  if(existingNode && existingNode.data.nodeState) {
    newModel = new NodeState(x, y, nodeType, existingNode.data.nodeState.getID());
  } else {
    newModel = new NodeState(x, y, nodeType);
  }

  const newNode: Node = {
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
  edges: [],
});

export function useGraph() {
  return useContext(GraphContext);
}
