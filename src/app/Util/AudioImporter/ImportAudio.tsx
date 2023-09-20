//ImportAudio.tsx
import React, { useContext } from "react";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { Container } from "../BaseStyles";
import { uploadAudioBlob } from "../ComputeAPI";
import { SignalTypeModel, SourceTypeModel } from "../modelTransformation";

const ImportAudio: React.FC = () => {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData =
    (node.model.Data as SourceTypeModel) ??
    (node.model.Data as SignalTypeModel);
  const audioData = nodeData.URL as string;
  const audioState = useAudio(audioData);
  const graph = useGraph();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileUrl = await uploadAudioBlob(e.target.files[0]);
      nodeData.URL = fileUrl;
      node.model.Dirty = true;
      graph.refresh();
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
};

export default ImportAudio;
