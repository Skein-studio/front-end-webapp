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
  OnConnectStartParams,
  OnSelectionChangeParams,
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
  deleteNodes,
  deleteEdges,
  getNode,
} from "../../Node/GraphContext";
import OpenNodePresenter from "@/app/Node/OpenNode/OpenNodePresenter";
import FlowView from "./FlowView";

/* This component's purpose is to create the flowchart 
view and handle the logic for the flowchart. 
It is the central file of the app. */

const NODE_WIDTH = 300;
const NODE_HEIGHT = 50;

const proOptions = { hideAttribution: true };

const nodeTypes = { // this is where we define the node types
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
  const [selectedNode, setSelectedNode] = useState<NodeState>(); // do not use this directly, use selectNode() instead 
  const [selectedEdge, setSelectedEdge] = useState<Edge>();
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
  function deleteSelectedNode() { // this is called when the user clicks on the delete button
    if(graph.selectedNode){
      const nodeToDelete = getNode(graph, graph.selectedNode.id);
      if (nodeToDelete) {
        deleteNodes(graph, [nodeToDelete]);
      } else {
        console.log(`No node found with id: ${graph.selectedNode.id}`);
      }
    } 
  }

  function deleteSelectedEdge() { // this is called when the user clicks on the delete button
    if(selectedEdge){
      const edgeToDelete = selectedEdge;
      if (edgeToDelete) {
        deleteEdges(graph, [edgeToDelete]);
      } else {
        console.log("huh");
      }
    }
  }


    /*
    We wrap the value passed to the provider in a useMemo hook. 
    The useMemo hook returns a memoized value that only recomputes when any of its dependencies change, 
    making sure that the reference stays the same if the values of the variables didn't change.
    This is the graph object that is passed to the GraphContext.Provider
    */
  const graph: Graph = useMemo(
    () => ({ nodes, edges, reloadComponent, selectNode, selectedNode }),
    [nodes, edges, reloadComponent, selectNode, selectedNode]
  ); 

  function stopSelect() { // this is called when the user clicks on the canvas
    deselectNode(graph);
    setSelectedNode(undefined);
    setOpenSelectedNode(false);
  }

  function onSelectionChange(params:OnSelectionChangeParams){ // this is called when an edge selection is changed
    if(params.edges.length == 0){ // if no edges are selected
      setSelectedEdge(undefined);// deselect the edge
    }else {// if an edge is selected
      setSelectedEdge(params.edges[0]);// select the edge that is first in the list of selected edges
    }
  }

  function onMove(event: MouseEvent | TouchEvent, viewport: Viewport) {// this is called when the user moves the canvas
    setViewport({ x: viewport.x, y: viewport.y, zoom: viewport.zoom }); // save the viewport
  }

  function onNodesDelete(nodesToDelete: Node[]) { // this is called when the user deletes a node
      deleteNodes(graph, nodesToDelete);//  delete the node from the graph
  }

  function onEdgesDelete(edgesToDelete: Edge[]) { // this is called when the user deletes an edge
      deleteEdges(graph, edgesToDelete); // delete the edge from the graph
  }

  const onConnect = useCallback( // this is called when the user connects two nodes
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

  function handlePaneClick() {// this is called when the user clicks on the canvas
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

  function onConnectStart(event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>, params: OnConnectStartParams) { // this is called when the user starts connecting by dragging from a node handle
    let nodeId = params.nodeId;
    let node : Node | undefined = nodes.find((node) => node.id === nodeId);
    if (node) {
      setConnectStartNode(node);
      console.log("connect start node: " + node.id);
    }
  }

  function onConnectEnd(event: MouseEvent | TouchEvent) { // this is called when the user stops connecting by dragging from a node handle
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
  
  

  const addNewNode = (x: number, y: number, nodeType: NodeType) => { // this is called when the user adds a new node
    const newNode = createNewNode(x, y, nodeType, graph); // create a new node in the graph
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    return newNode;
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) { // this is called when the user stops dragging a node
    node.data.nodeState.setPosition(node.position.x, node.position.y);     //update position in nodeState
  }

  function showSelected() { // this is called when the user clicks on a node
    if (selectedNode) {
      setOpenSelectedNode(true);
    } else {
      console.log("Cannot enlarge without selecting a node");
    }
  }
  function hideSelected() { // this is called when the user clicks on the "close" button in the node view
    setOpenSelectedNode(false);
  }

  function openNodeView() { // this is called when the user clicks on a the "open" button in the node view
    if (selectedNode) {
      return (
        <OpenNodePresenter state={selectedNode} closeWindow={stopSelect} />
      );
    } else {
      return null;
    }
  }

  useMemo(() => { // this is called when the component is first rendered, so we can add a source node
    addNewNode(250, 250, NodeType.Source);
  }, []);

  return (
    <ReactFlowProvider>
      <GraphContext.Provider value={graph}>
        <FlowView
          flowKey={flowKey}
          proOptions={proOptions}
          nodes={nodes}
          nodeTypes={nodeTypes}
          onNodesChange={onNodesChange}
          onNodesDelete={onNodesDelete}
          deleteSelectedNode={deleteSelectedNode}
          onNodeDragStop={onNodeDragStop}
          openNodeView={openNodeView}
          edges={edges}
          onEdgesDelete={onEdgesDelete}
          onEdgesChange={onEdgesChange}
          deleteSelectedEdge={deleteSelectedEdge}
          onConnect={onConnect}
          onConnectStart={onConnectStart}
          onConnectEnd={onConnectEnd}
          viewport={viewport}
          onMove={onMove}
          openSelectedNode={openSelectedNode}
          showSelected={showSelected}
          hideSelected={hideSelected}
          handlePaneClick={handlePaneClick}
          onSelectionChange={onSelectionChange}
          
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
