import React, { useEffect, useState } from "react";
import ReactFlow, { Node } from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import UnspecifiedPresenter from "../Node/Unspecified/UnspecifiedPresenter";
import { NodeModel, NodeType, NodeContext } from "../Node/NodeModel";
import { Module } from "module";

const proOptions = { hideAttribution: true };

const nodeTypes = {
  source: (nodeData: any) => (
    <NodeContext.Provider value={nodeData.data.nodeModel}>
      <SourcePresenter />
    </NodeContext.Provider>
  ),
  unspecified: (nodeData:any) =>(
    <NodeContext.Provider value={nodeData.data.nodeModel}>
      <UnspecifiedPresenter />
    </NodeContext.Provider>
  ),
};

function NodeTypeToString(nodeType:NodeType) : string{
  switch(nodeType){
    case(NodeType.Source):
      return "source";
    case(NodeType.Signal):
      return "signal";
    case(NodeType.Merge):
      return "merge";
    case(NodeType.Split):
      return "split";
    default:
      return "unspecified";
  }
}  

const Flow: React.FC = () => {
  const [nodes, setNodes] = useState<Node[]>([]);  // useState Hook to manage nodes
  const [position, setPosition] = useState<{x: number, y: number}>({x: 0, y: 0});

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setPosition({ x: ev.clientX, y: ev.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);


  const addNode = (x:number, y:number, nodeType:NodeType) => {
    const newModel = new NodeModel(x, y, [], [], nodeType);

    const newNode = {
      id: newModel.getID().toString(),  // Call the function getID with parenthesis
      type: NodeTypeToString(nodeType),
      data: { label: NodeTypeToString(nodeType), nodeModel: newModel},
      position: { x: x, y: y },
    }
    setNodes((prevNodes) => [...prevNodes, newNode]);  // Use setNodes to update the nodes array

    console.log(nodes);
  }

  useEffect(()=>{
    addNode(0, 0, NodeType.Source);
  },[]);  // Empty array as dependency, so the effect runs only on mount

  function onConnectEndHandler(){
    const {x, y} = position;

    addNode(x, y, NodeType.Unspecified);
  }

  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} proOptions={proOptions} onConnectEnd={onConnectEndHandler} />
    </div>
  );
};

export default Flow;
