import React, { useContext, useState } from "react";
import { useAudio } from "../AudioContext";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";

const ImportAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const audioData = node?.data.audio;

  const graph = useGraph();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (node) {
        node.data.audio = e.target.files[0];
      } else {
        console.error("No nodecontext found", this);
      }
      graph.reloadComponent();
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleChange} />
      {audioData && <audio src={URL.createObjectURL(audioData)} controls />}
    </div>
  );
};

export default ImportAudio;
