import React, { useState, useEffect, useRef, useContext } from "react";
import RecordView from "./RecordView";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import { postSoundBLOB } from "../ComputeAPI";
import { SourceType } from "../modelTransformation";
import useAudio from "../AudioPlayback/useAudio";

const RecordPresenter: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const graph = useGraph();
  const nodeData = node?.model.Data as SourceType;
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audio = useAudio(nodeData.URL || ""); // Use the useAudio hook with the URL from nodeData

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = async (e) => {
        if (node) {
          if (nodeData.URL) {
            URL.revokeObjectURL(nodeData.URL);
          }
          // const fileUrl = URL.createObjectURL(e.data);
          console.log(e.data);

          const fileUrl = await postSoundBLOB(e.data);
          nodeData.URL = fileUrl;
          nodeData.Dirty = true;
        } else {
          console.error("No nodecontext found", this);
        }

        graph.reloadComponent();// TODO: This should be replaced , and the node should be updated via forceReload, not just here in the OpenView but in the small view too (SourcePresenter.tsx, SignalPresenter.tsx, etc.)
        forceReload();
      };
    });

    return () => {
      if (nodeData.URL) {
        URL.revokeObjectURL(nodeData.URL);
      }
    };
  }, []);

  const handleStart = () => {
    if (mediaRecorder.current) {
      setIsRecording(true);
      mediaRecorder.current.start();
    }
  };

  const handleStop = () => {
    if (mediaRecorder.current) {
      setIsRecording(false);
      mediaRecorder.current.stop();
    }
  };

  return (
    <RecordView
      isRecording={isRecording}
      onStart={handleStart}
      onStop={handleStop}
      audioData={nodeData.URL}
      audioState={audio} // Pass the audio state from useAudio to the view
    />
  );
};

export default RecordPresenter;
