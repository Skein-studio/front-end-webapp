// RecordPresenter.tsx
import React, { useState, useEffect, useRef, useContext } from "react";
import RecordView from "./RecordView";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import { postSoundBLOB } from "../ComputeAPI";

const RecordPresenter: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const graph = useGraph();
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = async (e) => {
        if (node) {
          if (node.data.audio) {
            URL.revokeObjectURL(node.data.audio);
          }
          // const fileUrl = URL.createObjectURL(e.data);
          const fileUrl = await postSoundBLOB(e.data)

          node.data.audio = fileUrl;
        } else {
          console.error("No nodecontext found", this);
        }

        graph.reloadComponent();
      };
    });

    return () => {
      if (node?.data.audio) {
        URL.revokeObjectURL(node.data.audio);
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
      audioData={node?.data.audio}
    />
  );
};

export default RecordPresenter;
