//ImportAudio.tsx
import React, { useContext, useEffect } from "react";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { Container } from "../BaseStyles";
import { uploadAudioBlob } from "../ComputeAPI";
import { SignalType, SourceType } from "../modelTransformation";

const ImportAudio: React.FC = () => {
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const nodeData =
    (node.model.Data as SourceType) ?? (node.model.Data as SignalType);
  const audioData = nodeData.URL as string;
  const audioState = useAudio(audioData);
  const graph = useGraph();

  useEffect(() => {}, [audioState]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const fileUrl = await uploadAudioBlob(e.target.files[0]);
      nodeData.URL = fileUrl;
      node.model.Dirty = true;
      forceReload();
      graph.reloadComponent(); // TODO: This should be replaced , and the node should be updated via forceReload, not just here in the OpenView but in the small view too (SourcePresenter.tsx, SignalPresenter.tsx, etc.)
    }
  };
/*
  useEffect(() => {
    return () => {
      // Revoke the URL when the component unmounts, if there is one
      if (nodeData.URL) {
        URL.revokeObjectURL(nodeData.URL);
      }
    };
  }, []);
*/
  return (
    <Container>
      <input type="file" accept="audio/*" onChange={handleChange} />
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

export default ImportAudio;
