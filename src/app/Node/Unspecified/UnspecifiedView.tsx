import { Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";
import { TopBar, ToggleButton, NodeText } from "@/app/Util/NodeStyles";

const UnspecifiedView: React.FC = () => {
  return (
    <Container>
      Select a node!
    </Container>
  );
};

export default UnspecifiedView;
