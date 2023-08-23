//UnspecifiedView.tsx

import { BlankSpace, Button, Container } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { NodeContext, NodeType } from "../NodeState";
import { Handle, Position } from "reactflow";
import { useContext } from "react";

interface Props {
  setNode: (type: NodeType) => void;
}

function UnspecifiedView(props: Props) {
  function setNode(type: NodeType) {
    props.setNode(type);
  }
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;

  return (
    <Container>
      <NodeSmall widthextension={0} selected={node?.selected ?? false}>
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
