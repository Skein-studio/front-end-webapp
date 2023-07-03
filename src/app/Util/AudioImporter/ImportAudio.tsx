import React, { useState } from "react";

const ImportAudio: React.FC = () => {
  const [audioFile, setAudioFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setAudioFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <input type="file" accept="audio/*" onChange={handleChange} />
      {audioFile && <audio src={URL.createObjectURL(audioFile)} controls />}
    </div>
  );
};

export default ImportAudio;
