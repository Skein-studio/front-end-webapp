import { NodeState } from "../NodeState";
import { styled } from "styled-components";
import { purple, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { NodeTypeToString, NodeType } from "../NodeState";
import { BaseComponent } from "../Source/SourceView";
import { BlankSpace } from "@/app/Util/BaseStyles";

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

    return (
    <Window>
        <BlankSpace width={1} height={75}></BlankSpace>
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
    font-family:verdana;
    flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
    justify-content: center;
    align-items: center;
    align-self: center;
    width: 80%;
    height: 75px;
    margin: 2px 0; // Apply margin only on top and bottom
    padding: 4px;
    background-color: #404040;
    border-radius: 10px;
    box-shadow: 0px 0px 0px ${purple};
    transition: box-shadow 0.3s ease;
    z-index: 1;
    &:hover {
      box-shadow: 0px 2px 8px rgba(100, 0, 255, 0.625);
    }
  `;
  
  