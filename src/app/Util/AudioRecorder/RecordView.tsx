import React from "react";

import { Button, Container } from "../BaseStyles";

type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  audioData: Blob | null;
};

const RecordView: React.FC<Props> = ({
  isRecording,
  onStart,
  onStop,
  audioData,
}) => {
  return (
    <Container>
      <Button onClick={isRecording ? onStop : onStart}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioData && <audio src={URL.createObjectURL(audioData)} controls />}
    </Container>
  );
};

export default RecordView;
