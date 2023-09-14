//modelTransformation.tsx
import { Graph as deniGraph } from "../Node/GraphContext";
import { Edge as flowEdge, Node as flowNode } from "reactflow";
import { NodeState, NodeTypeToString } from "../Node/NodeState";
// Create a dummy data generator function for each type

export enum handleType {
  "drums",
  "piano",
  "vocals",
  "guitar",
  "other",
  "bass",
}

const createDummyEdge = (): Edge => ({
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

const createDummyInput = (): Input => ({
  ID: "dummyInputID",
  Name: "dummyInputName",
});

const createDummyOutput = (): Output => ({
  ID: "dummyOutputID",
  Name: "dummyOutputName",
  Src: "dummySrc",
});

const createDummyNode = (): Node => ({
  ID: "dummyNodeID",
  Dirty: false,
  Type: "SourceType", // this can be changed as needed: SourceType, SignalType, MergeType, SplitType
  Data: {
    URL: "dummyURL",
  },
  Inputs: [createDummyInput()],
  Outputs: [createDummyOutput()],
});

const createDummyGraph = (): Graph => ({
  Edges: [createDummyEdge()],
  Nodes: [createDummyNode()],
});

const createDummyRoot = (): Root => ({
  Sketch: {
    ID: "dummySketchID",
    Name: "dummySketchName",
    Graph: createDummyGraph(),
  },
});
export const dummyData: Root = createDummyRoot();

function getChildNodeIds(graph: Graph, nodeId: string): string[] {
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
  graph: Graph,
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

export function gatherAllDirtyIds(graph: Graph): string[] {
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
export const transformtoTypescriptTypes = (graphContext: deniGraph): Root => {
  if (!graphContext) {
    return {} as Root;
  }
  const transformNode = (node: flowNode): Node => {
    let nodeState = node.data.nodeState as NodeState;

    const transformNodeInputs = (input: Input): any => {
      return {
        Name: input.Name,
      };
    };
    const transformNodeOutputs = (output: Output): Output => {
      return {
        ID: output.ID,
        Name: output.Name,
        Src: output.Src,
      };
    };

    switch (NodeTypeToString(nodeState.type)) {
      case "signal": {
        nodeState.model.Data = {
          Prompt: (nodeState.model.Data as SignalType).Prompt,
          Seed: (nodeState.model.Data as SignalType).Seed,
        };
        break;
      }

      case "source": {
        nodeState.model.Data = {
          URL: (nodeState.model.Data as SourceType).URL,
          base: (nodeState.model.Data as SourceType).base,
        };
        break;
      }
      // case "merge":{}
      // case "split":{}

      default: {
        nodeState.model.Data = {};
      }
    }

    let n = {
      Type: NodeTypeToString(nodeState.type),
      Dirty: nodeState.model.Dirty,
      Data: nodeState.model.Data,
      Inputs: nodeState.model.Inputs.map(transformNodeInputs),
      Outputs: nodeState.model.Outputs.map(transformNodeOutputs),
      ID: `${nodeState.id}`,
    } as Node;
    return n;
  };

  const transformEdge = (edge: flowEdge): Edge => {
    return edge.data as Edge;
  };
  // Construct the final transformed structure
  return {
    Sketch: {
      ID: "1", // Placeholder ID. Replace or derive from actual data as needed.
      Name: "spaghetti", // Placeholder Name. Replace or derive from actual data as needed.
      Graph: {
        Edges: graphContext.edges.map(transformEdge), // Transform all edges
        Nodes: graphContext.nodes.map(transformNode), // Transform all nodes
      },
    },
  };
};

export interface Root {
  Sketch: {
    ID: string;
    Name: string;
    Graph: Graph;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
export interface Graph {
  Edges: Edge[];
  Nodes: Node[];
  [k: string]: unknown;
}

export interface Edge {
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
export interface Node {
  ID: string;
  Dirty: boolean;
  Data: SourceType | SignalType | MergeType | SplitType | UnspecifiedType;
  Type: string;
  //type is either the strings SourceType or SignalType or MergeType or SplitType
  Inputs: Input[];
  Outputs: Output[];
  [k: string]: unknown;
}
export interface SourceType {
  URL: string;
  base: string; // whether the source is a record, import or generate type
  [k: string]: unknown;
}
export interface SignalType {
  Prompt: string;
  Seed: string;
  [k: string]: unknown;
}
export interface MergeType {}
export interface SplitType {}
export interface UnspecifiedType {}

export interface Input {
  ID: string;
  Name: string;
  [k: string]: unknown;
}
export interface Output {
  ID: string;
  Name: string;
  Src: string;
  [k: string]: unknown;
}


export function topologicalSortFromGraph(graph: Graph) {
  const indegree: { [key: string]: number } = {};
  const dirtyNodes: Set<string> = new Set();
  const nodeDetails: { [key: string]: { Type: string; Data: any } } = {};

  for (const edge of graph.Edges) {
      const inputNode = edge.Input.NodeID;
      const outputNode = edge.Output.NodeID;

      if (!indegree[outputNode]) {
          indegree[outputNode] = 0;
      }
      
      indegree[outputNode]++;
  }

  for (const node of graph.Nodes) {
      const nodeId = node.ID;
      nodeDetails[nodeId] = {
          Type: node.Type,
          Data: node.Data
      };

      if (node.Dirty) {
          dirtyNodes.add(nodeId);
      }
  }

  const queue: string[] = Array.from(dirtyNodes).filter(node => !indegree[node] || indegree[node] === 0);
  const result: { ID: string; Type: string; Data: any }[] = [];

  while (queue.length > 0) {
      const u = queue.shift()!;
      result.push({
          ID: u,
          Type: nodeDetails[u].Type,
          Data: nodeDetails[u].Data
      });

      for (const edge of graph.Edges) {
          if (edge.Input.NodeID === u) {
              const v = edge.Output.NodeID;
              if (dirtyNodes.has(v)) {
                  indegree[v]--;

                  if (indegree[v] === 0) {
                      queue.push(v);
                  }
              }
          }
      }
  }

  

  return result.reduce<string[]>((acc, node) => {
    if (node.Type === "signal") {
      acc.push(node.ID);
    }
    return acc;
  }, []);
}



export function topologicalSort(graphJson: Graph): string | string[] {
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

    const queue: string[] = Array.from(dirtyNodes).filter(node => (indegree.get(node) || 0) === 0);
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
        return []
    }
    return result;
}
