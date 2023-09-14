import React from "react";
import { Button, Container } from "../BaseStyles";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { AudioState } from "../AudioPlayback/useAudio";

type Props = {
  isRecording: boolean;
  onStart: () => void;
  onStop: () => void;
  audioData: string | undefined;
  audioState: AudioState;
};

function RecordView({
  isRecording,
  onStart,
  onStop,
  audioState,
}: Props): JSX.Element {
  // Removed the useAudio hook call as it is already called in the parent component

  return (
    <Container>
      <Button onClick={isRecording ? onStop : onStart}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      {audioState.src && (
        <AudioPlayer
          audioState={audioState}
          audioComputed={true}
          error=""
        />
      )}
    </Container>
  );
}

export default RecordView;
