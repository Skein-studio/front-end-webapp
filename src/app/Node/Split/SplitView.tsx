import React, { useContext } from 'react';
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall, RowContainer, ProgressBar, ProgressBarContainer, ProgressBarWrapper, ProgressBarText, PlayButton,  } from "@/app/Util/Flow/NodeStyles";
import GenerateHandles from '@/app/Util/HandleHandler';
import { useGraph } from '../GraphContext';
import { NodeContext } from '../NodeState';

interface SplitViewProps{
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
}

const SplitView: React.FC<SplitViewProps> = ({ numberOfSourceHandles, numberOfTargetHandles }) => {

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
      <GenerateHandles splitNode= {true} handleType="target" numberOfHandles={numberOfTargetHandles} />
      <RowContainer>

        <span>{"-< split"}</span>

      </RowContainer>

      <GenerateHandles splitNode = {true} handleType="source" numberOfHandles={numberOfSourceHandles}/>
    </NodeSmall>
  );
}

export default SplitView;