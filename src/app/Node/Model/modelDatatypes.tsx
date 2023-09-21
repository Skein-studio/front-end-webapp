export interface RootModel {
  Sketch: {
    ID: string;
    Name: string;
    Graph: GraphModel;
  };
}
export interface GraphModel {
  Edges: EdgeModel[];
  Nodes: NodeModel[];
}

export interface EdgeModel {
  ID: string;
  Input: {
    NodeID: string;
    InputName: string;
  };
  Output: {
    NodeID: string;
    OutputName: string;
  };
}
export interface NodeModel {
  Position: Coordinate;
  ID: string;
  Dirty: boolean;
  Data:
    | SourceTypeModel
    | SignalTypeModel
    | MergeTypeModel
    | SplitTypeModel
    | UnspecifiedTypeModel;
  Type: string;
  Inputs: InputModel[];
  Outputs: OutputModel[];
}
export interface SourceTypeModel {
  URL: string;
  base: string; // whether the source is a record, import or generate type
}
export interface SignalTypeModel {
  Prompt: string;
  Seed: string;
}
export interface MergeTypeModel {}
export interface SplitTypeModel {}
export interface UnspecifiedTypeModel {}

export interface InputModel {
  ID: string;
  Name: string;
}
export interface OutputModel {
  ID: string;
  Name: string;
  Src: string;
} // Create a dummy data generator function for each type
export type Coordinate = {
  x: number;
  y: number;
};

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
  Position: { x: 0, y: 0 },
  ID: "dummyNodeID",
  Dirty: false,
  Type: "source",
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
export const createDummyRootModel = (): RootModel => ({
  Sketch: {
    ID: "dummySketchID",
    Name: "dummySketchName",
    Graph: createDummyGraphModel(),
  },
});
export const dummyData: RootModel = createDummyRootModel();
