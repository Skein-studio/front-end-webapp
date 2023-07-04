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

type Connection = {
  nodeId: string;
};

export class NodeModel {
  position: Coordinate;
  id: number;
  inputs: Connection[];
  outputs: Connection[];
  type:NodeType;

  constructor(
    x: number,
    y: number,
    inputs: Connection[],
    outputs: Connection[],
    type:NodeType,
  ) {
    this.position = {
      x: x,
      y: y,
    };
    this.id = this.generateID();
    this.inputs = inputs;
    this.outputs = outputs;
    this.type = type;
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

  // Static method
  static fromJson(json: string): NodeModel {
    const data = JSON.parse(json);
    return new NodeModel(data.x, data.y, data.inputs, data.outputs, data.type);
  }
}

import React from 'react';

export const NodeContext = React.createContext<NodeModel | undefined>(undefined);
