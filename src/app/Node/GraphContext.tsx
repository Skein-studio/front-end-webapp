//GraphContext.tsx

/*
  This file contains the GraphContext, 
  which is used to store the state of the graph, 
  which can then be accessed by any component that needs it.
*/

import { createContext, useContext } from "react";
import { NodeState, NodeTypeToString, NodeType } from "./NodeState";
import { Edge, Node } from "reactflow";

/**
 * Represents a graph data structure.
 */
export type Graph = {
  /**
   * An array of all nodes in the graph.
   */
  nodes: Node[];
  
  /**
   * An array of all edges in the graph.
   */
  edges: Edge[];

  /**
   * Refreshes the graph, re-rendering it.
   */
  refresh: () => void;

  /**
   * Selects a node in the graph.
   * @param nodeState - The state of the node to select.
   */
  selectNode: (nodeState: NodeState | undefined) => void;

  /**
   * The currently selected node.
   */
  selectedNode: NodeState | undefined;

  /**
   * Sets the nodes of the graph.
   * @param nodes - An array of nodes.
   */
  setNodes: (nodes: Node[]) => void;

  /**
   * Sets the edges of the graph.
   * @param edges - An array of edges.
   */
  setEdges: (edges: Edge[]) => void;
};

/**
 * Deletes the given nodes from the graph.
 * @param context - The graph.
 * @param nodes - The nodes to delete.
 * */
export function deleteNodes(context: Graph, nodes: Node[]) {
  const newNodes = context.nodes.filter(
    (node) => !nodes.find((n) => n.id === node.id)
  );
  context.setNodes(newNodes);
}

/**
 * Deletes the given edges from the graph.
 * @param context - The graph.
 * @param edges - The edges to delete.
 * */
export function deleteEdges(context: Graph, edges: Edge[]) {
  // set each node affected by the change to dirty
  for (const edge of edges) {
    const sourceNode = getNode(context, edge.source);
    const targetNode = getNode(context, edge.target);
    if (targetNode) {
      targetNode.data.nodeState.model.Dirty = true;
    }
  }

  const newEdges = context.edges.filter(
    (edge) => !edges.find((e) => e.id === edge.id)
  );
  context.setEdges(newEdges); // Assuming setEdges is defined in Graph type
  context.refresh();
}

/**
 * Sets nodes with the given IDs to dirty.
 * @param context - The graph.
 * @param node - The node to set to dirty.
 * */
export function setDirtyNodes(context: Graph, dirtyIds: string[]) {
  // This function is used to set the dirty property of the nodes in the graph
  for (const node of context.nodes) {
    if (dirtyIds.includes(node.id)) {
      node.data.nodeState.model.Dirty = true;
    }
  }
}

/**
 * Deselects the currently selected node.
 * @param context - The graph.
 * */
export function deselectNode(context: Graph) {
  // This function is used to deselect the node in the graph
  if (context.selectedNode) {
    context.selectedNode.selected = false;
  }
  context.selectedNode = undefined;
}

/**
 * Gets the node with the given ID.
 * @param context - The graph.
 * @param id - The ID of the node to get.
 * */
export function getNode(context: Graph, id: string) {
  // This function is used to get the node from the graph
  for (const element of context.nodes) {
    if (element.id == id) {
      return element;
    }
  }
}

/**
 * Sets the given node to the given node.
 * @param context - The graph.
 * @param node - The node to set.
 * @param setNodes - The function to set the nodes.
 * */
export function setNode(context: Graph, node: Node, setNodes: Function) {
  const newNodes = context.nodes.map((n) => {
    if (n.id === node.id) {
      return node;
    }
    return n;
  });
  setNodes(newNodes);
}

/**
 * Creates a new node with the given parameters.
 * @param x - The x coordinate of the node.
 * @param y - The y coordinate of the node.
 * @param nodeType - The type of the node.
 * */
export function createNewNode(x: number, y: number, nodeType: NodeType) {
  // This function is used to create a new node in the graph
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

/**
 * Creates a context for the graph.
 * */
export const GraphContext = createContext<Graph>({
  nodes: [],
  edges: [],
  refresh: () => {},
  selectNode: (nodeState: NodeState | undefined) => {},
  selectedNode: undefined,
  setNodes: () => {},
  setEdges: () => {},
});

/**
 * Creates a provider for the graph.
 * */
export function useGraph() {
  // This function is used to get the graph from the GraphContext
  return useContext(GraphContext);
}

/**
 * Checks if a cycle exists in the graph.
 * @param context - The graph.
 * @param sourceId - The ID of the source node.
 * @param targetId - The ID of the target node.
 * */
export function hasCycle(context: Graph, sourceId: string, targetId: string) {
  // Use a set to keep track of visited nodes
  const visited = new Set<string>();

  // Recursive function to perform Depth First Search (DFS)
  const visit = (nodeId: string) => {
    if (visited.has(nodeId)) {
      return false; // Already visited this node, no cycle found
    }

    visited.add(nodeId);

    // Check connections from the current node
    for (const edge of context.edges) {
      if (edge.source === nodeId) {
        if (edge.target === sourceId) {
          return true; // Cycle found
        }

        if (visit(edge.target)) {
          return true; // Cycle found in deeper level
        }
      }
    }

    return false; // No cycle found
  };

  return visit(targetId); // Start DFS from the target node
}

/**
 * Checks if a connection exists between two nodes.
 * @param context - The graph.
 * @param sourceId - The ID of the source node.
 * @param targetId - The ID of the target node.
 * @param sourceHandle - The handle of the source node.
 * @param targetHandle - The handle of the target node.
 * */
export function connectionExists(
  context: Graph,
  sourceId: string,
  targetId: string,
  sourceHandle: string,
  targetHandle: string
) {
  // This function is used to check if a connection already exists between two nodes

  if (sourceId === targetId) {
    // You should not be able to connect a node to itself
    return true;
  }

  if (hasCycle(context, sourceId, targetId)) {
    // You should not be able to make loops in the graph
    return true;
  }
  let exists = false;

  for (const edge of context.edges) {
    if (edge.targetHandle == targetHandle) {
      // Check if the targetHandle is already connected to another node
      exists = true;
      break;
    }
  }

  return exists;
}
