//ImportAudio.tsx
import React, { use, useContext, useEffect, useState } from "react";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { Container } from "../BaseStyles";
import { postSoundBLOB } from "../ComputeAPI";
import { SignalType, SourceType } from "../modelTransformation";

const ImportAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const nodeData =
    (node?.model.Data as SourceType) ?? (node?.model.Data as SignalType);
  const audioData = nodeData.URL as string;
  const audioState = useAudio(audioData);
  const graph = useGraph();

  useEffect(() => {}, [audioState]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (node) {
        // const fileUrl = URL.createObjectURL(e.target.files[0]);

        const fileUrl = await postSoundBLOB(e.target.files[0]);
        nodeData.URL = fileUrl;
        console.log(node);
      } else {
        console.error("No nodecontext found");
      }
      graph.reloadComponent();
    }
  };

  useEffect(() => {
    return () => {
      // Revoke the URL when the component unmounts, if there is one
      if (nodeData.URL) {
        URL.revokeObjectURL(nodeData.URL);
      }
    };
  }, []);

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
