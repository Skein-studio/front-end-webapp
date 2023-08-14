//ImportAudio.tsx
import React, { use, useContext, useEffect, useState } from "react";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/useAudio";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import { Container } from "../BaseStyles";
import { postSoundBLOB } from "../ComputeAPI";

const ImportAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const audioData = node?.data.audio;
  const audioState = useAudio(audioData);

  const graph = useGraph();

  useEffect(() => {}, [audioState]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      if (node) {
        // const fileUrl = URL.createObjectURL(e.target.files[0]);
        
        const fileUrl = await postSoundBLOB(e.target.files[0])

        node.data.audio = fileUrl;
        console.log(node.data.audio);

      } else {
        console.error("No nodecontext found");
      }
      graph.reloadComponent();
    }
  };

  useEffect(() => {
    return () => {
      // Revoke the URL when the component unmounts, if there is one
      if (node?.data.audio) {
        URL.revokeObjectURL(node.data.audio);
      }
    };
  }, []);

  return (
    <Container>
      <input type="file" accept="audio/*" onChange={handleChange} />
      {audioData && <AudioPlayer audioState={audioState} />}
    </Container>
  );
};

export default ImportAudio;
