//GenerateAudio.tsx

import React, { useContext, useState } from "react";
import { Button, Container } from "../BaseStyles";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";

const GenerateAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const audioData = node?.data.audio;
  const graph = useGraph();

  const handleClick = () => {
    // This is where you would call your backend service to generate the audio
    // For now, we'll use a dummy audio file
    if (node) {
      node.data.audio = "/dummy.mp3";
    } else {
      console.error("No nodecontext found", this);
    }
    graph.reloadComponent();
  };

  return (
    <Container>
      <Button onClick={handleClick}>Generate</Button>
      {audioData && <audio src={audioData} controls />}
    </Container>
  );
};

export default GenerateAudio;
