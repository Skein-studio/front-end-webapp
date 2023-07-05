import React, { useState } from "react";
import { Button, Container } from "../BaseStyles";
import { useAudio } from "../AudioContext";

const GenerateAudio: React.FC = () => {
  const { audioData, setAudioData } = useAudio();

  const handleClick = () => {
    // This is where you would call your backend service to generate the audio
    // For now, we'll use a dummy audio file
    setAudioData("/dummy.mp3"); // Changed this line
  };

  return (
    <Container>
      <Button onClick={handleClick}>Generate</Button>
      {audioData && <audio src={audioData} controls />}
    </Container>
  );
};

export default GenerateAudio;
