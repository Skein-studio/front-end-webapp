import React, { useState, useEffect, useRef, useContext } from "react";
import RecordView from "./RecordView";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";

const RecordPresenter: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const audioData = node?.data.audio;
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const graph = useGraph();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        if (node) {
          node.data.audio = e.data;
        } else {
          console.error("No nodecontext found", this);
        }
        graph.reloadComponent();
      };
    });
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
      audioData={audioData}
    />
  );
};

export default RecordPresenter;
