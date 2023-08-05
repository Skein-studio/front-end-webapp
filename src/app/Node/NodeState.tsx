//NodeState.tsx

/* This file contains the NodeState class, 
which is used to store the individual state of 
each node in the graph. */

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
  id: number;
  inputs: string[] | undefined; // later for deciding which output is what, - these are just strings representing the name of each in/output
  outputs: string[] | undefined;
  type: NodeType;
  data: any = {};
  dirty: boolean = false; // not sure if this should be initialized to true or false
  selected: boolean;

  constructor(x: number, y: number, type: NodeType, id?: number) {
    this.position = {
      x: x,
      y: y,
    };
    this.id = id || this.generateID();
    this.type = type;
    this.selected = false;
    this.setInputs();
    this.setOutputs();
    //console.log("Created new node:", this);
  }

  setInputs() {
    // HandleIDs must be unique, so we add the node ID to the beginning of each handle ID
    switch (this.type) {
      case NodeType.Source:
        this.inputs = [];
        break;
      case NodeType.Merge:
        this.inputs = [this.id + "in0", this.id + "in1"];
        break;
      default:
        this.inputs = [this.id + "in0"];
        break;
    }
  }

  setOutputs() {
    switch (
      this.type // HandleIDs must be unique, so we add the node ID to the beginning of each handle ID
    ) {
      case NodeType.Split:
        this.outputs = [
          this.id + "out0",
          this.id + "out1",
          this.id + "out2",
          this.id + "out3",
          this.id + "out4",
          this.id + "out5",
        ];
        break;
      default:
        this.outputs = [this.id + "out0"];
        break;
    }
  }

  setNode(node: NodeState) {
    this.position = node.position;
    this.id = node.id;
    this.inputs = node.inputs;
    this.outputs = node.outputs;
    this.type = node.type;
  }

  // Instance method
  toString(): string {
    return `Node ${this.id}`;
  }

  generateID(): number {
    return nodeID++;
  }

  getID(): number {
    return this.id;
  }

  setType(type: NodeType): void {
    this.type = type;
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

import React from "react";

export const NodeContext = React.createContext<NodeState | undefined>(
  undefined
);

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
