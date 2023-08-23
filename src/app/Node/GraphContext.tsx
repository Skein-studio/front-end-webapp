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
  setNodes: (nodes: Node[]) => void; // Add this line
  setEdges: (edges: Edge[]) => void; // Add this line
};

export function deleteNodes(context: Graph, nodes: Node[]) {
  const newNodes = context.nodes.filter(node => !nodes.find(n => n.id === node.id));
  context.setNodes(newNodes);
}

export function deleteEdges(context: Graph, edges: Edge[]) {
  // set each node affected by the change to dirty
  for (const edge of edges) {
    const sourceNode = getNode(context, parseInt(edge.source));
    const targetNode = getNode(context, parseInt(edge.target));
    if (sourceNode) {
      sourceNode.data.nodeState.model.Dirty = true;
    }
    if (targetNode) {
      targetNode.data.nodeState.model.Dirty = true;
    }
  }


  const newEdges = context.edges.filter(edge => !edges.find(e => e.id === edge.id));
  context.setEdges(newEdges); // Assuming setEdges is defined in Graph type
}

export function setDirtyNodes(context: Graph, dirtyIds: string[]) {
  // This function is used to set the dirty property of the nodes in the graph
  for (const node of context.nodes) {
    if (dirtyIds.includes(node.id)) {
      node.data.nodeState.model.Dirty = true;
    }
  }
  //console.log("nodes set to dirty", context.nodes);
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

export function setNode(context: Graph, node: Node, setNodes: Function) {
  const newNodes = context.nodes.map(n => {
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
  reloadComponent: () => {},
  selectNode: (nodeState: NodeState | undefined) => {},
  selectedNode: undefined,
  setNodes: () => {}, 
  setEdges: () => {}, 
});


export function useGraph() {
  // This function is used to get the graph from the GraphContext
  return useContext(GraphContext);
}
/*
export function setGraphEdges(context: Graph, edges: Edge[]) {
  // This function is used to update the edges in the graph
  context.edges = edges;
  context.reloadComponent();
}
*/
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
    // if (edge.source == sourceId && edge.target == targetId) { // TODO: This should be ignored when the target & source handles are split / merge nodes, otherwise this check should exist
    //   exists = true;
    //   break;
    // }
    if (edge.targetHandle == targetHandle) {
      // Check if the targetHandle is already connected to another node
      exists = true;
      break;
    }

    // TODO: You should not be able to connect a node to a source handle of another node which is already connected to it
    /*
     if (edge.sourceHandle == targetHandle) {
    //   // Check if the sourceHandle is already connected to another node
       exists = true;
       break;
    }
    if (edge.targetHandle == sourceHandle) {
    //   // Check if the targetHandle is already connected to another node
       exists = true;
       break;
    }
    */
  }

  return exists;
}
