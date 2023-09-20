//modelTransformation.tsx
import { Graph } from "../Node/GraphContext";
import { Edge, Node } from "reactflow";
import { NodeState, NodeType, NodeTypeToString } from "../Node/NodeState";
// Create a dummy data generator function for each type

export enum handleType {
  "drums",
  "piano",
  "vocals",
  "guitar",
  "other",
  "bass",
}

const createDummyEdgeModel = (): EdgeModel => ({
  ID: "dummyEdgeID",
  Input: {
    NodeID: "dummyInputNodeID",
    InputName: "dummyInputName",
  },
  Output: {
    NodeID: "dummyOutputNodeID",
    OutputName: "dummyOutputName",
  },
});

const createDummyInputModel = (): InputModel => ({
  ID: "dummyInputID",
  Name: "dummyInputName",
});

const createDummyOutputModel = (): OutputModel => ({
  ID: "dummyOutputID",
  Name: "dummyOutputName",
  Src: "dummySrc",
});

const createDummyNodeModel = (): NodeModel => ({
  ID: "dummyNodeID",
  Dirty: false,
  Type: "source", // this can be changed as needed: source, signal, merge, split
  Data: {
    URL: "dummyURL",
  },
  Inputs: [createDummyInputModel()],
  Outputs: [createDummyOutputModel()],
});

const createDummyGraphModel = (): GraphModel => ({
  Edges: [createDummyEdgeModel()],
  Nodes: [createDummyNodeModel()],
});

const createDummyRootModel = (): RootModel => ({
  Sketch: {
    ID: "dummySketchID",
    Name: "dummySketchName",
    Graph: createDummyGraphModel(),
  },
});
export const dummyData: RootModel = createDummyRootModel();

function getChildNodeIds(graph: GraphModel, nodeId: string): string[] {
  const childNodeIds: string[] = [];

  // Iterate through the graph's edges to find child nodes for the given node
  for (const edge of graph.Edges) {
    if (edge.Output.NodeID === nodeId) {
      childNodeIds.push(edge.Input.NodeID);
    }
  }

  return childNodeIds;
}
function gatherDirtyIds(
  graph: GraphModel,
  nodeId: string,
  visited: Set<string> = new Set(),
  isParentDirty: boolean = false
): string[] {
  const idsToMarkDirty: string[] = [];

  // If already visited, skip to prevent cycles
  if (visited.has(nodeId)) {
    return idsToMarkDirty;
  }

  visited.add(nodeId);

  const currentNode = graph.Nodes.find((node) => node.ID === nodeId);

  if (currentNode) {
    // Add current nodeId if it's dirty or if parent is dirty
    if (currentNode.Dirty || isParentDirty) {
      idsToMarkDirty.push(nodeId);
      isParentDirty = true; // For subsequent child nodes
    }

    // Get child node IDs for the current node
    const childNodeIds = getChildNodeIds(graph, nodeId);

    for (const childId of childNodeIds) {
      idsToMarkDirty.push(
        ...gatherDirtyIds(graph, childId, visited, isParentDirty)
      );
    }
  }

  return idsToMarkDirty;
}

export function gatherAllDirtyIds(graph: GraphModel): string[] {
  const allDirtyIds: Set<string> = new Set();

  for (const node of graph.Nodes) {
    if (node.Dirty) {
      const dirtyIds = gatherDirtyIds(graph, node.ID);
      for (const id of dirtyIds) {
        allDirtyIds.add(id);
      }
    }
  }

  return Array.from(allDirtyIds);
}

