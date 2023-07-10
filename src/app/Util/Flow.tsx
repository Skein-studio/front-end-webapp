//Flow.tsx

import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Edge,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeType, NodeContext } from "../Node/NodeState";
import { addConnection, createNewNode, GraphContext} from "../Node/GraphContext";
import { Node, Handle, Position } from "reactflow";

const MIN_DIST_FROM_OTHER_NODES = 250;

const proOptions = { hideAttribution: true };

const nodeTypes = {
  source: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <SourcePresenter />
    </NodeContext.Provider>
  ),
  unspecified: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <UnspecifiedPresenter />
    </NodeContext.Provider>
  ),
  split: (nodeData:any) => (
    <NodeContext.Provider value = {nodeData.data.nodeState}>
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      <div>Empty (split)</div>
    </NodeContext.Provider>
  ),
  merge: (nodeData:any) => (
    <NodeContext.Provider value = {nodeData.data.nodeState}>
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
      <div>Empty (merge)</div>
    </NodeContext.Provider>
  ),
  signal: (nodeData:any) => (
    <NodeContext.Provider value = {nodeData.data.nodeState}>
      <div>
      <Handle type="source" position={Position.Top} />
      <Handle type="target" position={Position.Bottom} />
        Empty (signal)
      </div>
    </NodeContext.Provider>
  )
};

const Canvas: React.FC = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const graph = { nodes, edges };

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds) => {
        const newEdges = addEdge(connection, eds);
        addConnection(graph, connection);
        console.log(edges);
        return newEdges;
      });
    },
    [setEdges, nodes]
);


  function doesNodeExistAtPosition(x: number, y: number, nodes: Node[]): boolean {
    return nodes.some(node => 
      Math.abs(node.position.x - x) < MIN_DIST_FROM_OTHER_NODES && Math.abs(node.position.y - y) < MIN_DIST_FROM_OTHER_NODES
    );
  }
  

  function onConnectEndHandler(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      const x = event.clientX;
      const y = event.clientY;
  
      // Only add a new node if there isn't one at this position already
      if (!doesNodeExistAtPosition(x, y, nodes)) {
        addNewNode(x, y, NodeType.Unspecified);
      }
    }
  }
  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newNode = createNewNode(x, y, nodeType, graph);
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) { //update position in nodeState
    node.data.nodeState.setPosition(node.position.x, node.position.y);
  }

  useEffect(()=>{
    addNewNode(250, 250, NodeType.Source);
  },[]);


  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <GraphContext.Provider value={graph}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          onConnectEnd={onConnectEndHandler}
          nodesDraggable={true}
          nodesConnectable={true}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
        >
          {/*<MiniMap></MiniMap>*/}
        </ReactFlow>
      </GraphContext.Provider>
    </div>
  );
};

function Flow() {
  return (
    <ReactFlowProvider>
      <Canvas></Canvas>
    </ReactFlowProvider>
  );
}

export default Flow;
