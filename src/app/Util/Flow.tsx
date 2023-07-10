import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeState, NodeType, NodeContext } from "../Node/NodeState";
import { createNewNode } from "../Node/GraphContext";
import { GraphContext } from "../Node/GraphContext";
import { Node } from "reactflow";

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
};

const Canvas: React.FC = () => {
  const initialNodes = [createNewNode(250, 250, NodeType.Source)];
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const graph = { nodes };

  const onConnect = useCallback(
    (connection: any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  function onConnectEndHandler(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      addNewNode(event.clientX, event.clientY, NodeType.Unspecified);
    }
  }

  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newNode = createNewNode(x, y, nodeType);
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) { //update position in nodeState
    node.data.nodeState.setPosition(node.position.x, node.position.y);
    console.log(node);
  }

  /*
  useEffect(() => {
    addNewNode(0, 0, NodeType.Source);
  }, []); // Empty array as dependency, so the effect runs only on mount
*/

  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <GraphContext.Provider value={graph}>
        <ReactFlow
          nodes={nodes}
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
