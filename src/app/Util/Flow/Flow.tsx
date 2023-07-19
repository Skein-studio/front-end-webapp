//Flow.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
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
  Connection,
  OnConnectStartParams,
} from "reactflow";
import SourcePresenter from "../../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../../Node/Unspecified/UnspecifiedPresenter";
import SignalPresenter from "@/app/Node/Signal/SignalPresenter";
import SplitPresenter from "@/app/Node/Split/SplitPresenter";
import { NodeType, NodeContext, NodeState } from "../../Node/NodeState";
import {
  addConnection,
  createNewNode,
  Graph,
  GraphContext,
  deselectNode,
} from "../../Node/GraphContext";
import OpenNodePresenter from "@/app/Node/OpenNode/OpenNodePresenter";
import FlowView from "./FlowView";

const NODE_WIDTH = 300;
const NODE_HEIGHT = 50;

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
      <SplitPresenter/>
    </NodeContext.Provider>
  ),
  merge: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <Handle type="target" position={Position.Top} />
      {/*This stuff should be replaced with MergePresenter.tsx*/}
      <Handle type="source" position={Position.Bottom} />
      <div>Empty (merge)</div>
    </NodeContext.Provider>
  ),
  signal: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <SignalPresenter/>
    </NodeContext.Provider>
  ),
};

const Canvas: React.FC = () => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [flowKey, setFlowKey] = useState(0);
  const [viewport, setViewport] = useState<Viewport>({ x: 0, y: 0, zoom: 1 }); // find a way to save the viewport and pass it to reactflow component
  const [selectedNode, setSelectedNode] = useState<NodeState>();
  const [openSelectedNode, setOpenSelectedNode] = useState<boolean>(false);
  const [connectStartNode, setConnectStartNode] = useState<Node>();

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
  function selectNode(nodeState: NodeState | undefined) {
    deselectNode(graph);
    setSelectedNode(nodeState);
    nodeState!.selected = true;
  }

    /*
    We wrap the value passed to the provider in a useMemo hook. 
    The useMemo hook returns a memoized value that only recomputes when any of its dependencies change, 
    making sure that the reference stays the same if the values of the variables didn't change.
    */
  const graph: Graph = useMemo(
    () => ({ nodes, edges, reloadComponent, selectNode, selectedNode }),
    [nodes, edges, reloadComponent, selectNode, selectedNode]
  );

  function stopSelect() {
    deselectNode(graph);
    setSelectedNode(undefined);
    setOpenSelectedNode(false);
  }

  function onMove(event: MouseEvent | TouchEvent, viewport: Viewport) {
    setViewport({ x: viewport.x, y: viewport.y, zoom: viewport.zoom });
  }

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

  function handlePaneClick() {
    stopSelect();
  }

  function doesNodeExistAtPosition(
    x: number,
    y: number,
    nodes: Node[]
  ): boolean {
    return nodes.some(
      (node) =>
        Math.abs(node.position.x - x) < NODE_WIDTH &&
        Math.abs(node.position.y - y) < NODE_HEIGHT
    );
  }

  function onConnectStart(event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>, params: OnConnectStartParams) {
    let nodeId = params.nodeId;
    let node : Node | undefined = nodes.find((node) => node.id === nodeId);
    if (node) {
      setConnectStartNode(node);
      console.log("connect start node: " + node.id);
    }
  }

  function onConnectEnd(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      const clientX = event.clientX;
      const clientY = event.clientY;

      let { x, y } = reactFlowInstance.project({ x: clientX, y: clientY });

         // Add the viewport's position to the projected coordinates
      x -= viewport.x;
      y -= viewport.y;

      // Only add a new node if there isn't one at this position already
      if (
        !doesNodeExistAtPosition(
          x - NODE_WIDTH,
          y - NODE_HEIGHT, // height of the node
          nodes
        )
      ) {
        let newNode = addNewNode(
          x - NODE_WIDTH/2,
          y - NODE_HEIGHT/2, // half the height of the node
          NodeType.Signal
        );
        // add a connection with the new node
      } else {
        console.log("This is too close to an already existing node");
      }
    }
  }

  useEffect(() => { // this is called when a node is added, so we can add a connection between the start node and the new node
    if (connectStartNode) {
      const lastNode = nodes[nodes.length - 1]; // the node that was just added
      if (lastNode) {
        setEdges((eds) => {
          const edgeId = `e${connectStartNode.id}-${lastNode.id}`; // generate a unique id for the edge
          const newEdges = addEdge(
            { 
              id: edgeId, 
              source: connectStartNode.id, 
              target: lastNode.id, 
              animated: true 
            }, 
            eds
          );
          addConnection(graph, 
            { 
              id: edgeId,
              source: connectStartNode.id, 
              target: lastNode.id, 
            }
          );
          return newEdges;
        });
      }
      setConnectStartNode(undefined);
    }
  }, [nodes]);
  
  

  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newNode = createNewNode(x, y, nodeType, graph);
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    return newNode;
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) {
    //update position in nodeState
    node.data.nodeState.setPosition(node.position.x, node.position.y);
  }

  function showSelected() {
    if (selectedNode) {
      setOpenSelectedNode(true);
    } else {
      console.log("Cannot enlarge without selecting a node");
    }
  }
  function hideSelected() {
    setOpenSelectedNode(false);
  }

  function openNodeView() {
    if (selectedNode) {
      return (
        <OpenNodePresenter state={selectedNode} closeWindow={stopSelect} />
      );
    } else {
      return null;
    }
  }

  useMemo(() => {
    addNewNode(250, 250, NodeType.Source);
  }, []);

  return (
    <ReactFlowProvider>
      <GraphContext.Provider value={graph}>
        <FlowView
          flowKey={flowKey}
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          proOptions={proOptions}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeDragStop={onNodeDragStop}
          viewport={viewport}
          onMove={onMove}
          openNodeView={openNodeView}
          openSelectedNode={openSelectedNode}
          showSelected={showSelected}
          hideSelected={hideSelected}
          handlePaneClick={handlePaneClick}
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
