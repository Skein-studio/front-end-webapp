// RecordView.tsx
import React, { useEffect } from "react";
import { Button, Container } from "../BaseStyles";
import AudioPlayer from "../AudioPlayer/AudioPlayer";
import useAudio from "@/app/Util/useAudio";

type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  audioData: string | undefined;
};

function RecordView({
  isRecording,
  onStart,
  onStop,
  audioData,
}: Props): JSX.Element {
  const audioState = useAudio(audioData);

  useEffect(() => {}, [audioState]);

  return (
    <Container>
      <Button onClick={isRecording ? onStop : onStart}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioData && <AudioPlayer audioState={audioState} />}
    </Container>
  );
}

export default RecordView;
