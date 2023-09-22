//OpenNodePresenter.tsx

import { NodeContext, NodeState } from "../NodeState";
import OpenNodeView from "./OpenNodeView";

interface Props {
  state: NodeState; // the state of the currently selected (open) node
  closeWindow: () => void;
}

/**
 * The presenter for an opened node. This is the node that is currently being edited, and the view is derived from the state of the node.
 * @returns An OpenNodeView component.
 * */
export default function OpenNodePresenter(props: Props) {
  return (
    <NodeContext.Provider value={{ nodeState: props.state }}>
      <OpenNodeView nodeState={props.state} closeWindow={props.closeWindow} />
    </NodeContext.Provider>
  );
}
