import React from "react";
import ReactFlow, { Node } from "reactflow";
import SourcePresenter from "../Node/Source/SourcePresenter";
import SignalPresenter from "../Node/Signal/SignalPresenter";

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

const Flow: React.FC = () => {
  return (
    <div
      style={{ height: "80vh", width: "80vw", border: "1px solid lightgray" }}
    >
      <ReactFlow nodes={nodes} nodeTypes={nodeTypes} proOptions={proOptions} />
    </div>
  );
};

export default Flow;
