import React from 'react';
import {  RowContainer, ProgressBar, ProgressBarContainer, ProgressBarWrapper, ProgressBarText, PlayButton, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall } from "@/app/Util/NodeStyles";
import GenerateHandles from '@/app/Util/HandleHandler';

interface SplitViewProps{
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
  currentTime: number;
  duration: number;
  audioComputed: boolean;
  onPlayPause: () => void;
  playing: boolean;
  isComputing: boolean;
}

const SplitView: React.FC<SplitViewProps> = ({ onPlayPause, playing, currentTime, duration, numberOfSourceHandles, numberOfTargetHandles, audioComputed, isComputing}) => {
    const progress = (currentTime / duration) * 100;


  return (
    <NodeSmall>
      <GenerateHandles type="target" numberOfHandles={numberOfTargetHandles}/>
      <RowContainer>

        <span>~ signal</span>

        <ProgressBarContainer audioComputed={audioComputed}> 
          <ProgressBarWrapper>
            {!audioComputed && <ProgressBarText>compute for 3 tokens</ProgressBarText>}
            <ProgressBar progress={progress}/>
          </ProgressBarWrapper>

          {isComputing? "computing...":
          <PlayButton onClick={onPlayPause}> 
            {playing? "pause" : "play"}  
          </PlayButton>
          }
        </ProgressBarContainer>
      </RowContainer>

      <GenerateHandles type="source" numberOfHandles={numberOfSourceHandles}/>
    </NodeSmall>
  );
}

export default SplitView;