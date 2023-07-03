import React, { useState } from "react";
import SourceView from "./SourceView";

const SourcePresenter: React.FC = () => {
  const [showLargeView, setShowLargeView] = useState<boolean>(false);
  const [base, setBase] = useState<string>("");

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
    <SourceView
      showLargeView={showLargeView}
      handleToggleView={handleToggleView}
      base={base}
      handleBaseChange={handleBaseChange}
      handleDone={handleDone}
    />
  );
};

export default SourcePresenter;
