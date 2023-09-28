//modelTransformation.tsx
import { Graph } from "../GraphContext";
import { EdgeModel, GraphModel, NodeModel, RootModel } from "./modelDatatypes";

/**
 * This function takes a GraphModel and a nodeId and returns an array of child node IDs. It filters edges where the output node matches the given nodeId and then returns the corresponding input node IDs.
 * @param {GraphModel} graph - The graph to search
 * @param {string} nodeId - The node ID to search for
 * @returns {string[]} - An array of child node IDs
 */
function getChildNodeIds (graph: GraphModel, nodeId: string): string[] {
  return graph.Edges.filter((edge) => edge.Output.NodeID === nodeId).map(
    (edge) => edge.Input.NodeID
  );
}

/**
 * This is a recursive function that traverses the graph from a given nodeId and collects IDs of nodes that are "dirty" or have a dirty parent. The visited set keeps track of nodes already visited to prevent infinite recursion.
 * @param {GraphModel} graph - The graph to search
 * @param {string} nodeId - The node ID to start from
 * @param {Set<string>} visited - A set of visited node IDs
 * @param {boolean} isParentDirty - Whether the parent node is dirty
 * @returns {string[]} - An array of node IDs that are dirty or have a dirty parent
 * */
const gatherDirtyIds = (
  graph: GraphModel,
  nodeId: string,
  visited: Set<string> = new Set(),
  isParentDirty: boolean = false
): string[] => {
  if (visited.has(nodeId)) return [];

  visited.add(nodeId);
  let idsToMarkDirty: string[] = [];

  const currentNode = graph.Nodes.find((node) => node.ID === nodeId);

  if (currentNode && (currentNode.Dirty || isParentDirty)) {
    idsToMarkDirty.push(nodeId);
    isParentDirty = true;
  }

  const childNodeIds = getChildNodeIds(graph, nodeId);

  return idsToMarkDirty.concat(
    ...childNodeIds.map((childId) =>
      gatherDirtyIds(graph, childId, visited, isParentDirty)
    )
  );
};

/**
 * This function collects all the "dirty" node IDs in the entire graph. It uses gatherDirtyIds on every node marked as dirty in the graph to find these IDs.
 * @param {GraphModel} graph - The graph to search
 * @returns {string[]} - An array of node IDs that are dirty or have a dirty parent
 * */
export const gatherAllDirtyIds = (graph: GraphModel): string[] =>
  Array.from(
    new Set(
      graph.Nodes.filter((node) => node.Dirty).flatMap((node) =>
        gatherDirtyIds(graph, node.ID)
      )
    )
  );

/**
 * This function transforms the graph context into a RootModel which can be more easily serialized or used for computation. It essentially packages the graph edges and nodes into a new object of type RootModel.
 * @param {Graph} graphContext - The graph context to transform
 * @returns {RootModel} - The transformed graph context
 * */
export const transformGraphToRootModel = (graphContext: Graph): RootModel => ({
  Sketch: {
    ID: "1",
    Name: "spaghetti",
    Graph: {
      Edges: graphContext.edges.map((edge) => edge.data as EdgeModel),
      Nodes: graphContext.nodes.map(
        (node) => node.data.nodeState.model as NodeModel
      ),
    },
  },
});

/**
 * Perform a topological sort starting from a child node. This function traverses from child nodes to their parents
 * and stops if it encounters a node where the 'Dirty' field is true.
 * 
 * @param startNodeID {string} - ID of the child node from where to start the sort
 * @param graph {GraphModel} - The graph object containing the nodes and edges
 * 
 * @returns {NodeModel[]} - An array containing nodes in topologically sorted order starting from the child, stopping at a 'Dirty' node
 */
function topologicalSortFromChild(startNodeID: string, graph: GraphModel): string[] {
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
    const incomingEdges = graph.Edges.filter((edge) => edge.Output.NodeID === node.ID);

    for (const edge of incomingEdges) {
      const parentNode = graph.Nodes.find((n) => n.ID === edge.Input.NodeID);
      if (parentNode) {
        visit(parentNode);
      }
    }

    // Add this node to the stack
    stack.push(node.ID);
  }

  // Start the sorting from the node with ID = startNodeID
  const startNode = graph.Nodes.find((n) => n.ID === startNodeID);
  if (startNode) {
    visit(startNode);
  }

  return stack.reverse();
}


/**
 * This function performs a topological sort on the graph model. It takes into account only nodes that are "dirty" and returns a sorted array of their IDs. Topological sort ensures that for every directed edge (u, v), node u comes before v in the sorted list. The function uses a Map to keep track of nodes connected to each node (graph) and another Map (indegree) to keep track of the number of incoming edges for each node. The actual topological sorting is done by using a queue and BFS-like algorithm.
 * @param {GraphModel} graphModel - The graph model to sort
 * @returns {string[]} - A sorted array of node IDs
 * */
export function topologicalSort(graphModel: GraphModel): string[] {
  const graph = new Map<string, string[]>();
  const indegree = new Map<string, number>();
  const dirtyNodes = new Set<string>();
  const result: string[] = [];

  // Initialize graph and collect dirty and signal nodes
  for (const edge of graphModel.Edges) {
    const input = edge.Input.NodeID,
      output = edge.Output.NodeID;
    graph.set(input, [...(graph.get(input) || []), output]);
  }

  for (const node of graphModel.Nodes) {
    if (node.Type === "signal" && node.Dirty) {
      dirtyNodes.add(node.ID);
      (graph.get(node.ID) || []).forEach((output) => {
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
