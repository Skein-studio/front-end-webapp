//SplitPresenter.tsx
/*
    Split should have:
        1. 1 target handle
        2. 6 source handles
            - drums, bass, piano, vocals, guitar, voice, other

*/
import React, { useState, useEffect, useContext } from "react";
import SplitView from "./SplitView";
import { NodeContext } from "../NodeState";

const SplitPresenter: React.FC = () => {
  const [reloadComponent , setReloadComponent] = useState(false); // Used to force component to reload
  const node = useContext(NodeContext);

  function reload() {
    setReloadComponent(!reloadComponent);
  }
  
  useEffect(() => {
  }, [node]);

  return (
      <SplitView
        numberOfSourceHandles={node?.outputs?.length || 0}
        numberOfTargetHandles={node?.inputs?.length || 0}
      />
  );
};

export default SplitPresenter;
