//UnspecifiedView.tsx

import { BlankSpace, Button, Container } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { NodeType } from "../NodeState";
import { Handle, Position } from "reactflow";

interface Props {
  setNode: (type: NodeType) => void;
}

function UnspecifiedView(props: Props) {
  function setNode(type: NodeType) {
    props.setNode(type);
  }

  return (
    <Container>
      <NodeSmall widthextension={0}>
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
          <Button
            onClick={() => {
              setNode(NodeType.Signal);
            }}
          >
            Signal
          </Button>
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
