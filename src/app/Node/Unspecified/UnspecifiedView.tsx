import { Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";
import { TopBar, ToggleButton, NodeText } from "@/app/Util/NodeStyles";
import { NodeType } from "../NodeModel";

interface Props{
  setNode:(type:NodeType)=>void;
}

function UnspecifiedView(props:Props){

  function setNode(type:NodeType){
    props.setNode(type);
  }

  return (
    <Container>
      <NodeSmall>
        New Node
        <Container>
          <Button onClick={()=>{setNode(NodeType.Source)}}>Source</Button>
          <Button onClick={()=>{setNode(NodeType.Signal)}}>Signal</Button>
          <Button onClick={()=>{setNode(NodeType.Merge)}}>Merge</Button>
          <Button onClick={()=>{setNode(NodeType.Split)}}>Split</Button>
        </Container>
      </NodeSmall>
    </Container>
  );
}

export default UnspecifiedView;
