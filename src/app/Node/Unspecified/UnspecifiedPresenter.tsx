import React, { useState, useContext } from "react";
import { NodeContext } from "../NodeModel";
import { AudioContext } from "@/app/Util/AudioContext";
import UnspecifiedView from "./UnspecifiedView";
import { NodeType } from "../NodeModel";

const UnspecifiedPresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeModel instance
  
  function setNode(type:NodeType){
    node?.setType(type);
  }

  return (
    <UnspecifiedView/>
  );
};

export default UnspecifiedPresenter;
