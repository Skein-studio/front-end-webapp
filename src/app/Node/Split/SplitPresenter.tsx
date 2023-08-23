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

function SplitPresenter() {
  const node = useContext(NodeContext);
  const nodeModel = node!.model;
  useEffect(() => {}, [node]);

  return (
    <SplitView
      numberOfSourceHandles={nodeModel.Outputs?.length || 0}
      numberOfTargetHandles={nodeModel.Inputs?.length || 0}
    />
  );
}

export default SplitPresenter;
