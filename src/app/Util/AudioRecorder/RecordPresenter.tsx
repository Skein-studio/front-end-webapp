import React, { useState, useEffect, useRef, useContext } from "react";
import RecordView from "./RecordView";
import { NodeContext } from "@/app/Node/NodeState";
import { uploadAudioBlob } from "../ComputeAPI";
import useAudio from "../AudioPlayback/useAudio";
import { useUpdateNodeInternals } from "reactflow";

/**
 * The presenter for the audio recorder, which is used to record audio for the Source node.
 * @returns A RecordView component.
 * */

function RecordPresenter() {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const updateInternals = useUpdateNodeInternals();
  const nodeData = node.model.Data;
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
        node.model.Dirty = true;

        updateInternals(node.model.ID);
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
}

export default RecordPresenter;
