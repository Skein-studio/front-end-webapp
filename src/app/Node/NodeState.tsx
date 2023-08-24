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

let nodeID = 0;

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
  position: Coordinate;
  model: NodeModel;
  selected: boolean;
  id: number;
  type: NodeType;

  constructor(x: number, y: number, type: NodeType, id?: number) {
    this.position = {
      x: x,
      y: y,
    };
    this.type = type;
    id ? (this.id = id) : (this.id = this.generateID());
    this.model = {
      ID: this.id.toString(),
      Dirty: true,
      Type: NodeTypeToString(type),
      Inputs: this.setInputs(type, this.id.toString()),
      Outputs: this.setOutputs(type, this.id.toString()),
      Data: this.initializeData(type),
    };
    this.selected = false;
  }

  initializeData(
    type: NodeType
  ): SourceType | SignalType | MergeType | SplitType | UnspecifiedType {
    switch (type) {
      case NodeType.Source:
        return { URL: "", base: "" };
      case NodeType.Signal:
        return { Prompt: "Piano", Seed: "1234" };
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
    });
  }

  setInputs(type: NodeType, ID: string): Input[] {
    let newInputs: Input[] = [];

    const add = () => {
      newInputs.push({
        ID: ID + "in[" + newInputs.length + "]",
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
      add("vocal");
      add("guitar");
      add("other");
      add("bass");
    } else {
      for (let i = 0; i < numOutputs; i++) {
        add("");
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

  getID(): number {
    return parseInt(this.model.ID, 10);
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
  initialNodeState: NodeState; // Add this line to define a new prop for the initial node state
};

export const NodeProvider: React.FC<NodeProviderProps> = ({
  children,
  initialNodeState,
}) => {
  const [reloadTrigger, setReloadTrigger] = useState(0);
  const [nodeState, setNodeState] = useState<NodeState>(
    initialNodeState
  );

  const forceReload = () => {
    setReloadTrigger((prev) => prev + 1);
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
