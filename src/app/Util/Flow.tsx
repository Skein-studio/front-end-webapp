import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, { MiniMap, ReactFlowProvider, addEdge, useEdgesState, useNodesState } from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeModel, NodeType, NodeContext } from "../Node/NodeModel";
import { useSelector, useDispatch } from "react-redux";
import { addNode, setNodes, setEdges } from "../redux/sketchSlice";
import { RootState } from "../redux/store";
import { NodeTypeToString } from "../Node/NodeModel";

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
  const nodes = useSelector((state: RootState) => state.nodes.nodes);
  const edges = useSelector((state: RootState) => state.nodes.edges);

  const dispatch = useDispatch();
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
    const newModel = new NodeModel(x, y, [], [], nodeType);
  
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
    dispatch(addNode(newNode));
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
    </div>
  );
};

function Flow(){

  return (<ReactFlowProvider>
    <Canvas></Canvas>
    </ReactFlowProvider>)
}

export default Flow;
