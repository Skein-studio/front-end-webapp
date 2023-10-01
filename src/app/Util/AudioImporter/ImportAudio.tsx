//ImportAudio.tsx
import React, { useContext } from "react";
import { NodeContext } from "@/app/Node/NodeState";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { Container } from "../BaseStyles";
import { uploadAudioBlob } from "../ComputeAPI";
import { useUpdateNodeInternals } from "reactflow";

/**
 * The view for the ImportAudio component, which is used to import audio for the Source node.
 * @returns A Container component, which contains an input element and an AudioPlayer.
 * */
function ImportAudio() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData = node.model.Data;
  const audioData = nodeData.URL as string;
  const audioState = useAudio(audioData);
  const updateInternals = useUpdateNodeInternals();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileUrl = await uploadAudioBlob(e.target.files[0]);
      nodeData.URL = fileUrl;
      node.model.Dirty = true;
      updateInternals(node.model.ID);
    }
  };

  return (
    <Container>
      <input type="file" accept="audio/*" onChange={handleChange} />
      {audioData && (
        <AudioPlayer audioState={audioState} audioComputed={true} error="" />
      )}
    </Container>
  );
}

export default ImportAudio;
