import { NodeContext, NodeState } from "../NodeState";
import OpenNodeView from "./OpenNodeView";

interface Props {
  state: NodeState; // the state of the currently selected (open) node
  closeWindow: () => void;
}

export default function OpenNodePresenter(props: Props) {
  return (
    <NodeContext.Provider value={props.state}>
      <OpenNodeView
        nodeState={props.state}
        closeWindow={props.closeWindow}
      />
    </NodeContext.Provider>
  );
}