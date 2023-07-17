import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  Node, Handle, Position, Project,
  Edge,
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Viewport
} from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeType, NodeContext, NodeState } from "../Node/NodeState";
import {
  addConnection,
  createNewNode,
  GraphContext,
} from "../Node/GraphContext";
import { Container } from "./BaseStyles";
import SignalPresenter from "../Node/Signal/SignalPresenter";

const MIN_DIST_FROM_OTHER_NODES = 50;

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
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div>Empty (split)</div>
    </NodeContext.Provider>
  ),
  merge: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <div>Empty (merge)</div>
    </NodeContext.Provider>
  ),
  signal: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeState}>
        <SignalPresenter audioUrl="https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav"/>
    </NodeContext.Provider>
  ),
};

const Canvas: React.FC = () => {
  const reactFlowInstance = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [flowKey, setFlowKey] = useState(0);
  const [viewport, setViewport] = useState<Viewport>({x:0, y:0, zoom:1}) // find a way to save the viewport and pass it to reactflow component 
  const [openNode, setOpenNode] = useState<NodeState>(); 

  function onMove(event: MouseEvent | TouchEvent, viewport: Viewport){
    setViewport({ x: viewport.x, y: viewport.y, zoom: viewport.zoom });
  }


  const onConnect = useCallback(
    (connection: any) => {
      setEdges((eds) => {
        const newEdges = addEdge(connection, eds);
        addConnection({nodes, edges, reloadComponent, setOpenNode}, connection);
        console.log(edges);
        return newEdges;
      });
    },
    [setEdges, nodes]
  );

  const reloadComponent = () => {  
    if(flowKey == 0){
      setFlowKey(prevKey => prevKey + 1);
    }else{
      setFlowKey(prevKey => prevKey - 1);
    }
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
  
      const {x, y} = reactFlowInstance.project({x: clientX, y: clientY});
  
      // Only add a new node if there isn't one at this position already
      if (!doesNodeExistAtPosition(x-MIN_DIST_FROM_OTHER_NODES, y-MIN_DIST_FROM_OTHER_NODES, nodes)) {
        addNewNode(x-MIN_DIST_FROM_OTHER_NODES, y-MIN_DIST_FROM_OTHER_NODES, NodeType.Unspecified);
      } else{
        console.log("This is too close to an already existing node");
      }
    }
  }  
  
  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newNode = createNewNode(x, y, nodeType, {nodes, edges, reloadComponent, setOpenNode});
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  function onNodeDragStop(event: React.MouseEvent, node: Node, nodes: Node[]) {
    //update position in nodeState
    node.data.nodeState.setPosition(node.position.x, node.position.y);
  }

  useEffect(() => {
    addNewNode(250, 250, NodeType.Signal);
  }, []);

  return (
    <Container
    width="95vw"
    height="95vh"
    >
      <GraphContext.Provider value={{nodes, edges, reloadComponent, setOpenNode}}>
        <ReactFlow
          key={flowKey}  // Add this line
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
          defaultViewport={viewport}
          onMove={onMove} 
        >
          {/*<MiniMap></MiniMap>*/}
        </ReactFlow>
      </GraphContext.Provider>
    </Container>
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




//import React, { useCallback, useEffect, useState } from "react";
//import ReactFlow, {
//  MiniMap,
//  ReactFlowProvider,
//  addEdge,
//  useEdgesState,
//  useNodesState,
//} from "reactflow";
//import SourcePresenter from "../Node/Source/SourcePresenter";
//import SignalPresenter from "../Node/Signal/SignalPresenter";
//import SignalContainer from "../Node/Signal/SignalContainer";
//
//const proOptions = { hideAttribution: true };
//
//interface SignalNodeProps {
//  id: string;
//  data: {
//    spectrogramUrl: string;
//    audioUrl: string;
//  };
//}
//
//const SignalNode: React.FC<SignalNodeProps> = ({ data }) => {
//  return (
//    <SignalPresenter 
//      spectrogramUrl={data.spectrogramUrl} 
//      audioUrl={data.audioUrl} 
//    />
//  );
//};
//
//const nodeTypes = {
//  source: SourcePresenter,
//  signalNode: SignalNode,
//};
//
//const nodes: Node[] = [
//  {
//    id: "1", // Unique id for the node
//    type: "source", // This should match with the key in nodeTypes
//    data: { label: "Source Node" }, // Data passed to the node component
//    position: { x: 0, y: 0 }, // Initial position of the node
//  },
//  // more nodes and edges here...
//  {
//    id: "2", // Unique id for the node
//    type: "signalNode", // This should match with the key in nodeTypes
//    data: {
//      spectrogramUrl:  'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png',
//      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
//    }, // Data passed to the node component
//    position: { x: 500, y: 400 }, // Initial position of the node
//  },
//];
//
//  return (
//    <div
//      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
//    >
//      <GraphContext.Provider value={graph}>
//        <ReactFlow
//          nodes={nodes}
//          nodeTypes={nodeTypes}
//          proOptions={proOptions}
//          onConnectEnd={onConnectEndHandler}
//          nodesDraggable={true}
//          nodesConnectable={true}
//          onNodesChange={onNodesChange}
//          onEdgesChange={onEdgesChange}
//          onConnect={onConnect}
//        >
//          <MiniMap></MiniMap>
//        </ReactFlow>
//      </GraphContext.Provider>
//    </div>
//  );
//};
//
//function Flow() {
//  return (
//    <ReactFlowProvider>
//      <Canvas></Canvas>
//    </ReactFlowProvider>
//  );
//}
//
//export default Flow;
