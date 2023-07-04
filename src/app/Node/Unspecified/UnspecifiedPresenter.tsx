import React, { useState, useContext } from "react";
import { NodeContext } from "../NodeModel";
import { AudioContext } from "@/app/Util/AudioContext";
import UnspecifiedView from "./UnspecifiedView";

const UnspecifiedPresenter: React.FC = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeModel instance

  return (
    <UnspecifiedView/>
  );
};

export default UnspecifiedPresenter;
