//Flow.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Node,
  Edge,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Viewport,
  OnConnectStartParams,
  OnSelectionChangeParams,
  Connection,
} from "reactflow";
import SourcePresenter from "../../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../../Node/Unspecified/UnspecifiedPresenter";
import SignalPresenter from "@/app/Node/Signal/SignalPresenter";
import SplitPresenter from "@/app/Node/Split/SplitPresenter";
import MergePresenter from "@/app/Node/Merge/MergePresenter";

import { NodeType, NodeContext, NodeState } from "../../Node/NodeState";
import {
  createNewNode,
  Graph,
  GraphContext,
  deselectNode,
  deleteNodes,
  deleteEdges,
  getNode,
  connectionExists,
  setDirtyNodes,
  RootModelToNodes,
  RootModelToEdges,
} from "../../Node/GraphContext";
import OpenNodePresenter from "@/app/Node/OpenNode/OpenNodePresenter";
import FlowView from "./FlowView";

/* This component's purpose is to create the flowchart 
view and handle the logic for the flowchart. 
It is the central file of the app. */
import { NODE_WIDTH, NODE_HEIGHT } from "../../Node/NodeStyles";
import useWindowDimensions from "../windowDimensions";
import {
  gatherAllDirtyIds,
  transformGraphToRootModel,
} from "../../Node/Model/modelTransformation";
import {
  getHandleTypes,
  InputModel,
  OutputModel,
  EdgeModel as edgeModel,
  RootModel
} from "../../Node/Model/modelDatatypes";
import { forEach } from "lodash";

const proOptions = { hideAttribution: true };

const nodeTypes = {
  // this is where we define the node types
  source: (nodeData: any) => (
    <NodeContext.Provider value={{ nodeState: nodeData.data.nodeState }}>
      <SourcePresenter />
    </NodeContext.Provider>
  ),
  unspecified: (nodeData: any) => (
    <NodeContext.Provider value={{ nodeState: nodeData.data.nodeState }}>
      <UnspecifiedPresenter />
    </NodeContext.Provider>
  ),
  split: (nodeData: any) => (
    <NodeContext.Provider value={{ nodeState: nodeData.data.nodeState }}>
      <SplitPresenter />
    </NodeContext.Provider>
  ),
  merge: (nodeData: any) => (
    <NodeContext.Provider value={{ nodeState: nodeData.data.nodeState }}>
      <MergePresenter />
    </NodeContext.Provider>
  ),
  signal: (nodeData: any) => (
    <NodeContext.Provider value={{ nodeState: nodeData.data.nodeState }}>
      <SignalPresenter />
    </NodeContext.Provider>
  ),
};

const START_ZOOM = 0.75;

interface FlowPresenterProps {
  rootModel?: RootModel;
}

/**
 * FlowPresenter is the main component of the app, it contains handlers for all the events that can happen in ReactFlow component
 * It contains the following handlers:
 * @function onConnectStart: called when the user starts connecting by dragging from a node handle
 * @function onConnectEnd: called when the user stops connecting by dragging from a node handle
 * @function onConnect: called when the user connects two nodes
 * @function onNodeDragStop: called when the user stops dragging a node
 * @function onNodesDelete: called when the user deletes a node
 * @function onEdgesDelete: called when the user deletes an edge
 * @function onMove: called when the user moves the canvas
 * @function onSelectionChange: called when an edge selection is changed
 * @function handlePaneClick: called when the user clicks on the canvas
 * @function addButtonHandler: called when the user clicks on the "add" button
 * @function showSelected: called when the user clicks on a node
 * @function hideSelected: called when the user clicks on the "close" button in the node view
 * @function deleteSelectedNode: called when the user clicks on the delete button
 * @function deleteSelectedEdge: called when the user clicks on the delete button
 * @function stopSelect: called when the user clicks on the canvas (deselects current node)
 * @function selectNode: called when the user clicks on a node (selects the node)
 * @function refresh: refreshes the graph, making the ReactFlow component re-render
 * @function addNewNode: called when the user adds a new node
 * @function doesNodeExistAtPosition: called when the user adds a new node, checks if there is already a node at the position where the user wants to add a new node
 * @function connectionToEdgeModel: called when the user adds a new node, creates an edge model from the connection
 * @function openSelectedNode: called when the user clicks on a node, opens the node view
 * @function openNodeView: called when the user clicks on a the "open" button in the node view, shows the node in enlarged view
 * @var reactFlowInstance: the ReactFlow component instance
 * @var window: the window dimensions
 * @var viewport: the viewport dimensions
 * @var nodes: the nodes in the graph
 * @var edges: the edges in the graph
 * @var flowKey: the key of the ReactFlow component, used to force a refresh
 * @var selectedNode: the currently selected node
 * @var selectedEdge: the currently selected edge
 * @var selectedNodeIsOpen: whether the node view is open or not
 * @var connectStartNode: the node that the user started connecting from
 * @var connectStartHandleId: the handle id of the node that the user started connecting from
 * @var graph: the graph object that is passed to the GraphContext.Provider
 * @param {FlowPresenterProps} props - The props of the component (a RootModel, for loading a graph).
 * @returns {JSX.Element} The ReactFlow component.
 */
