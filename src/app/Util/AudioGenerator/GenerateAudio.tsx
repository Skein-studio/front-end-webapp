//GenerateAudio.tsx

import React, { useContext, useState } from "react";
import { Button, Container } from "../BaseStyles";
import { NodeContext } from "@/app/Node/NodeState";

const GenerateAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const audioData = node?.data.audio;
  const [refresh, setRefresh] = useState(false);

  const handleClick = () => {
    // This is where you would call your backend service to generate the audio
    // For now, we'll use a dummy audio file
    setRefresh(!refresh);
    if (node) {
      node.data.audio = "/dummy.mp3";
    } else {
      console.error("No nodecontext found", this);
    }
  };

  return (
    <Container>
      <Button onClick={handleClick}>Generate</Button>
      {audioData && <audio src={audioData} controls />}
    </Container>
  );
};

export default GenerateAudio;
