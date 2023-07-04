import React, { useState } from "react";
import { useAudio } from "../AudioContext";

const ImportAudio: React.FC = () => {
  const { audioData, setAudioData } = useAudio();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioData(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleChange} />
      {audioData && <audio src={URL.createObjectURL(audioData)} controls />}
    </div>
  );
};

export default ImportAudio;
