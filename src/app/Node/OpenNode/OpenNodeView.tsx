import { NodeState } from "../NodeState";
import { styled } from "styled-components";
import { purple, NodeTitle, NodeIcon } from "@/app/Node/NodeStyles";
import { NodeTypeToString, NodeType } from "../NodeState";
import OpenSourcePresenter from "../Source/OpenSourcePresenter";
import { BlankSpace } from "@/app/Util/BaseStyles";
import SourceImg from "../Source/source.svg";
import SplitImg from "../Split/split.svg";
import MergeImg from "../Merge/merge.svg";
import SignalImg from "../Signal/signal.svg";
import OpenSignalPresenter from "../Signal/OpenSignalPresenter";

interface Props {
  nodeState: NodeState;
  closeWindow: () => void;
}
/**
 * The view for the opened node.
 * @returns An opened node component, based on the type of the node.
 * */
export default function OpenNodeView(props: Props) {
  function Contents() {
    switch (props.nodeState.type) {
      case NodeType.Source:
        return <OpenSourcePresenter />;
      case NodeType.Signal:
        return <OpenSignalPresenter />;
      case NodeType.Merge:
        return <div>Merge</div>;
      case NodeType.Split:
        return <div>Split</div>;
      default:
        return <div>You must set the type of the node before editing it.</div>;
    }
  }

  function Icon() {
    switch (props.nodeState.type) {
      case NodeType.Source:
        return <NodeIcon src={SourceImg} />;
      case NodeType.Signal:
        return <NodeIcon src={SignalImg} />;
      case NodeType.Merge:
        return <NodeIcon src={MergeImg} />;
      case NodeType.Split:
        return <NodeIcon src={SplitImg} />;
      default:
        return null;
    }
  }

  return (
    <Window>
      <BlankSpace width={1} height={75}></BlankSpace>
      {Icon()}
      <CloseButton onClick={props.closeWindow}>-</CloseButton>
      <NodeTitle>{NodeTypeToString(props.nodeState.type)}</NodeTitle>
      <InnerBox>{Contents()}</InnerBox>
    </Window>
  );
}

interface NodeProps {
  flexdir?: string;
}

const CloseButton = styled.button<NodeProps>`
  position: absolute;
  font-size: 16px;
  right: 10px;
  top: 10px;
  border-radius: 4px;
  border: none;

  &:hover {
    background-color: #b3b3b3; // Change as needed
  }

  &:active {
    background-color: #808080; // Change as needed
  }
`;

const InnerBox = styled.div<NodeProps>`
  display: flex;
  font-family: verdana;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 95%;
  height: 80%;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 10px;
`;

const Window = styled.div<NodeProps>`
  display: flex;
  position: absolute;
  top: 100px;
  font-family: verdana;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 90%; // Default to mobile view
  height: fit-content;
  margin: 2px 0; // Apply margin only on top and bottom
  padding: 4px;
  background-color: #404040;
  border-radius: 10px;
  box-shadow: 0px 0px 0px ${purple};
  transition: box-shadow 0.3s ease;
  z-index: 2;

  @media (min-width: 768px) {
    // When screen is larger than 768px
    width: 50%;
  }

  &:hover {
    box-shadow: 0px 2px 8px rgba(100, 0, 255, 0.625);
  }
`;
