import React from 'react';
import ReactFlow, { Node } from 'reactflow';
import Source from '../Node/Source';

const nodeTypes = {
  source: Source,
};

const initialNodes: Node[] = [
    {
      id: '1', // Unique id for the node
      type: 'source', // This should match with the key in nodeTypes
      data: { label: 'Source Node' }, // Data passed to the node component
      position: { x: 0, y: 0 }, // Initial position of the node
    },
    // more nodes and edges here...
  ];
  
const Flow: React.FC = () => {
  return (
    <div style={{ height: "80vh", width: "80vw", border:"1px solid lightgray"}}>
      <ReactFlow nodes={initialNodes} nodeTypes={nodeTypes} /> 
    </div>
  );
};

export default Flow;
