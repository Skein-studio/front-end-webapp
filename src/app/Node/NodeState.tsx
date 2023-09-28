//NodeState.tsx

/* This file contains the NodeState class, 
which is used to store the individual state of 
each node in the graph. */

import { Coordinate } from "./Model/modelDatatypes";
import {
  NodeModel,
  NodeParameters,
  Output,
  Input,
} from "./Model/modelDatatypes";
import { v4 as uuidv4 } from "uuid";

export enum NodeType {
  Source,
  Signal,
  Merge,
  Split,
  Unspecified,
}

/**
 * Represents the state of a node in the graph.
 * Contains following properties:
 * - model: The model of the node, which is used to generate the JSON. The model contains all the information about the node, including the type, position, inputs, outputs and data.
 * - selected: Whether the node is selected or not
 * - loading: Used to show the spinner when the node is loading
 * @class NodeState
 * @constructor
 * @param {number} x - The x coordinate of the node
 * @param {number} y - The y coordinate of the node
 * @param {NodeType} type - The type of the node
 * @param {string} id - The ID of the node
 */
export class NodeState {
  model: NodeModel; // The model of the node, which is used to generate the JSON
  selected: boolean; // Whether the node is selected or not
  loading: boolean; // Used to show the spinner when the node is loading

  constructor(x: number, y: number, type: NodeType, id?: string) {
    let newID;
    id ? (newID = id) : (newID = uuidv4());
    this.model = {
      Position: { x: x, y: y },
      ID: newID,
      Dirty: true,
      Type: NodeTypeToString(type),
      Inputs: this.setInputs(type, newID),
      Outputs: this.setOutputs(type, newID),
      Data: this.initializeData(),
    };
    this.selected = false;
    this.loading = false;
  }

  /**
   * Initializes the data of the node based on the type of the node
   * @param {NodeType} type - The type of the node
   * @returns {SourceTypeModel | SignalTypeModel | MergeTypeModel | SplitTypeModel | UnspecifiedTypeModel} - The data of the node
   */
  initializeData():NodeParameters{
    let data:NodeParameters = {
      URL: "",
      base: "",
      Prompt: "",
      Seed: "1234",
    };
    return data;
  }

  /**
   * Sets the prompt of the node, used for the Signal node
   * @param {string} p - The prompt to set
   */
  setPrompt(p: string) {
    this.model.Data.Prompt = p;
  }

  /**
   * Adds a new input to the node
   */
  addTargetHandle() {
    this.model.Inputs.push({
      ID: this.model.ID + "in[" + this.model.Inputs.length + "]",
      Name: "input-[" + this.model.Inputs.length + "]",
    });
  }

  getType(): NodeType {
    return StringToNodeType(this.model.Type);
  }

  /**
   * Sets inputs of the node based on the type of the node
   * @param {NodeType} type - The type of the node
   * @param {string} ID - The ID of the node
   * @returns {Input[]} - The inputs of the node
   */
  setInputs(type: NodeType, ID: string): Input[] {
    let newInputs: Input[] = [];

    const add = () => {
      newInputs.push({
        ID: ID + "in[" + newInputs.length + "]",
        Name: "input-[" + newInputs.length + "]",
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
   * @returns {Output[]} - The outputs of the node
   */
  setOutputs(type: NodeType, ID: string): Output[] {
    let numOutputs = 0;
    let newOutputs: Output[] = [];

    const add = (name: string) => {
      newOutputs.push({
        ID: "[" + name + " " + ID + "]out[" + newOutputs.length + "]",
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
        add("output-[" + i + "]");
      }
    }
    return newOutputs;
  }

  /**
   * Sets the node to the given node, this is used to copy the state of a node to another node, like when setting unspecified nodes to a specific type
   * @param {NodeState} node - The node to set to
   */
  setNode(node: NodeState) {
    this.model = { ...node.model };
    this.selected = node.selected;
  }

  toString(): string {
    return `Node ${this.model.ID}`;
  }
  /**
   * Sets the position of the node
   * @param {number} x - The x coordinate of the node
   * @param {number} y - The y coordinate of the node
   */

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

export function StringToNodeType(nodeType: string): NodeType {
  switch (nodeType) {
    case "source":
      return NodeType.Source;
    case "signal":
      return NodeType.Signal;
    case "merge":
      return NodeType.Merge;
    case "split":
      return NodeType.Split;
    default:
      return NodeType.Unspecified;
  }
}
