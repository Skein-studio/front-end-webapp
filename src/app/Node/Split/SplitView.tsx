import React from 'react';
import {  RowContainer, ProgressBar, ProgressBarContainer, ProgressBarWrapper, ProgressBarText, PlayButton, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall } from "@/app/Util/NodeStyles";
import GenerateHandles from '@/app/Util/HandleHandler';

interface SplitViewProps{
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
}

const SplitView: React.FC<SplitViewProps> = ({ numberOfSourceHandles, numberOfTargetHandles }) => {

  return (
    <NodeSmall>
      <GenerateHandles splitNode= {true} handleType="target" numberOfHandles={numberOfTargetHandles} />
      <RowContainer>

        <span>{"-< split"}</span>

      </RowContainer>

      <GenerateHandles splitNode = {true} handleType="source" numberOfHandles={numberOfSourceHandles}/>
    </NodeSmall>
  );
}

export default SplitView;