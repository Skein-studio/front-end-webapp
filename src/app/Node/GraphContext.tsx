//GraphContext.tsx

/*
  This file contains the GraphContext, 
  which is used to store the state of the graph, 
  which can then be accessed by any component that needs it.
*/

import { createContext, useContext } from "react";
import { NodeState, NodeTypeToString, NodeType } from "./NodeState";
import { Edge, Node } from "reactflow";

export type Graph = {
  nodes: Node[];
  edges: Edge[];
  reloadComponent: () => void;
  selectNode: (nodeState: NodeState | undefined) => void;
  selectedNode: NodeState | undefined;
};

export function deleteNodes(context: Graph, nodes: Node[]) {
  for (const node of nodes) {
    for (let i = 0; i < context.nodes.length; i++) {
      if (context.nodes[i].id == node.id) {
        context.nodes.splice(i, 1);//remove the node from the array
        break;
      }
    }
  }
  context.reloadComponent();
}

export function deleteEdges(context: Graph, edges: Edge[]) {
  for (const edge of edges) {
    for (let i = 0; i < context.edges.length; i++) {
      if (context.edges[i].id == edge.id) {
        context.edges.splice(i, 1);//remove the edge from the array
        break;
      }
    }
  }
  context.reloadComponent();
}

export function deselectNode(context: Graph) {
  if (context.selectedNode) {
    context.selectedNode.selected = false;
  }
  context.selectedNode = undefined;
}

export function getNode(context: Graph, id: number) {
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
      context.reloadComponent();
      return;
    }
  }
}

export function addConnection(context: Graph, edge: Edge) {
  for (let i = 0; i < context.edges.length; i++) {
    const element = context.edges[i];
    if (element.source == edge.source && element.target == edge.target) {
      console.log("This connection already exists", context.edges);
      return;
    }
  }
  context.edges.push(edge);
  context.reloadComponent();
}

export function createNewNode(
  x: number,
  y: number,
  nodeType: NodeType,
  context: Graph
) {
  let newNodeState = new NodeState(x, y, nodeType);

  const newNode: Node = {
    id: newNodeState.getID().toString(),
    type: NodeTypeToString(nodeType),
    data: {
      nodeState: newNodeState,
    },
    position: { x: x, y: y },
  };
  return newNode;
}


export const GraphContext = createContext<Graph>({
  nodes: [],
  edges: [],
  reloadComponent: () => {},
  selectNode: (nodeState: NodeState | undefined) => {},
  selectedNode: undefined,
});

export function useGraph() {
  return useContext(GraphContext);
}
