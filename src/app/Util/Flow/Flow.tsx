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
} from "../../Node/GraphContext";
import OpenNodePresenter from "@/app/Node/OpenNode/OpenNodePresenter";
import FlowView from "./FlowView";

/* This component's purpose is to create the flowchart 
view and handle the logic for the flowchart. 
It is the central file of the app. */
import { NODE_WIDTH, NODE_HEIGHT } from "./NodeStyles";
import useWindowDimensions from "../windowDimensions";
import {
  Input,
  Edge as edgeModel,
  gatherAllDirtyIds,
  handleType,
  transformtoTypescriptTypes,
} from "../modelTransformation";


const proOptions = { hideAttribution: true };

const nodeTypes = {
  // this is where we define the node types
  source: (nodeData: any) => (
    <NodeContext.Provider
      value={{ nodeState: nodeData.data.nodeState, forceReload: () => {} }}
    >
      <SourcePresenter />
    </NodeContext.Provider>
  ),
  unspecified: (nodeData: any) => (
    <NodeContext.Provider
      value={{ nodeState: nodeData.data.nodeState, forceReload: () => {} }}
    >
      <UnspecifiedPresenter />
    </NodeContext.Provider>
  ),
  split: (nodeData: any) => (
    <NodeContext.Provider
      value={{ nodeState: nodeData.data.nodeState, forceReload: () => {} }}
    >
      <SplitPresenter />
    </NodeContext.Provider>
  ),
  merge: (nodeData: any) => (
    <NodeContext.Provider
      value={{ nodeState: nodeData.data.nodeState, forceReload: () => {} }}
    >
      <MergePresenter />
    </NodeContext.Provider>
  ),
  signal: (nodeData: any) => (
    <NodeContext.Provider
      value={{ nodeState: nodeData.data.nodeState, forceReload: () => {} }}
    >
      <SignalPresenter />
    </NodeContext.Provider>
  ),
};

const START_ZOOM = 0.75;

const Canvas: React.FC = () => {
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
  const [openSelectedNode, setOpenSelectedNode] = useState<boolean>(false);
  const [connectStartNode, setConnectStartNode] = useState<Node>();
  const [connectStartHandleId, setConnectStartHandleId] = useState<string>();

  const reloadComponent = () => {
    console.warn("Forced reload of entire graph (reloadComponent())");
    if (flowKey == 0) {
      setFlowKey((prevKey) => prevKey + 1);
    } else {
      setFlowKey((prevKey) => prevKey - 1);
    }
    /*
      this is just a dumb temporary fix to just refresh by changing
      a property of the ReactFlow component (key), this function is passed into the GraphContext 
      so that it can be used to force a refresh from inside the context, like when setting or updating using the
      functions inside GraphContext.tsx (setNodes() etc).
      This way, we don't need to double click on any button to make it refresh
      TODO: Remove this, but to do that, must find alternative for graph.reloadComponent() in RecordPresenter & ImportAudio & GenerateAudio
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
      const nodeToDelete = getNode(graph, graph.selectedNode.id);
      if (nodeToDelete) {
        deleteNodes(graph, [nodeToDelete]);
      } else {
        console.log(`No node found with id: ${graph.selectedNode.id}`);
      }
    }
  }

  function deleteSelectedEdge() {
    // this is called when the user clicks on the delete button
    if (selectedEdge) {
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
    () => ({
      nodes,
      edges,
      reloadComponent,
      selectNode,
      selectedNode,
      setNodes,
      setEdges,
    }),
    [
      nodes,
      edges,
      reloadComponent,
      selectNode,
      selectedNode,
      setNodes,
      setEdges,
    ]
  );

  useEffect(() => {
    // this is called when the graph changes, so we can set the dirty nodes
    const root = transformtoTypescriptTypes(graph);
    const allDirtyIds = gatherAllDirtyIds(root.Sketch.Graph); // Get all the dirty IDs
    setDirtyNodes(graph, allDirtyIds);
    console.log("allDirtyIds: ", allDirtyIds);
    console.log("edges changed", edges);
  }, [/*nodes,*/ edges]);

  function stopSelect() {
    // this is called when the user clicks on the canvas
    deselectNode(graph);
    setSelectedNode(undefined);
    setOpenSelectedNode(false);
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

  const connectionToEdge = (connection: Connection): edgeModel => {
    let n = (nodes.find((node) => node.id == connection.source)?.data as any)
      .nodeState as NodeState;
    let outputName: string = "standard-output";
    let inputName: string = "standard-input";

    if (n.model.Type == "split") {
      outputName =
        handleType[
          parseInt(connection.sourceHandle!.split("[", 2)[1].split("]", 2)[0])
        ];
    }
    return {
      ID: `reactflow__edge-${connection.source}${connection.sourceHandle}-${connection.target}${connection.target}out[0]`,
      Output: {
        NodeID: connection.source!,
        OutputName: outputName,
      },
      Input: {
        NodeID: connection.target!,
        InputName: inputName,
      },
    } as edgeModel;
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
            data: connectionToEdge(connection),
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
          targetHandle: (lastNode.data.nodeState.model.Inputs[0] as Input).ID,
        };
        const newEdge = {
          id: `reactflow__edge-${newConnection.source}${newConnection.sourceHandle}-${newConnection.target}${newConnection.targetHandle}`,
          source: newConnection.source,
          target: newConnection.target,
          sourceHandle: newConnection.sourceHandle,
          targetHandle: newConnection.targetHandle,
          data: connectionToEdge(newConnection),
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
    return newNode;
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) {
    // this is called when the user stops dragging a node
    node.data.nodeState.setPosition(node.position.x, node.position.y); //update position in nodeState
  }

  function showSelected() {
    // this is called when the user clicks on a node
    if (selectedNode) {
      setOpenSelectedNode(true);
    } else {
      console.log("Cannot enlarge without selecting a node");
    }
  }
  function hideSelected() {
    // this is called when the user clicks on the "close" button in the node view
    setOpenSelectedNode(false);
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

  useMemo(() => {
    console.log("Graph loaded: ", graph)
    if(nodes.length == 0) {
      addNewNode(((window.width * 0.95) / 2 - viewport.x) / viewport.zoom - NODE_WIDTH / 2, ((window.height * 0.95) / 2 - viewport.y) / viewport.zoom - NODE_HEIGHT, NodeType.Source);
    }
  }, []);

  function addButtonHandler() {
    // this is called when the user clicks on the "add" button

    let x =
      ((window.width * 0.95) / 2 - viewport.x) / viewport.zoom - NODE_WIDTH / 2; // half the width of the node, so it's centered, relative to the viewport, not the window
    let y =
      ((window.height * 0.95) / 2 - viewport.y) / viewport.zoom - NODE_HEIGHT; // centered, relative to the viewport, not the window
    addNewNode(x, y, NodeType.Unspecified);
  }

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
          addButtonHandler={addButtonHandler}
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
