import { Graph as deniGraph } from "../Node/GraphContext";
import { Edge as flowEdge, Node as flowNode } from "reactflow";
import { NodeState, NodeTypeToString, Output as stateOutput } from "../Node/NodeState";
// Create a dummy data generator function for each type

export enum handleType {
  drums,
  piano,
  vocal,
  guitar,
  other,
  bass
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
    const transformNodeInputs = (input: string): Input =>{
        return   {
            Name: input,
        } as Input
    }
    const transformNodeOutputs = (output: stateOutput): Output =>{
      // console.log(edge)
      // let n = (nodes.find(node => node.id == edge.source)?.data as any).nodeState as NodeState
      // console.log(n)
      // if (n.type == NodeType.Split){
      //   console.log(connection.sourceHandle.split("[", 2)[1].split("]",2)[0])
      //   switch(connection.sourceHandle.split("[", 2)[1].split("]",2)[0]){
      //     case handleType.bass:
      //     case handleType.drums:
      //     case handleType.guitar:
      //     case handleType.other:
      //     case handleType.piano:
      //     case handleType.vocal:
      //   }
      // }
      //hör output till en split? ändra namn på handle till drums, bass...: eller låt va
      output.ID
      return {
            Name: output.name,
            Src: ""
        } as Output
    }

    const transformNode = (node: flowNode): Node => {
        let data = node.data.nodeState as NodeState
        console.log(node)
        let typeData: SourceType | SignalType | MergeType | SplitType;
        switch (NodeTypeToString(data.type)){
            case "signal":{
              data.data = {
                Prompt: "classical piano",
                Seed: "1234",
              }
              break
            }
          
            case "source":{
              data.data = {
                URL: data.data.audio,
              }  
              break
            }
            // case "merge":{}
            // case "split":{}

            default:{
              data.data = {}
            }
          }

        return {
            Type: NodeTypeToString(data.type),
            Dirty: true, //TODO: handle this correctly, derive from node state
            Data: data.data,
            Inputs: data.inputs?.map(transformNodeInputs),
            Outputs: data.outputs?.map(transformNodeOutputs),
            ID: `${data.id}`
        } as Node;
    };


    const transformEdge = (edge: flowEdge): Edge => {
      let head = {
            NodeID: edge.target,
            InputName: edge.targetHandle
        }  
        let tail = {
            NodeID: edge.source,
            OutputName: edge.sourceHandle
        }   

        return {
            ID: edge.id,
            Input: head,
            Output: tail
        } as Edge;
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