export function FlowPresenter(props:FlowPresenterProps) {
  // export is for documentation purposes
  const reactFlowInstance = useReactFlow();
  const window = useWindowDimensions();
  const [viewport, setViewport] = useState<Viewport>({
    x: 0,
    y: 0,
    zoom: START_ZOOM,
  }); // find a way to save the viewport and pass it to reactflow component

  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [flowKey, setFlowKey] = useState(0);
  const [selectedNode, setSelectedNode] = useState<NodeState>(); // do not use this directly, use selectNode() instead
  const [selectedEdge, setSelectedEdge] = useState<Edge>();
  const [selectedNodeIsOpen, setSelectedNodeIsOpen] = useState<boolean>(false);
  const [connectStartNode, setConnectStartNode] = useState<Node>();
  const [connectStartHandleId, setConnectStartHandleId] = useState<string>();

  const refresh = () => {
    console.warn("Refreshed graph (refresh())");
    if (flowKey == 0) {
      setFlowKey((prevKey) => prevKey + 1);
    } else {
      setFlowKey((prevKey) => prevKey - 1);
    }
    /*
      This forces a re-render of the ReactFlow component.
    */
  };

  function selectNode(nodeState: NodeState | undefined) {
    deselectNode(graph);
    setSelectedNode(nodeState);
    nodeState!.selected = true;
  }
  function deleteSelectedNode() {
    // this is called when the user clicks on the delete button
    if (graph.selectedNode) {
      const nodeToDelete = getNode(graph, graph.selectedNode.model.ID);
      if (nodeToDelete) {
        deleteNodes(graph, [nodeToDelete]);
      } else {
        console.log(`No node found with id: ${graph.selectedNode.model.ID}`);
      }
    }
    setSelectedNode(undefined);
  }

  function deleteSelectedEdge() {
    // this is called when the user clicks on the delete button
    if (selectedEdge) {
      const edgeToDelete = selectedEdge;
      if (edgeToDelete) {
        deleteEdges(graph, [edgeToDelete]);
      } else {
        console.log("Something strange happened when trying to delete edge");
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
    () => ({
      nodes,
      edges,
      refresh,
      selectNode,
      selectedNode,
      setNodes,
      setEdges,
    }),
    [nodes, edges, refresh, selectNode, selectedNode, setNodes, setEdges]
  );

  useEffect(() => {
    // this is called when the graph changes, so we can set the dirty nodes
    const root = transformGraphToRootModel(graph);
    const allDirtyIds = gatherAllDirtyIds(root.Sketch.Graph); // Get all the dirty IDs
    setDirtyNodes(graph, allDirtyIds);
  }, [nodes, edges]);

  function stopSelect() {
    // this is called when the user clicks on the canvas
    deselectNode(graph);
    setSelectedNode(undefined);
    setSelectedNodeIsOpen(false);
  }
  function onSelectionChange(params: OnSelectionChangeParams) {
    // this is called when an edge selection is changed
    if (params.edges.length == 0) {
      // if no edges are selected
      setSelectedEdge(undefined); // deselect the edge
    } else {
      // if an edge is selected
      setSelectedEdge(params.edges[0]); // select the edge that is first in the list of selected edges
    }
  }

  function onMove(event: MouseEvent | TouchEvent, viewport: Viewport) {
    // this is called when the user moves the canvas
    setViewport({ x: viewport.x, y: viewport.y, zoom: viewport.zoom }); // save the viewport
  }

  function onNodesDelete(nodesToDelete: Node[]) {
    // this is called when the user deletes a node
    deleteNodes(graph, nodesToDelete); //  delete the node from the graph
  }

  function onEdgesDelete(edgesToDelete: Edge[]) {
    // this is called when the user deletes an edge
    deleteEdges(graph, edgesToDelete); // delete the edge from the graph
  }

  function handlePaneClick() {
    // this is called when the user clicks on the canvas
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

  const connectionToEdgeModel = (
    connection: Connection,
    newTargetNode?: Node
  ): edgeModel => {
    let inputsOfTargetNode: InputModel[];

    if (newTargetNode) {
      inputsOfTargetNode = newTargetNode.data.nodeState.model.Inputs;
    } else {
      inputsOfTargetNode = graph.nodes.find(
        (node) => node.id == connection.target
      )?.data.nodeState.model.Inputs;
    }

    let outputsOfSourceNode: OutputModel[] = graph.nodes.find(
      (node) => node.id == connection.source
    )?.data.nodeState.model.Outputs; // get the outputs of the source node

    let inputName = inputsOfTargetNode.find(
      (input: InputModel) => input.ID == connection.targetHandle
    )?.Name; // get the name of the input
    let outputName = outputsOfSourceNode.find(
      (output: OutputModel) => output.ID == connection.sourceHandle
    )?.Name; // get the name of the output

    let newEdgeModel = {
      ID: `[${connection.source}:${connection.sourceHandle}]-[${connection.target}:${connection.targetHandle}]`,
      Input: {
        NodeID: connection.target!,
        InputName: inputName,
      },
      Output: {
        NodeID: connection.source!,
        OutputName: outputName,
      },
    } as edgeModel;
    console.log("new edge model: ", newEdgeModel);
    return newEdgeModel;
  };

  const onConnect = useCallback(
    (connection: any) => {
      // Get the source and target nodes
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const targetNode = nodes.find((node) => node.id === connection.target);

      if (
        connectionExists(
          graph,
          connection.source,
          connection.target,
          connection.sourceHandle,
          connection.targetHandle
        )
      ) {
        console.log("Connection already exists", connection, edges);
        return;
      }

      // If both nodes exist and they have different ids, create a connection
      if (sourceNode && targetNode) {
        setEdges((eds) => {
          const newEdge = {
            id: `reactflow__edge-${connection.source}${connection.sourceHandle}-${connection.target}${connection.targetHandle}`,
            source: connection.source,
            target: connection.target,
            sourceHandle: connection.sourceHandle,
            targetHandle: connection.targetHandle,
            data: connectionToEdgeModel(connection),
          };
          eds.map((e) => e.data);
          const newEdges = addEdge(newEdge, eds);

          (targetNode.data as any).nodeState.model.Dirty = true;

          return newEdges;
        }); // add the edge to the list of edges, in the graph
      }
    },
    [setEdges, nodes]
  );

  function onConnectStart(
    event: React.MouseEvent<Element, MouseEvent> | React.TouchEvent<Element>,
    params: OnConnectStartParams
  ) {
    // this is called when the user starts connecting by dragging from a node handle
    let nodeId = params.nodeId;
    let handleId = params.handleId ?? undefined; // get the handle id or undefined if it is null

    let node: Node | undefined = nodes.find((node) => node.id === nodeId);
    if (node) {
      setConnectStartNode(node);
      setConnectStartHandleId(handleId); // set the handle id
    }
  }

  function onConnectEnd(event: MouseEvent | TouchEvent) {
    let clientX = 0,
      clientY = 0;

    if (connectStartHandleId?.includes("in")) {
      console.log("you can't create a signal from an input");
      return;
    }

    // Extract clientX and clientY based on event type
    if (event instanceof MouseEvent) {
      clientX = event.clientX;
      clientY = event.clientY;
    } else if (event instanceof TouchEvent && event.changedTouches[0]) {
      clientX = event.changedTouches[0].clientX;
      clientY = event.changedTouches[0].clientY;
    }

    let { x, y } = reactFlowInstance.project({ x: clientX, y: clientY });

    // Subtract viewport's position from the projected coordinates and adjust for the zoom level
    x = (x - viewport.x) / viewport.zoom - NODE_WIDTH / 4;
    y = (y - viewport.y) / viewport.zoom - NODE_HEIGHT / 2;
    // Only add a new node if there isn't one at this position already
    let newNode = null;
    if (
      !doesNodeExistAtPosition(
        x,
        y, // half the width and height of the node
        nodes
      )
    ) {
      newNode = addNewNode(x, y, NodeType.Signal);
    } else {
      console.log("This is too close to an already existing node");
    }

    // If a node was created by dragging, automatically connect it
    if (connectStartNode && newNode) {
      const lastNode = newNode; // the node that was just added

      if (lastNode && lastNode.type !== "unspecified") {
        let newConnection: Connection = {
          source: connectStartNode.id,
          target: lastNode.id,
          sourceHandle: connectStartHandleId!,
          targetHandle: (lastNode.data.nodeState.model.Inputs[0] as InputModel)
            .ID,
        };
        const newEdge = {
          id: `reactflow__edge-${newConnection.source}${newConnection.sourceHandle}-${newConnection.target}${newConnection.targetHandle}`,
          source: newConnection.source,
          target: newConnection.target,
          sourceHandle: newConnection.sourceHandle,
          targetHandle: newConnection.targetHandle,
          data: connectionToEdgeModel(newConnection, newNode),
        };
        setEdges((eds) => {
          const newEdges = addEdge(newEdge, eds);
          return newEdges;
        });
      }
      setConnectStartNode(undefined); // reset the start node
      setConnectStartHandleId(""); // reset the handle id
    }
  }

  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    // this is called when the user adds a new node
    const newNode = createNewNode(x, y, nodeType); // create a new node
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
    console.log("nodes updated: ", newNodes);
    selectNode(newNode.data.nodeState); // select the new node
    return newNode;
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) {
    // this is called when the user stops dragging a node
    node.data.nodeState.setPosition(node.position.x, node.position.y); //update position in nodeState
  }

  function showSelected() {
    // this is called when the user clicks on a node
    if (selectedNode) {
      setSelectedNodeIsOpen(true);
    } else {
      console.log("Cannot enlarge without selecting a node");
    }
  }
  function hideSelected() {
    // this is called when the user clicks on the "close" button in the node view
    setSelectedNodeIsOpen(false);
  }

  function openNodeView() {
    // this is called when the user clicks on a the "open" button in the node view
    if (selectedNode) {
      return (
        <OpenNodePresenter state={selectedNode} closeWindow={stopSelect} />
      );
    } else {
      return null;
    }
  }

  function addButtonHandler() {
    // this is called when the user clicks on the "add" button

    let x =
      ((window.width * 0.95) / 2 - viewport.x) / viewport.zoom - NODE_WIDTH / 2; // half the width of the node, so it's centered, relative to the viewport, not the window
    let y =
      ((window.height * 0.95) / 2 - viewport.y) / viewport.zoom - NODE_HEIGHT; // centered, relative to the viewport, not the window
    addNewNode(x, y, NodeType.Unspecified);
  }

  useMemo(() => {

    if(props.rootModel){
      let loadedNodes = RootModelToNodes(props.rootModel);
      let loadedEdges = RootModelToEdges(props.rootModel);
      setNodes(loadedNodes);
      setEdges(loadedEdges);
      graph.refresh();
      console.log("Graph loaded: ", props.rootModel, graph);
      return;
    }
    
    if (nodes.length == 0) {
      addNewNode(
        ((window.width * 0.95) / 2 - viewport.x) / viewport.zoom -
          NODE_WIDTH / 2,
        ((window.height * 0.95) / 2 - viewport.y) / viewport.zoom - NODE_HEIGHT,
        NodeType.Source
      );
    }
    console.log("Graph created: ", graph);
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
          openSelectedNode={selectedNodeIsOpen}
          showSelected={showSelected}
          hideSelected={hideSelected}
          handlePaneClick={handlePaneClick}
          onSelectionChange={onSelectionChange}
          addButtonHandler={addButtonHandler}
        />
      </GraphContext.Provider>
    </ReactFlowProvider>
  );
}

/**
 * Wrapper for the ReactFlow component
 * @returns {JSX.Element} The wrapped ReactFlow component.
 */
function FlowWrapper(props:FlowPresenterProps) {
  return (
    <ReactFlowProvider>
      <FlowPresenter rootModel={props.rootModel}></FlowPresenter>
    </ReactFlowProvider>
  );
}

export default FlowWrapper;
