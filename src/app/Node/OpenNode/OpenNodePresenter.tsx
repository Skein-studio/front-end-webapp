//OpenNodePresenter.tsx
import { useState } from "react";
import { NodeContext, NodeState } from "../NodeState";
import OpenNodeView from "./OpenNodeView";

interface Props {
  state: NodeState; // the state of the currently selected (open) node
  closeWindow: () => void;
}

export default function OpenNodePresenter(props: Props) {
  const [reload, setReload] = useState<boolean>(false);

  function forceReload() {
    setReload(!reload);
  }
  

  return (
    <NodeContext.Provider value={{ nodeState: props.state, forceReload }}>
    <OpenNodeView nodeState={props.state} closeWindow={props.closeWindow} />
  </NodeContext.Provider>
  );
}
