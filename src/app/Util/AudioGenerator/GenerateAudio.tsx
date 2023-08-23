//GenerateAudio.tsx

import React, { useContext, useState } from "react";
import { Button, Container } from "../BaseStyles";
import { NodeContext } from "@/app/Node/NodeState";
import { setNode, useGraph, getNode } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { SourceType } from "../modelTransformation";

const GenerateAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const nodeData = node?.model.Data as SourceType;
  const audioData = nodeData.URL;
  const graph = useGraph();
  const audioState = useAudio(audioData);
  const [reload, setReload] = useState<boolean>(false);

  const handleClick = async () => {
    // This is where you would call your backend service to generate the audio
    // For now, we'll use a dummy audio file
    nodeData.Dirty = true;
    nodeData.URL = "/dummy.mp3";
    
    graph.reloadComponent();
  };

  return (
    <Container>
      <Button onClick={handleClick}>Generate</Button>
      {audioData && (
        <AudioPlayer
          audioState={audioState}
          isComputing={false}
          audioComputed={true}
          error=""
        />
      )}
    </Container>
  );
};

export default GenerateAudio;
