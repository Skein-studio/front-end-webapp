//NodeState.tsx

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
  constructor(x: number, y: number, type: NodeType, id?: number) {
    this.position = {
      x: x,
      y: y,
    };
    this.id = id || this.generateID();
    this.setInputs();
    this.setOutputs();
    this.type = type;
    console.log("Created new node:", this);
  }

  setInputs() {
    switch (this.type) {
      default:
        this.inputs = ["in"];
    }
  }

  setOutputs() {
    switch (this.type) {
      default:
        this.outputs = ["out"];
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
    let newID = nodeID;
    nodeID++;
    return newID;
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
