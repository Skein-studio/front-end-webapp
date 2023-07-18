/*
    Merge should have 
        1. 1 target handle and a way to add additional target handles
        2. 1 source handle
            

*/
import React, { useState, useEffect, useRef, ReactNode } from "react";
import MergeView from "./MergeView";

const MergePresenter: React.FC = () => {

  const [numberOfTargetHandles, setNumberOfTargetHandles] = useState<number>(1);
  const [numberOfSourceHandles, setNumberOfSourceHandles] = useState<number>(1);

  const addTargetHandle = () => {
    setNumberOfTargetHandles(numberOfTargetHandles + 1);
  }; 

    return (
        <div>
            <MergeView 
                numberOfSourceHandles={numberOfSourceHandles}
                numberOfTargetHandles={numberOfTargetHandles}
                addTargetHandle={addTargetHandle}
            />
        </div>
    )
}

export default MergePresenter;