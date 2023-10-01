//modelTransformation.tsx
import { Edge, Node, useReactFlow } from "reactflow";
import { getNodeModelFromNode } from "../GraphFunctions";
import { NodeModel } from "./modelDatatypes";

/**
 * This function takes edges and a nodeId and returns an array of child node IDs. It filters edges where the output node matches the given nodeId and then returns the corresponding input node IDs.
 * @param {Edge[]} edges - The edges to search
 * @param {string} nodeId - The node ID to search for
 * @returns {string[]} - An array of child node IDs
 */
function getChildNodeIds(edges: Edge[], nodeId: string): string[] {
  return edges
    .filter((edge) => edge.source === nodeId)
    .map((edge) => edge.target);
}

/**
 * This is a recursive function that traverses the graph from a given nodeId and collects IDs of nodes that are "dirty" or have a dirty parent. The visited set keeps track of nodes already visited to prevent infinite recursion.
 * @param {Node[]} nodes - The nodes to search
 * @param {string} nodeId - The node ID to start from
 * @param {Set<string>} visited - A set of visited node IDs
 * @param {boolean} isParentDirty - Whether the parent node is dirty
 * @returns {string[]} - An array of node IDs that are dirty or have a dirty parent
 * */
const gatherDirtyIds = (
  nodes: Node[],
  edges: Edge[],
  nodeId: string,
  visited: Set<string> = new Set(),
  isParentDirty: boolean = false
): string[] => {
  if (visited.has(nodeId)) return [];

  visited.add(nodeId);
  let idsToMarkDirty: string[] = [];

  const currentNode = nodes.find((node) => node.id === nodeId);

  if (
    currentNode &&
    (getNodeModelFromNode(currentNode)!.Dirty || isParentDirty)
  ) {
    idsToMarkDirty.push(nodeId);
    isParentDirty = true;
  }
  const childNodeIds = getChildNodeIds(edges, nodeId);

  return idsToMarkDirty.concat(
    ...childNodeIds.map((childId) =>
      gatherDirtyIds(nodes, edges, childId, visited, isParentDirty)
    )
  );
};

/**
 * This function collects all the "dirty" node IDs in the entire graph. It uses gatherDirtyIds on every node marked as dirty in the graph to find these IDs.
 * @param {Node[]} nodes - The nodes to search
 * @returns {string[]} - An array of node IDs that are dirty or have a dirty parent
 * */
export function gatherAllDirtyIds(nodes: Node[], edges: Edge[]): string[] {
  return Array.from(
    new Set(
      nodes
        .filter((node) => getNodeModelFromNode(node)!.Dirty)
        .flatMap((node) => gatherDirtyIds(nodes, edges, node.id))
    )
  );
}

/**
 * Perform a topological sort starting from a child node. This function traverses from child nodes to their parents
 * and stops if it encounters a node where the 'Dirty' field is true.
 *
 * @param startNodeID {string} - ID of the child node from where to start the sort
 *
 * @returns {NodeModel[]} - An array containing nodes in topologically sorted order starting from the child, stopping at a 'Dirty' node
 */
function topologicalSortFromChild(
  startNodeID: string,
  nodes: Node[],
  edges: Edge[]
): string[] {
  const reactFlowInstance = useReactFlow();
  const visited = new Set<string>();
  const stack: string[] = [];

  function visit(node: NodeModel) {
    // Check if this node has already been visited
    if (visited.has(node.ID)) {
      return;
    }

    // Mark the node as visited
    visited.add(node.ID);

    // Stop if the node is marked as 'Dirty'
    if (!node.Dirty) {
      stack.push(node.ID);
      return;
    }

    // Find edges where this node is the parent (Output)
    const incomingEdges = edges.filter((edge) => edge.source === node.ID);

    for (const edge of incomingEdges) {
      const parentNode = nodes.find((n) => n.id === edge.target);
      if (parentNode) {
        visit(getNodeModelFromNode(parentNode)!);
      }
    }

    // Add this node to the stack
    stack.push(node.ID);
  }

  // Start the sorting from the node with ID = startNodeID
  const startNode = nodes.find((n) => n.id === startNodeID);
  if (startNode) {
    visit(getNodeModelFromNode(startNode)!);
  }

  return stack.reverse();
}

/**
 * This function performs a topological sort on the graph model. It takes into account only nodes that are "dirty" and returns a sorted array of their IDs. Topological sort ensures that for every directed edge (u, v), node u comes before v in the sorted list. The function uses a Map to keep track of nodes connected to each node (graph) and another Map (indegree) to keep track of the number of incoming edges for each node. The actual topological sorting is done by using a queue and BFS-like algorithm.
 * @param {Node[]} nodes - The nodes to sort
 * @returns {string[]} - A sorted array of node IDs
 * */
export function topologicalSort(nodes: Node[], edges: Edge[]): string[] {
  const graph = new Map<string, string[]>();
  const indegree = new Map<string, number>();
  const dirtyNodes = new Set<string>();
  const result: string[] = [];

  // Initialize graph and collect dirty and signal nodes
  for (const edge of edges) {
    const input = edge.target,
      output = edge.source;
    graph.set(input, [...(graph.get(input) || []), output]);
  }

  for (const node of nodes) {
    const n = getNodeModelFromNode(node)!;
    if (n.Type === "signal" && n.Dirty) {
      dirtyNodes.add(n.ID);
      (graph.get(n.ID) || []).forEach((output) => {
        indegree.set(output, (indegree.get(output) || 0) + 1);
      });
    }
  }

  // Topological Sort
  const queue = Array.from(dirtyNodes).filter((id) => !(indegree.get(id) || 0));

  while (queue.length) {
    const curr = queue.shift()!;
    result.push(curr);

    (graph.get(curr) || []).forEach((child) => {
      if (!dirtyNodes.has(child)) return;
      const newIndegree = (indegree.get(child) || 1) - 1;
      indegree.set(child, newIndegree);
      if (newIndegree === 0) queue.push(child);
    });
  }

  return result.length === dirtyNodes.size ? result : [];
}
