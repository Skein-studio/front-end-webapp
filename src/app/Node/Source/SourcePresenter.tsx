import React, { useState, useContext, useEffect } from "react";
import SourceView from "./SourceView";
import { NodeContext } from "../NodeState";

const SourcePresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const [base, setBase] = useState<string>(loadBase);

  function loadAudio() {
    if (node) {
      return node.data.audio;
    }
    return null;
  }
  function loadBase() {
    //type of source (Record, Import, Generate) is set in nodeState.data.base
    if (node) {
      return node.data.base;
    }
    return "";
  }

  //useEffect to load audioData etc from backend upon component load?

  return <SourceView base={base} />;
};

export default SourcePresenter;
