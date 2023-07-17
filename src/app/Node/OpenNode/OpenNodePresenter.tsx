import { NodeContext, NodeState } from "../NodeState";
import OpenNodeView from "./OpenNodeView";

interface Props {
  state: NodeState; // the state of the currently selected (open) node
  deselectWindow: () => void;
}

export default function OpenNodePresenter(props: Props) {
  return (
    <NodeContext.Provider value={props.state}>
      <OpenNodeView
        nodeState={props.state}
        deselectWindow={props.deselectWindow}
      />
    </NodeContext.Provider>
  );
}
