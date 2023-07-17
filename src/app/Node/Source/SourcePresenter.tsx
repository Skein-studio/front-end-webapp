import React, { useState, useContext } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { AudioContext } from "@/app/Util/AudioContext";

const SourcePresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const [base, setBase] = useState<string>(loadBase);
  const [audioData, setAudioData] = useState<Blob | null>(loadAudio);

  function loadAudio(){
    if(node){
      return node.data.audio;
    }
    return null;
  }
  function loadBase(){ //type of source (Record, Import, Generate) is set in nodeState.data.base
    if(node){
      return node.data.base;
    }
    return "";
  }

  //useEffect to load audioData etc from backend upon component load?

  const handleBaseChange = (text: string) => {
    setBase(text);
    if (node) { 
      node.data.base = text;
    }
  };


  return (
    <AudioContext.Provider value={{ audioData, setAudioData }}>
      <SourceView
        base={base}
        handleBaseChange={handleBaseChange}
      />
    </AudioContext.Provider>
  );
};

export default SourcePresenter;
