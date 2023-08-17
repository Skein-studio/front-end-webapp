import { Graph as deniGraph } from "../Node/GraphContext";
import { Edge as flowEdge, Node as flowNode } from "reactflow";
import { NodeState, NodeType, NodeTypeToString, Output as stateOutput, Input as stateInput } from "../Node/NodeState";
// Create a dummy data generator function for each type

export enum handleType {
  "drums",
  "piano",
  "vocal",
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



export const transformtoTypescriptTypes = (graphContext: deniGraph): Root => {
  console.log(graphContext)
    
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
                Prompt: "classical piano",
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