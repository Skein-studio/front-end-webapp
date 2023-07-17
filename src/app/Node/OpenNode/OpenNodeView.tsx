import { NodeState } from "../NodeState";
import { styled } from "styled-components";
import { purple, NodeTitle, NodeIcon } from "@/app/Util/Flow/NodeStyles";
import { NodeTypeToString, NodeType } from "../NodeState";
import { BaseComponent } from "../Source/SourceView";
import { BlankSpace } from "@/app/Util/BaseStyles";
import SourceImg from "../Source/source.svg";
import SplitImg from "../Split/split.svg";
import MergeImg from "../Merge/merge.svg";
import SignalImg from "../Signal/signal.svg";

interface Props {
  nodeState: NodeState;
  deselectWindow: () => void;
}
export default function OpenNodeView(props: Props) {
  const Contents = () => {
    switch (props.nodeState.type) {
      case NodeType.Source:
        return <BaseComponent base={props.nodeState.data.base} />;
      case NodeType.Signal:
        return <div>Signal Contents</div>;
      default:
        return <div>NodeType Error</div>;
    }
  };

  const Icon = () => {
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
  };

  return (
    <Window>
      <BlankSpace width={1} height={75}></BlankSpace>
      {Icon()}
      <CloseButton onClick={props.deselectWindow}>X</CloseButton>
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
  right: 10px;
  top: 10px;
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
