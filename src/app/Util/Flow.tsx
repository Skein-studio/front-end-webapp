import React, { useCallback, useEffect, useState } from "react";
import ReactFlow, {
  MiniMap,
  ReactFlowProvider,
  addEdge,
  useEdgesState,
  useNodesState,
} from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import SignalPresenter from "../Node/Signal/SignalPresenter";
import SignalContainer from "../Node/Signal/SignalContainer";

const proOptions = { hideAttribution: true };

interface SignalNodeProps {
  id: string;
  data: {
    spectrogramUrl: string;
    audioUrl: string;
  };
}

const SignalNode: React.FC<SignalNodeProps> = ({ data }) => {
  return (
    <SignalPresenter 
      spectrogramUrl={data.spectrogramUrl} 
      audioUrl={data.audioUrl} 
    />
  );
};

const nodeTypes = {
  source: SourcePresenter,
  signalNode: SignalNode,
};

const nodes: Node[] = [
  {
    id: "1", // Unique id for the node
    type: "source", // This should match with the key in nodeTypes
    data: { label: "Source Node" }, // Data passed to the node component
    position: { x: 0, y: 0 }, // Initial position of the node
  },
  // more nodes and edges here...
  {
    id: "2", // Unique id for the node
    type: "signalNode", // This should match with the key in nodeTypes
    data: {
      spectrogramUrl:  'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png',
      audioUrl: 'https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav',
    }, // Data passed to the node component
    position: { x: 500, y: 400 }, // Initial position of the node
  },
];

  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <GraphContext.Provider value={graph}>
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
        >
          <MiniMap></MiniMap>
        </ReactFlow>
      </GraphContext.Provider>
    </div>
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
