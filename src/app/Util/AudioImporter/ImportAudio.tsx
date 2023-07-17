import React, { useContext, useState } from "react";
import { useAudio } from "../AudioContext";
import { NodeContext } from "@/app/Node/NodeState";

const ImportAudio: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const audioData = node?.data.audio;
  const [refresh, setRefresh] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      if (node) {
        node.data.audio = e.target.files[0];
      } else {
        console.error("No nodecontext found", this);
      }
      setRefresh(!refresh);
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
