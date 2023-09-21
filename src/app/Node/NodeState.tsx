//NodeState.tsx

/* This file contains the NodeState class, 
which is used to store the individual state of 
each node in the graph. */

import {
  NodeModel as NodeModel,
  SourceTypeModel,
  SignalTypeModel,
  MergeTypeModel,
  SplitTypeModel,
  UnspecifiedTypeModel,
  OutputModel,
  InputModel,
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
/**
 * Represents the state of a node in the graph.
 * Contains following properties:
 * - position: The XY position of the node in the graph
 * - model: The model of the node, which is used to generate the JSON
 * - selected: Whether the node is selected or not
 * - id: The ID of the node
 * - type: The type of the node (Signal, Source, Merge, Split, Unspecified)
 * - loading: Used to show the spinner when the node is loading
 * @class NodeState
 * @constructor
 * @param {number} x - The x coordinate of the node
 * @param {number} y - The y coordinate of the node
 * @param {NodeType} type - The type of the node
 * @param {string} id - The ID of the node
 */
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

  /**
   * Initializes the data of the node based on the type of the node
   * @param {NodeType} type - The type of the node
   * @returns {SourceTypeModel | SignalTypeModel | MergeTypeModel | SplitTypeModel | UnspecifiedTypeModel} - The data of the node
   */
  initializeData(
    type: NodeType
  ):
    | SourceTypeModel
    | SignalTypeModel
    | MergeTypeModel
    | SplitTypeModel
    | UnspecifiedTypeModel {
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

  /**
   * Sets the prompt of the node, used for the Signal node
   * @param {string} p - The prompt to set
   */
  setPrompt(p: string) {
    (this.model.Data as SignalTypeModel).Prompt = p;
  }

  /**
   * Adds a new input to the node
   */
  addTargetHandle() {
    this.model.Inputs.push({
      ID: this.model.ID + "in[" + this.model.Inputs.length + "]",
      Name: "input" + this.model.Inputs.length,
    });
  }

  /**
   * Sets inputs of the node based on the type of the node
   * @param {NodeType} type - The type of the node
   * @param {string} ID - The ID of the node
   * @returns {InputModel[]} - The inputs of the node
   */
  setInputs(type: NodeType, ID: string): InputModel[] {
    let newInputs: InputModel[] = [];

    const add = () => {
      newInputs.push({
        ID: "[" + ID + "]in[" + newInputs.length + "]",
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

  /**
   * Sets outputs of the node based on the type of the node
   * @param {NodeType} type - The type of the node
   * @param {string} ID - The ID of the node
   * @returns {OutputModel[]} - The outputs of the node
   */
  setOutputs(type: NodeType, ID: string): OutputModel[] {
    let numOutputs = 0;
    let newOutputs: OutputModel[] = [];

    const add = (name: string) => {
      newOutputs.push({
        ID: "[" + ID + "]out[" + newOutputs.length + "]",
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
        add("output[" + i + "]");
      }
    }

    return newOutputs;
  }

  /**
   * Sets the node to the given node, this is used to copy the state of a node to another node, like when setting unspecified nodes to a specific type
   * @param {NodeState} node - The node to set to
   */
  setNode(node: NodeState) {
    this.position = node.position;
    this.model = { ...node.model };
    this.selected = node.selected;
  }

  toString(): string {
    return `Node ${this.model.ID}`;
  }

  getID(): string {
    return this.id;
  }
  /**
   * Sets the position of the node
   * @param {number} x - The x coordinate of the node
   * @param {number} y - The y coordinate of the node
   */
  setPosition(x: number, y: number) {
    this.position.x = x;
    this.position.y = y;
  }
}

import React, { useState } from "react";

/**
 * The context of the node, used to store the state of the node
 * @type {React.Context<{nodeState: NodeState}>}
 * @property {NodeState} nodeState - The state of the node
 * @property {React.ReactNode} children - The children of the node, this will be the different presenters (SourcePresenter, SignalPresenter etc)
 * @property {NodeState} initialNodeState - The initial state of the node
 * @property {React.FC<NodeProviderProps>} NodeProvider - The provider of the node
 */
export const NodeContext = React.createContext<{
  nodeState: NodeState;
}>({
  nodeState: new NodeState(0, 0, NodeType.Unspecified),
});

type NodeProviderProps = {
  children: React.ReactNode;
  initialNodeState: NodeState;
};

export const NodeProvider: React.FC<NodeProviderProps> = ({
  children,
  initialNodeState,
}) => {
  const [nodeState, _] = useState<NodeState>(initialNodeState);

  return (
    <NodeContext.Provider value={{ nodeState }}>
      {children}
    </NodeContext.Provider>
  );
};

/**
 * Converts the NodeType to a string
 * @param {NodeType} nodeType - The type of the node
 * @returns {string} - The string representation of the node type
 * @example
 * NodeTypeToString(NodeType.Source) // "source"
 */
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
