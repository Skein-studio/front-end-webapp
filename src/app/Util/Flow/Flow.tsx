//Flow.tsx

import React, { useCallback, useEffect, useState } from "react";
import {
  Node,
  Handle,
  Position,
  Edge,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Viewport,
} from "reactflow";
import SourcePresenter from "../../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../../Node/Unspecified/UnspecifiedPresenter";
import { NodeType, NodeContext, NodeState } from "../../Node/NodeState";
import {
  addConnection,
  createNewNode,
  GraphContext,
} from "../../Node/GraphContext";
import OpenNodePresenter from "@/app/Node/OpenNode/OpenNodePresenter";
import FlowView from "./FlowView";

const MIN_DIST_FROM_OTHER_NODES = 75;

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
  split: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <Handle type="source" position={Position.Top} />{" "}
      {/*This stuff should be replaced with SplitPresenter.tsx*/}
      <Handle type="target" position={Position.Bottom} />
      <div>Empty (split)</div>
    </NodeContext.Provider>
  ),
  merge: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <Handle type="source" position={Position.Top} />
      {/*This stuff should be replaced with MergePresenter.tsx*/}
      <Handle type="target" position={Position.Bottom} />
      <div>Empty (merge)</div>
    </NodeContext.Provider>
  ),
  signal: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <div>
        <Handle type="source" position={Position.Top} />{" "}
        {/*This stuff should be replaced with SignalPresenter.tsx*/}
        <Handle type="target" position={Position.Bottom} />
        Empty (signal)
      </div>
    </NodeContext.Provider>
  ),
};

const Canvas: React.FC = () => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [flowKey, setFlowKey] = useState(0);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 }); // find a way to save the viewport and pass it to reactflow component
  const [openNode, setOpenNode] = useState<NodeState>();

  function onMove(event: MouseEvent | TouchEvent, viewport: Viewport) {
    setViewport({ x: viewport.x, y: viewport.y, zoom: viewport.zoom });
  }

  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds) => {
        const newEdges = addEdge(connection, eds);
        addConnection(
          { nodes, edges, reloadComponent, setOpenNode },
          connection
        );
        console.log(edges);
        return newEdges;
      });
    },
    [setEdges, nodes]
  );

  const reloadComponent = () => {
    if (flowKey == 0) {
      setFlowKey((prevKey) => prevKey + 1);
    } else {
      setFlowKey((prevKey) => prevKey - 1);
    }
    console.log(nodes);
    /*
      this is just a dumb temporary fix to just refresh by changing
      a property of the ReactFlow component (key), this function is passed into the GraphContext 
      so that it can be used to force a refresh from inside the context, like when setting or updating using the
      functions inside GraphContext.tsx (setNodes() etc).
      This way, we don't need to double click on any button to make it refresh
    */
  };

  function doesNodeExistAtPosition(
    x: number,
    y: number,
    nodes: Node[]
  ): boolean {
    return nodes.some(
      (node) =>
        Math.abs(node.position.x - x) < MIN_DIST_FROM_OTHER_NODES &&
        Math.abs(node.position.y - y) < MIN_DIST_FROM_OTHER_NODES
    );
  }

  function onConnectEndHandler(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      const clientX = event.clientX;
      const clientY = event.clientY;

      const { x, y } = reactFlowInstance.project({ x: clientX, y: clientY });

      // Only add a new node if there isn't one at this position already
      if (
        !doesNodeExistAtPosition(
          x - MIN_DIST_FROM_OTHER_NODES,
          y - MIN_DIST_FROM_OTHER_NODES,
          nodes
        )
      ) {
        addNewNode(
          x - MIN_DIST_FROM_OTHER_NODES,
          y - MIN_DIST_FROM_OTHER_NODES,
          NodeType.Unspecified
        );
      } else {
        console.log("This is too close to an already existing node");
      }
    }
  }

  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newNode = createNewNode(x, y, nodeType, {
      nodes,
      edges,
      reloadComponent,
      setOpenNode,
    });
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) {
    //update position in nodeState
    node.data.nodeState.setPosition(node.position.x, node.position.y);
  }

  function openNodeView() {
    function closeOpenNode() {
      setOpenNode(undefined);
    }

    if (openNode) {
      return <OpenNodePresenter state={openNode} closeWindow={closeOpenNode} />;
    } else {
      return null;
    }
  }

  useEffect(() => {
    addNewNode(250, 250, NodeType.Source);
  }, []);

  return (
    <ReactFlowProvider>
      <GraphContext.Provider
        value={{ nodes, edges, reloadComponent, setOpenNode }}
      >
        <FlowView
          flowKey={flowKey}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          onConnectEndHandler={onConnectEndHandler}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          viewport={viewport}
          onMove={onMove}
          openNodeView={openNodeView}
        />
      </GraphContext.Provider>
    </ReactFlowProvider>
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
