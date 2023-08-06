//MergePresenter.tsx

/*
    Merge should have 
        1. 1 target handle and a way to add additional target handles
        2. 1 source handle
            

*/
import React, {
  useState,
  useEffect,
  useRef,
  ReactNode,
  useContext,
} from "react";
import MergeView from "./MergeView";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

const MergePresenter: React.FC = () => {
  const node = useContext(NodeContext);
  const graph = useGraph();

  function reload() {
    graph?.reloadComponent();
  }

  useEffect(() => {}, [node]);

  const addTargetHandle = () => {
    if (!node) {
      return;
    }
    node.addTargetHandle();
    reload();
  };

  return (
    <MergeView
      numberOfSourceHandles={node?.outputs?.length || 0}
      numberOfTargetHandles={node?.inputs?.length || 0}
      addTargetHandle={addTargetHandle}
    />
  );
};

export default MergePresenter;
