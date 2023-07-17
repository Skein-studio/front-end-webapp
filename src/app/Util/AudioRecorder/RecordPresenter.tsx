import React, { useState, useEffect, useRef, useContext } from "react";
import RecordView from "./RecordView";
import { useAudio } from "../AudioContext";
import { NodeContext } from "@/app/Node/NodeState";

const RecordPresenter: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const { audioData, setAudioData } = useAudio();
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = (e) => {
        setAudioData(e.data);
        if(node){
          node.data.audio = e.data;
        }
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
