import React, { useState, useContext } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";
import { AudioContext } from "@/app/Util/AudioContext";

const SourcePresenter: React.FC = () => {
  const [showLargeView, setShowLargeView] = useState<boolean>(false);
  const [base, setBase] = useState<string>("");
  const [audioData, setAudioData] = useState<Blob | null>(null);

  const node = useContext(NodeContext); // Use NodeContext to get NodeModel instance

  //useEffect to load audioData etc from backend upon component load?

  const handleBaseChange = (text: string) => {
    setBase(text);
  };

  const handleDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLargeView(false);
  };

  const handleToggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLargeView(!showLargeView);
  };

  return (
    <AudioContext.Provider value={{ audioData, setAudioData }}>
      <SourceView
        showLargeView={showLargeView}
        handleToggleView={handleToggleView}
        base={base}
        handleBaseChange={handleBaseChange}
        handleDone={handleDone}
      />
    </AudioContext.Provider>
  );
};

export default SourcePresenter;