export const transformGraphToRootModel = (graphContext: Graph): RootModel => {
  const transformNodeToNodeModel = (node: Node): NodeModel => {
    let nodeState = node.data.nodeState as NodeState;

    let n = {
      Type: NodeTypeToString(nodeState.type), // TODO: Is this conversion necessary?
      Dirty: nodeState.model.Dirty,
      Data: nodeState.model.Data,
      Inputs: nodeState.model.Inputs,
      Outputs: nodeState.model.Outputs,
      ID: `${nodeState.id}`,
    } as NodeModel;
    return n;
  };

  const transformEdgeToEdgeModel = (edge: Edge): EdgeModel => {
    return edge.data as EdgeModel;
  };
  // Construct the final transformed structure
  return {
    Sketch: {
      ID: "1", // Placeholder ID. Replace or derive from actual data as needed.
      Name: "spaghetti", // Placeholder Name. Replace or derive from actual data as needed.
      Graph: {
        Edges: graphContext.edges.map(transformEdgeToEdgeModel), // Transform all edges
        Nodes: graphContext.nodes.map(transformNodeToNodeModel), // Transform all nodes
      },
    },
  };
};

export interface RootModel {
  Sketch: {
    ID: string;
    Name: string;
    Graph: GraphModel;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface GraphModel {
  Edges: EdgeModel[];
  Nodes: NodeModel[];
  [k: string]: unknown;
}

export interface EdgeModel {
  ID: string;
  Input: {
    NodeID: string;
    InputName: string;
    [k: string]: unknown;
  };
  Output: {
    NodeID: string;
    OutputName: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface NodeModel {
  ID: string;
  Dirty: boolean;
  Data:
    | SourceTypeModel
    | SignalTypeModel
    | MergeTypeModel
    | SplitTypeModel
    | UnspecifiedTypeModel;
  Type: string;
  //type is either the strings SourceType or SignalType or MergeType or SplitType
  Inputs: InputModel[];
  Outputs: OutputModel[];
  [k: string]: unknown;
}
export interface SourceTypeModel {
  URL: string;
  base: string; // whether the source is a record, import or generate type
  [k: string]: unknown;
}
export interface SignalTypeModel {
  Prompt: string;
  Seed: string;
  [k: string]: unknown;
}
export interface MergeTypeModel {}
export interface SplitTypeModel {}
export interface UnspecifiedTypeModel {}

export interface InputModel {
  ID: string;
  Name: string;
  [k: string]: unknown;
}
export interface OutputModel {
  ID: string;
  Name: string;
  Src: string;
  [k: string]: unknown;
}

export function topologicalSort(graphJson: GraphModel): string[] {
  const graph: Map<string, string[]> = new Map();
  const indegree: Map<string, number> = new Map();
  const dirtyNodes: Set<string> = new Set();
  const signalNodes: Set<string> = new Set();

  // Extract node dependencies from the JSON graph
  for (const edge of graphJson.Edges) {
    const inputNode = edge.Input.NodeID;
    const outputNode = edge.Output.NodeID;
    const existingEdges = graph.get(inputNode) || [];
    graph.set(inputNode, [...existingEdges, outputNode]);
  }

  // Extract nodes information and indegree
  for (const node of graphJson.Nodes) {
    const nodeId = node.ID;
    if (node.Type === "signal") {
      signalNodes.add(nodeId);
    }

    if (node.Dirty && signalNodes.has(nodeId)) {
      dirtyNodes.add(nodeId);
      const relatedNodes = graph.get(nodeId) || [];
      for (const outputNode of relatedNodes) {
        const currentIndegree = indegree.get(outputNode) || 0;
        indegree.set(outputNode, currentIndegree + 1);
      }
    }
  }

  const queue: string[] = Array.from(dirtyNodes).filter(
    (node) => (indegree.get(node) || 0) === 0
  );
  const result: string[] = [];

  while (queue.length) {
    const u = queue.shift()!;
    result.push(u);
    const children = graph.get(u) || [];
    for (const v of children) {
      if (dirtyNodes.has(v)) {
        const currentIndegree = indegree.get(v) || 0;
        indegree.set(v, currentIndegree - 1);
        if (indegree.get(v) === 0) {
          queue.push(v);
        }
      }
    }
  }

  if (result.length !== dirtyNodes.size) {
    return [];
  }
  return result;
}
