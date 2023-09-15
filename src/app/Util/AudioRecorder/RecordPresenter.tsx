import React, { useState, useEffect, useRef, useContext } from "react";
import RecordView from "./RecordView";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import { uploadAudioBlob } from "../ComputeAPI";
import { SourceType } from "../modelTransformation";
import useAudio from "../AudioPlayback/useAudio";

const RecordPresenter: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const graph = useGraph();
  const nodeData = node.model.Data as SourceType;
  const mediaRecorder = useRef<MediaRecorder | null>(null);
  const audio = useAudio(nodeData.URL || ""); // Use the useAudio hook with the URL from nodeData

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      mediaRecorder.current = new MediaRecorder(stream);
      mediaRecorder.current.ondataavailable = async (e) => {
        if (nodeData.URL) {
          URL.revokeObjectURL(nodeData.URL);
        }
        //console.log(e.data);
        const fileUrl = await uploadAudioBlob(e.data);

        nodeData.URL = fileUrl;
        nodeData.Dirty = true;

        graph.reloadComponent(); // TODO: This should be replaced , and the node should be updated via forceReload, not just here in the OpenView but in the small view too (SourcePresenter.tsx, SignalPresenter.tsx, etc.)
        nodeContext.forceReload(); //Only this should be needed, but it's not working currently since it doesn't update the node in the small view
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
