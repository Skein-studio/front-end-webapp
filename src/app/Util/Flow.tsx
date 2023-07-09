import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { MiniMap, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeState, NodeType, NodeContext } from "../Node/NodeState";
import { NodeTypeToString } from "../Node/NodeState";
import { GraphContext } from "../Node/GraphContext";

const proOptions = { hideAttribution: true };

const nodeTypes = {
  source: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeModel}>
      <SourcePresenter />
    </NodeContext.Provider>
  ),
  unspecified: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeModel}>
      <UnspecifiedPresenter />
    </NodeContext.Provider>
  ),
};


const Canvas: React.FC = () => {

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const graph = GraphContext;

  const onConnect = useCallback(
    (connection:any) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );
  const [mousePosition, setMousePosition] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });


  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener("mousemove", updateMousePosition);

    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);

  const addNewNode = (x: number, y: number, nodeType: NodeType) => {
    const newModel = new NodeState(x, y, [], [], nodeType);
  
    const newNode = {
      id: newModel.getID().toString(),
      type: NodeTypeToString(nodeType),
      data: { 
        label: NodeTypeToString(nodeType), 
        nodeModel: { 
          position: newModel.position,
          id: newModel.id,
          inputs: newModel.inputs,
          outputs: newModel.outputs,
          type: newModel.type,
        } 
      },
      position: { x: x, y: y },
    };
    const newNodes = [...nodes, newNode];
    setNodes(newNodes);
  };

  useEffect(() => {
    addNewNode(0, 0, NodeType.Source);
  }, []); // Empty array as dependency, so the effect runs only on mount
  

  function onConnectEndHandler() {
    const { x, y } = mousePosition;
    addNewNode(x, y, NodeType.Unspecified);
  }

  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <GraphContext.Provider value={nodes}>
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
          ><MiniMap></MiniMap></ReactFlow>
        </GraphContext.Provider>
    </div>
  );
};

function Flow(){

  return (<ReactFlowProvider>
    <Canvas></Canvas>
    </ReactFlowProvider>)
}

export default Flow;
