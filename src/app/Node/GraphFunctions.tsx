//GraphContext.tsx

import {
  NodeState,
  NodeTypeToString,
  NodeType,
  StringToNodeType,
} from "./NodeState";
import { Edge, Node } from "reactflow";
import { NodeModel } from "./Model/modelDatatypes";
import { createContext, useContext } from "react";

/**
 * Sets nodes with the given IDs to dirty.
 * @param nodes - The nodes to check if needing set to dirty.
 * @param node - The node to set to dirty.
 * */
export function setDirtyNodes(nodes: Node[], dirtyIds: string[]) {
  // This function is used to set the dirty property of the nodes in the graph
  for (const node of nodes) {
    if (dirtyIds.includes(node.id)) {
      node.data.nodeState.model.Dirty = true;
    }
  }
}

type UI = {
  selectedNode: NodeState | undefined;
  selectNode: Function;
  refresh: Function;
};

//then a context for the uI
export const UIContext = createContext<UI>({
  selectedNode: undefined,
  selectNode: () => {},
  refresh: () => {},
});

//AND a use context for it
export function useUI() {
  return useContext(UIContext);
}

/**
 * Sets the given node to the given node.
 * @param nodes - The nodes to set.
 * @param node - The node to set.
 * @param setNodes - The function to set the nodes.
 * */
export function setNode(nodes: Node[], node: Node, setNodes: Function) {
  const newNodes = nodes.map((n) => {
    if (n.id === node.id) {
      return node;
    }
    return n;
  });
  setNodes(newNodes);
}

export function getNodeModelFromNode(node: Node): NodeModel {
  return (node.data as any).nodeState.model;
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
    id: newNodeState.model.ID,
    type: NodeTypeToString(nodeType),
    data: {
      nodeState: newNodeState,
    },
    position: { x: x, y: y },
  };
  return newNode;
}

export function hasCycle(edges: Edge[], sourceId: string, targetId: string) {
  // Use a set to keep track of visited nodes
  const visited = new Set<string>();

  // Recursive function to perform Depth First Search (DFS)
  const visit = (nodeId: string) => {
    if (visited.has(nodeId)) {
      return false; // Already visited this node, no cycle found
    }

    visited.add(nodeId);

    // Check connections from the current node
    for (const edge of edges) {
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
  edges: Edge[],
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

  if (hasCycle(edges, sourceId, targetId)) {
    // You should not be able to make loops in the graph
    return true;
  }
  let exists = false;

  for (const edge of edges) {
    if (edge.targetHandle == targetHandle) {
      // Check if the targetHandle is already connected to another node
      exists = true;
      break;
    }
  }

  return exists;
}
