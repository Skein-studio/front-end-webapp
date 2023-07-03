import React, { useState } from "react";
import { SourceView } from "./SourceView";

const SourcePresenter: React.FC = () => {
  const [base, setBase] = useState<string>("");
  const [showLargeView, setShowLargeView] = useState<boolean>(false);

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

  return <SourceView base={base} 
                      showLargeView={showLargeView} 
                      handleBaseChange={handleBaseChange} 
                      handleDone={handleDone} 
                      handleToggleView={handleToggleView} />;
};

export default SourcePresenter;
