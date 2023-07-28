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

const MergePresenter: React.FC = () => {
  const [reloadComponent, setReloadComponent] = useState(false); // Used to force component to reload
  const node = useContext(NodeContext);

  function reload() {
    setReloadComponent(!reloadComponent);
  }

  useEffect(() => {}, [node]);

  const addTargetHandle = () => {
    if (!node) {
      return;
    }
    if (!node.inputs) {
      node.inputs = [];
    }
    node.inputs = [...node.inputs, node.id+"in" + node.inputs.length];

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
