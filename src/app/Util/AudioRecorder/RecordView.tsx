import React from "react";

type Props = {
  isRecording: boolean,
  onStart: () => void,
  onStop: () => void,
  audioData: Blob | null,
};

const RecordView: React.FC<Props> = ({isRecording, onStart, onStop, audioData}) => {
  return (
    <div>
      <button onClick={isRecording ? onStop : onStart}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioData && <audio src={URL.createObjectURL(audioData)} controls />}
    </div>
  );
};

export default RecordView;
