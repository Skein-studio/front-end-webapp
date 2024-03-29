//UnspecifiedView.tsx

import { BlankSpace, Button, Container } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeTitle } from "@/app/Node/NodeStyles";
import { NodeContext, NodeType } from "../NodeState";
import { useContext } from "react";
import { useUI } from "../GraphFunctions";

interface Props {
  setNode: (type: NodeType) => void;
}

/**
 * The view for the Unspecified node, where you can choose what type of node you want to create.
 * @returns A NodeSmall component.
 * */
function UnspecifiedView(props: Props) {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;

  function setNode(type: NodeType) {
    props.setNode(type);
  }
  const ui = useUI();

  function selectNode() {
    ui.selectNode(node);
  }

  return (
    <Container>
      <NodeSmall
        widthextension={0}
        selected={node.selected ?? false}
        onClick={selectNode}
      >
        <NodeTitle>New Node</NodeTitle>
        <BlankSpace width={1} height={10}></BlankSpace>
        <Container flexdir="row">
          <Button
            onClick={() => {
              setNode(NodeType.Source);
            }}
          >
            Source
          </Button>
          {/*<Button
            onClick={() => {
              setNode(NodeType.Signal);
            }} >
            Signal
          </Button>
          We do not need Signal node when we create a new node from the menu.
          */}

          <Button
            onClick={() => {
              setNode(NodeType.Merge);
            }}
          >
            Merge
          </Button>
          <Button
            onClick={() => {
              setNode(NodeType.Split);
            }}
          >
            Split
          </Button>
        </Container>
      </NodeSmall>
    </Container>
  );
}

export default UnspecifiedView;
