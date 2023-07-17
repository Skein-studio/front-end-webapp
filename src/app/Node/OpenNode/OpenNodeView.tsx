import { NodeState } from "../NodeState";
import { styled } from "styled-components";
import { purple, NodeTitle, NodeIcon } from "@/app/Util/Flow/NodeStyles";
import { NodeTypeToString, NodeType } from "../NodeState";
import { BaseComponent } from "../Source/SourceView";
import { BlankSpace } from "@/app/Util/BaseStyles";
import SourceImg from '../Source/source.svg';
import SplitImg from '../Split/split.svg';
import MergeImg from '../Merge/merge.svg';
import SignalImg from '../Signal/signal.svg';

interface Props{
    nodeState:NodeState,
    closeWindow:()=>void
}

export default function OpenNodeView(props:Props){

    function Contents(){
        switch(props.nodeState.type){
            case(NodeType.Source):
                return <BaseComponent base={props.nodeState.data.base}></BaseComponent>
            case(NodeType.Signal):
                return <div>Signal Contents</div> //Add the contents of what should be shown in the inner (white) box for a Signal Node, etc.
            default:
                return <div>NodeType Error</div>
        }
    }
    function Icon():string{
      switch(props.nodeState.type){
          case(NodeType.Source):
              return SourceImg;
          case(NodeType.Signal):
              return SignalImg;
          case(NodeType.Merge):
              return MergeImg;
          case NodeType.Split:
              return SplitImg;
          default:
              return ""
      }
  }

    return (
    <Window>
        <BlankSpace width={1} height={75}></BlankSpace>
        <NodeIcon src={Icon()}></NodeIcon>
        <CloseButton onClick={props.closeWindow}>X</CloseButton>
        <NodeTitle>{NodeTypeToString(props.nodeState.type)}</NodeTitle>
        <InnerBox>
            <Contents/>
        </InnerBox>
    </Window>
    )

}

interface NodeProps {
    flexdir?: string;
  }

  const CloseButton = styled.button<NodeProps>`
  position: absolute;
  right: 10px;
  top: 10px;
`;

  const InnerBox = styled.div<NodeProps>`
    display: flex;
    font-family:verdana;
    flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 95%;
    height: 80%;
    padding: 4px;
    background-color: #FFFFFF;
    border-radius: 10px;
  `;
  
  const Window = styled.div<NodeProps>`
  display: flex;
  position: absolute;
  top: 80px;
  font-family: verdana;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 90%; // Default to mobile view
  height: 75px;
  margin: 2px 0; // Apply margin only on top and bottom
  padding: 4px;
  background-color: #404040;
  border-radius: 10px;
  box-shadow: 0px 0px 0px ${purple};
  transition: box-shadow 0.3s ease;
  z-index: 1;

  @media (min-width: 768px) { // When screen is larger than 768px
    width: 50%;
  }

  &:hover {
    box-shadow: 0px 2px 8px rgba(100, 0, 255, 0.625);
  }
`;
