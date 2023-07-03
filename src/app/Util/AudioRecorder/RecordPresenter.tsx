import React, { useState, useEffect, useRef } from 'react';
import RecordView from './RecordView';

const RecordPresenter: React.FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [audioData, setAudioData] = useState<Blob | null>(null);
  const mediaRecorder = useRef<MediaRecorder | null>(null);

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        mediaRecorder.current = new MediaRecorder(stream);
        mediaRecorder.current.ondataavailable = e => {
          setAudioData(e.data);
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
