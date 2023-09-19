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
  refresh: () => void;
  selectNode: (nodeState: NodeState | undefined) => void;
  selectedNode: NodeState | undefined;
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
};

export function deleteNodes(context: Graph, nodes: Node[]) {
  const newNodes = context.nodes.filter(
    (node) => !nodes.find((n) => n.id === node.id)
  );
  context.setNodes(newNodes);
}

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

export function setDirtyNodes(context: Graph, dirtyIds: string[]) {
  // This function is used to set the dirty property of the nodes in the graph
  for (const node of context.nodes) {
    if (dirtyIds.includes(node.id)) {
      node.data.nodeState.model.Dirty = true;
    }
  }
}

export function deselectNode(context: Graph) {
  // This function is used to deselect the node in the graph
  if (context.selectedNode) {
    context.selectedNode.selected = false;
  }
  context.selectedNode = undefined;
}

export function getNode(context: Graph, id: string) {
  // This function is used to get the node from the graph
  for (const element of context.nodes) {
    if (element.id == id) {
      return element;
    }
  }
}

export function setNode(context: Graph, node: Node, setNodes: Function) {
  const newNodes = context.nodes.map((n) => {
    if (n.id === node.id) {
      return node;
    }
    return n;
  });
  setNodes(newNodes);
}

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

export const GraphContext = createContext<Graph>({
  nodes: [],
  edges: [],
  refresh: () => {},
  selectNode: (nodeState: NodeState | undefined) => {},
  selectedNode: undefined,
  setNodes: () => {},
  setEdges: () => {},
});

export function useGraph() {
  // This function is used to get the graph from the GraphContext
  return useContext(GraphContext);
}

function hasCycle(context: Graph, sourceId: string, targetId: string) {
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
