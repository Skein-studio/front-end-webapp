import { Edge, Node, Viewport } from "reactflow";

export interface NodeModel {
  Position: Coordinate;
  ID: string;
  Dirty: boolean;
  Data: NodeParameters;
  Type: string;
  Inputs: Input[];
  Outputs: Output[];
}

export interface Graph {
  ID: string;
  version: number;
  nodes: Node[];
  edges: Edge[];
  viewport: Viewport;
}
export interface NodeParameters {
  URL: string;
  base: string; // whether the source is a record, import or generate type
  Prompt: string;
  Seed: string;
  bpm: number;
  genre: string;
  mood: string;
}

export interface Input {
  ID: string;
  Name: string;
}
export interface Output {
  ID: string;
  Name: string;
  Src: string;
} // Create a dummy data generator function for each type
export type Coordinate = {
  x: number;
  y: number;
};

export function getHandleTypes(str: string) {
  switch (str) {
    case "drums":
      return [0];
    case "piano":
      return [1];
    case "vocals":
      return [2];
    case "guitar":
      return [3];
    case "other":
      return [4];
    case "bass":
      return [5];
  }
}
