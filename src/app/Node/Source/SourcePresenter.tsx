import React, { useState } from "react";
import {NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";;
import {NodeContainer, SmallView, LargeView, BaseOptionsView, ToggleButtonView, TopBarView} from "./SourceView";

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

  const CurrentNode = showLargeView ? NodeLarge : NodeSmall;

  return (
    <CurrentNode>
      <TopBarView base={base} />
      {base && <ToggleButtonView showLargeView={showLargeView} handleClick={handleToggleView} />}
      <NodeContainer>
        {base ? (
          showLargeView ? (
            <LargeView base={base} handleDone={handleDone} />
          ) : (
            <SmallView />
          )
        ) : (
          <BaseOptionsView handleBaseChange={handleBaseChange} />
        )}
      </NodeContainer>
    </CurrentNode>
  );
};

export default SourcePresenter;
