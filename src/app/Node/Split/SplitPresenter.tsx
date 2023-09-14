//SplitPresenter.tsx

import React, { useState, useEffect, useContext } from "react";
import SplitView from "./SplitView";
import { NodeContext } from "../NodeState";

function SplitPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeModel = node!.model;

  return (
    <SplitView
      numberOfSourceHandles={nodeModel.Outputs?.length || 0}
      numberOfTargetHandles={nodeModel.Inputs?.length || 0}
    />
  );
}

export default SplitPresenter;
