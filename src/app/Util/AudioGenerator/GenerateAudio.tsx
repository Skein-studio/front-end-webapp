import React, { useState } from "react";
import { Button, Container } from "../BaseStyles";

const dummyAudioFile = "./dummy.mp3";

const GenerateAudio: React.FC = () => {
  const [audioSrc, setAudioSrc] = useState<string>("");

  const handleClick = () => {
    // This is where you would call your backend service to generate the audio
    // For now, we'll use a dummy audio file
    setAudioSrc(dummyAudioFile);
  };

  return (
    <Container>
      <Button onClick={handleClick}>Generate</Button>
      {audioSrc && <audio src={audioSrc} controls />}
    </Container>
  );
};

export default GenerateAudio;
