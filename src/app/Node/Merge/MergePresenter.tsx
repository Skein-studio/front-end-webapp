//MergePresenter.tsx

/*
    Merge should have 
        1. 1 target handle and a way to add additional target handles
        2. 1 source handle
            

*/
import React, { useState, useEffect, useContext } from "react";
import MergeView from "./MergeView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

const MergePresenter: React.FC = () => {
  const node = useContext(NodeContext);
  const graph = useGraph();
  const [reload, setReload] = useState<boolean>(false);

  useEffect(() => {}, [node]);

  const addTargetHandle = () => {
    if (!node) {
      return;
    }
    node.addTargetHandle();
    setReload(!reload);
  };

  return (
    <MergeView
      numberOfSourceHandles={node?.model.Outputs?.length || 0}
      numberOfTargetHandles={node?.model.Inputs?.length || 0}
      addTargetHandle={addTargetHandle}
    />
  );
};

export default MergePresenter;
