import React, { useContext } from "react";
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import {
  NodeSmall,
  RowContainer,
  ProgressBar,
  ProgressBarContainer,
  ProgressBarText,
  PlayButton,
  NodeIcon,
  NodeTitle,
} from "@/app/Util/Flow/NodeStyles";
import GenerateHandles from "@/app/Util/HandleHandler";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";

import SplitImg from "./split.svg";

const SmallView = () => {
  return <Container></Container>;
};

interface SplitViewProps {
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
}

const SplitView: React.FC<SplitViewProps> = ({
  numberOfSourceHandles,
  numberOfTargetHandles,
}) => {
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  function selectNode() {
    graph.selectNode(node);
  }

  return (
    <NodeSmall
      widthextension={0}
      selected={node?.selected ?? false}
      onClick={selectNode}
    >
      <GenerateHandles
        splitNode={false}
        handleType="target"
        numberOfHandles={numberOfTargetHandles}
      />

      <NodeIcon src={SplitImg}></NodeIcon>
      <NodeTitle>split</NodeTitle>

      <SmallView />

      <GenerateHandles
        splitNode={true}
        handleType="source"
        numberOfHandles={numberOfSourceHandles}
      />
    </NodeSmall>
  );
};

export default SplitView;
