//GraphContext.tsx

/*
  This file contains the GraphContext, 
  which is used to store the state of the graph, 
  which can then be accessed by any component that needs it.
*/

/*
 Possible TODOs:
 - Set NodeState's dirty property to true when a node is changed
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
  // This function is used to delete the nodes in the graph
  for (const node of nodes) {
    for (let i = 0; i < context.nodes.length; i++) {
      if (context.nodes[i].id == node.id) {
        context.nodes.splice(i, 1); //remove the node from the array
        break;
      }
    }
  }
  context.reloadComponent();
}

export function deleteEdges(context: Graph, edges: Edge[]) {
  // This function is used to delete the edges in the graph
  for (const edge of edges) {
    for (let i = 0; i < context.edges.length; i++) {
      if (context.edges[i].id == edge.id) {
        context.edges.splice(i, 1); //remove the edge from the array
        break;
      }
    }
  }
  context.reloadComponent();
}

export function deselectNode(context: Graph) {
  // This function is used to deselect the node in the graph
  if (context.selectedNode) {
    context.selectedNode.selected = false;
  }
  context.selectedNode = undefined;
}

export function getNode(context: Graph, id: number) {
  // This function is used to get the node from the graph
  for (const element of context.nodes) {
    if (element.id == id.toString()) {
      return element;
    }
  }
}

export function setNode(context: Graph, node: Node) {
  // This function is used to update the node in the graph
  for (let i = 0; i < context.nodes.length; i++) {
    if (context.nodes[i].id == node.id) {
      context.nodes[i] = node;
      context.reloadComponent();
      return;
    }
  }
}

export function createNewNode( // This function is used to create a new node in the graph
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
  // This is the GraphContext, which is used to store the state of the graph, which can then be accessed by any component that needs it.
  nodes: [],
  edges: [],
  reloadComponent: () => {},
  selectNode: (nodeState: NodeState | undefined) => {},
  selectedNode: undefined,
});

export function useGraph() {
  // This function is used to get the graph from the GraphContext
  return useContext(GraphContext);
}

export function setGraphEdges(context: Graph, edges: Edge[]) {
  // This function is used to update the edges in the graph
  context.edges = edges;
  context.reloadComponent();
}

export function connectionExists(
  context: Graph,
  sourceId: string,
  targetId: string,
  sourceHandle: string,
  targetHandle: string
) {
  // This function is used to check if a connection already exists between two nodes
  let exists = false;

  for (const edge of context.edges) {
    // Check if a connection already exists between the two nodes
    if (edge.source == sourceId && edge.target == targetId) {
      exists = true;
      break;
    }
    if (edge.targetHandle == targetHandle) {
      // Check if the targetHandle is already connected to another node
      exists = true;
      break;
    }
    if (edge.sourceHandle == sourceHandle) {
      // Check if the sourceHandle is already connected to another node
      exists = true;
      break;
    }
    if (edge.sourceHandle == targetHandle) {
      // Check if the sourceHandle is already connected to another node
      exists = true;
      break;
    }
    if (edge.targetHandle == sourceHandle) {
      // Check if the targetHandle is already connected to another node
      exists = true;
      break;
    }
  }

  return exists;
}
