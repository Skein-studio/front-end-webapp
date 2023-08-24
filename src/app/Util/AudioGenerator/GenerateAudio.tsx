//GenerateAudio.tsx

import React, { useContext } from "react";
import { Button, Container } from "../BaseStyles";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { SourceType } from "../modelTransformation";

const GenerateAudio: React.FC = () => {
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const nodeData = node?.model.Data as SourceType;
  const audioData = nodeData.URL;
  const graph = useGraph();
  const audioState = useAudio(audioData);

  const handleClick = async () => {
    // This is where you would call your backend service to generate the audio
    // For now, we'll use a dummy audio file
    nodeData.Dirty = true;
    nodeData.URL = "/dummy.mp3";
    graph.reloadComponent(); // TODO: This should be replaced , and the node should be updated via forceReload, not just here in the OpenView but in the small view too (SourcePresenter.tsx, SignalPresenter.tsx, etc.)
    forceReload(); // Only this should be needed, but it's not working currently since it doesn't update the node in the small view
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
