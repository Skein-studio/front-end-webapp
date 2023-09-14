//NodeState.tsx

/* This file contains the NodeState class, 
which is used to store the individual state of 
each node in the graph. */

import {
  Node as NodeModel,
  SourceType,
  SignalType,
  MergeType,
  SplitType,
  UnspecifiedType,
  Output,
  Input,
} from "../Util/modelTransformation";
import { v4 as uuidv4 } from "uuid";

let nodeID = 0; // This is used to generate unique IDs for each node, IDK why it has to start at -2 to make the first Node have ID 0

export enum NodeType {
  Source,
  Signal,
  Merge,
  Split,
  Unspecified,
}

type Coordinate = {
  x: number;
  y: number;
};

export class NodeState {
  position: Coordinate; // The XY position of the node in the graph
  model: NodeModel; // The model of the node, which is used to generate the JSON
  selected: boolean; // Whether the node is selected or not
  id: string; // The ID of the node
  type: NodeType; // The type of the node (Signal, Source, Merge, Split, Unspecified)
  loading: boolean; // Used to show the spinner when the node is loading

  constructor(x: number, y: number, type: NodeType, id?: string) {
    this.position = {
      x: x,
      y: y,
    };
    this.type = type;
    id ? (this.id = id) : (this.id = uuidv4());
    this.model = {
      ID: this.id.toString(),
      Dirty: true,
      Type: NodeTypeToString(type),
      Inputs: this.setInputs(type, this.id.toString()),
      Outputs: this.setOutputs(type, this.id.toString()),
      Data: this.initializeData(type),
    };
    this.selected = false;
    this.loading = false;
  }

  initializeData(
    type: NodeType
  ): SourceType | SignalType | MergeType | SplitType | UnspecifiedType {
    switch (type) {
      case NodeType.Source:
        return { URL: "", base: "" };
      case NodeType.Signal:
        return { Prompt: "", Seed: "1234" };
      case NodeType.Merge:
        return {};
      case NodeType.Split:
        return {};
      default:
        return {};
    }
  }

  setPrompt(p: string) {
    (this.model.Data as SignalType).Prompt = p;
  }

  addTargetHandle() {
    this.model.Inputs.push({
      ID: this.model.ID + "in[" + this.model.Inputs.length + "]",
      Name: "input" + this.model.Inputs.length,
    });
  }

  setInputs(type: NodeType, ID: string): Input[] {
    let newInputs: Input[] = [];

    const add = () => {
      newInputs.push({
        ID: ID + "in[" + newInputs.length + "]",
        Name: "input" + newInputs.length,
      });
    };

    let numInputs = 0;
    switch (type) {
      case NodeType.Source:
        numInputs = 0;
        break;
      case NodeType.Merge:
        numInputs = 2;
        break;
      default:
        numInputs = 1;
        break;
    }
    for (let i = 0; i < numInputs; i++) {
      add();
    }
    return newInputs;
  }

  setOutputs(type: NodeType, ID: string): Output[] {
    let numOutputs = 0;
    let newOutputs: Output[] = [];

    const add = (name: string) => {
      newOutputs.push({
        ID: ID + "out[" + newOutputs.length + "]",
        Name: name,
        Src: "",
      });
    };
    switch (type) {
      case NodeType.Split:
        numOutputs = 6;

        break;
      default:
        numOutputs = 1;
        break;
    }
    if (type === NodeType.Split) {
      add("drums");
      add("piano");
      add("vocals");
      add("guitar");
      add("other");
      add("bass");
    } else {
      for (let i = 0; i < numOutputs; i++) {
        add("standard-output");
      }
    }

    return newOutputs;
  }

  setNode(node: NodeState) {
    this.position = node.position;
    this.model = { ...node.model };
    this.selected = node.selected;
  }

  toString(): string {
    return `Node ${this.model.ID}`;
  }

  generateID(): number {
    return nodeID++;
  }

  getID(): string {
    return this.id;
  }

  setType(type: NodeType): void {
    this.model.Type = NodeTypeToString(type);
    this.model.Data = this.initializeData(type);
    this.model.Inputs = this.setInputs(type, this.model.ID);
  }

  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }

  // Static method
  static fromJson(json: string): NodeState {
    const data = JSON.parse(json);
    return new NodeState(data.x, data.y, data.type);
  }
}

import React, { useState } from "react";

export const NodeContext = React.createContext<{
  nodeState: NodeState;
  forceReload: () => void;
}>({
  nodeState: new NodeState(0, 0, NodeType.Unspecified),
  forceReload: () => {},
});

type NodeProviderProps = {
  children: React.ReactNode;
  initialNodeState: NodeState;
};

export const NodeProvider: React.FC<NodeProviderProps> = ({
  children,
  initialNodeState,
}) => {
  const [reloadTrigger, setReloadTrigger] = useState(false);
  const [nodeState, _] = useState<NodeState>(initialNodeState);

  const forceReload = () => {
    setReloadTrigger(!reloadTrigger);
  };

  return (
    <NodeContext.Provider value={{ nodeState, forceReload }}>
      {children}
    </NodeContext.Provider>
  );
};

export function NodeTypeToString(nodeType: NodeType): string {
  switch (nodeType) {
    case NodeType.Source:
      return "source";
    case NodeType.Signal:
      return "signal";
    case NodeType.Merge:
      return "merge";
    case NodeType.Split:
      return "split";
    default:
      return "unspecified";
  }
}
