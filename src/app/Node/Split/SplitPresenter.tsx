/*
    Split should have:
        1. 1 target handle
        2. 6 source handles
            - drums, bass, piano, vocals, guitar, voice, other

*/
import React, { useState, useEffect, useRef, ReactNode } from "react";
import SplitView from "./SplitView";
import { useGraph, addConnection } from "../GraphContext";

const SplitPresenter: React.FC = () => {

  const [numberOfTargetHandles, setNumberOfTargetHandles] = useState<number>(1);
  const [numberOfSourceHandles, setNumberOfSourceHandles] = useState<number>(6);

  const graph = useGraph()  

    return (
        <div>
            <SplitView 
                numberOfSourceHandles={numberOfSourceHandles}
                numberOfTargetHandles={numberOfTargetHandles}
            />
        </div>
    )
}

export default SplitPresenter;