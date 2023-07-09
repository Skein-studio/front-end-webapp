import { Button, Container } from "@/app/Util/BaseStyles";
import { NodeSmall } from "@/app/Util/NodeStyles";
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
      <NodeSmall>
        New Node
        <Container>
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
