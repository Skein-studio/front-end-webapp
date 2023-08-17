import { Graph as deniGraph } from "../Node/GraphContext";
import { Edge as flowEdge, Node as flowNode } from "reactflow";
import { NodeState, NodeType, NodeTypeToString, Output as stateOutput, Input as stateInput } from "../Node/NodeState";
// Create a dummy data generator function for each type

export enum handleType {
  "drums",
  "piano",
  "vocals",
  "guitar",
  "other",
  "bass"
}

const createDummyEdge = (): Edge => ({
    ID: "dummyEdgeID",
    Input: {
        NodeID: "dummyInputNodeID",
        InputName: "dummyInputName"
    },
    Output: {
        NodeID: "dummyOutputNodeID",
        OutputName: "dummyOutputName"
    }
});

const createDummyInput = (): Input => ({
    Name: "dummyInputName"
});

const createDummyOutput = (): Output => ({
    Name: "dummyOutputName",
    Src: "dummySrc"
});

const createDummyNode = (): Node => ({
    ID: "dummyNodeID",
    Dirty: false,
    Type: "SourceType", // this can be changed as needed: SourceType, SignalType, MergeType, SplitType
    Data: {
        URL: "dummyURL"
    },
    Inputs: [createDummyInput()],
    Outputs: [createDummyOutput()]
});

const createDummyGraph = (): Graph => ({
    Edges: [createDummyEdge()],
    Nodes: [createDummyNode()]
});

const createDummyRoot = (): Root => ({
    Sketch: {
        ID: "dummySketchID",
        Name: "dummySketchName",
        Graph: createDummyGraph()
    }
});
export const dummyData: Root = createDummyRoot();

function getChildNodeIds(graph: Graph, nodeId: string): string[] {
  const childNodeIds: string[] = [];

  // Iterate through the graph's edges to find child nodes for the given node
  for (const edge of graph.Edges) {
    if (edge.Input.NodeID === nodeId) {
      childNodeIds.push(edge.Output.NodeID);
    }
  }

  return childNodeIds;
}

function gatherDirtyIds(graph: Graph, nodeId: string, visited: Set<string> = new Set()): string[] {
  const idsToMarkDirty: string[] = [];

  // If already visited, skip to prevent cycles
  if (visited.has(nodeId)) {
    return idsToMarkDirty;
  }

  visited.add(nodeId);

  const currentNode = graph.Nodes.find(node => node.ID === nodeId);

  if (currentNode && currentNode.Dirty) {
    // Get child node IDs for the current node
    const childNodeIds = getChildNodeIds(graph, nodeId);

    for (const childId of childNodeIds) {
      idsToMarkDirty.push(childId);
      idsToMarkDirty.push(...gatherDirtyIds(graph, childId, visited));
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
  if(!graphContext){return {} as Root}
    const transformNode = (node: flowNode): Node => {
      let nodeState = node.data.nodeState as NodeState

      const transformNodeInputs = (input: stateInput): Input =>{
        let inpu: Input
        
        if (nodeState.type == NodeType.Merge){
          inpu = {Name: input.data.Name}
        }
        inpu = {
              Name: "standard-input",
        };
        return inpu
      }
      const transformNodeOutputs = (output: stateOutput): Output =>{
        let out: Output
        if (nodeState.type == NodeType.Split){
          out = {
            Name: output.name,
            Src: ""
        }
        }else{
         out = {
              Name: "standard-output",
              Src: ""
          }
        }
          return out
      }  
        console.log(node)

        switch (NodeTypeToString(nodeState.type)){
            case "signal":{
              nodeState.data = {
                Prompt: nodeState.data,
                Seed: "1234",
              }
              break
            }
          
            case "source":{
              nodeState.data = {
                URL: nodeState.data.audio,
              }  
              break
            }
            // case "merge":{}
            // case "split":{}

            default:{
              nodeState.data = {}
            }
        }
        console.log(node)
        let n = {
            Type: NodeTypeToString(nodeState.type),
            Dirty: true, //TODO: handle this correctly, derive from node state
            Data: nodeState.data,
            Inputs: nodeState.inputs?.map(transformNodeInputs),
            Outputs: nodeState.outputs?.map(transformNodeOutputs),
            ID: `${nodeState.id}`
        } as Node;
        return n
    };


    const transformEdge = (edge: flowEdge): Edge => {
      return edge.data as Edge
    };
    debugger;
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
    Data: SourceType | SignalType | MergeType | SplitType;
    Type: string
    //type is either the strings SourceType or SignalType or MergeType or SplitType
    Inputs: Input[];
    Outputs: Output[];
    [k: string]: unknown;
  }
  export interface SourceType {
    URL: string;
    [k: string]: unknown;
  }
  export interface SignalType {
    Prompt: string;
    Seed: string;
    [k: string]: unknown;
  }
  export interface MergeType {}
  export interface SplitType {}

  export interface Input {
    Name: string;
    [k: string]: unknown;
  }
  export interface Output {
    Name: string;
    Src: string;
    [k: string]: unknown;
  }