import React, { useContext } from 'react';
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall, RowContainer, ProgressBar, ProgressBarContainer, ProgressBarWrapper, ProgressBarText, PlayButton} from "@/app/Util/Flow/NodeStyles";
import GenerateHandles from '@/app/Util/HandleHandler';
import { NodeContext } from '../NodeState';
import { useGraph } from '../GraphContext';

interface SignalViewProps{
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
  currentTime: number;
  duration: number;
  audioComputed: boolean;
  onPlayPause: () => void;
  playing: boolean;
  isComputing: boolean;
}

const SignalView: React.FC<SignalViewProps> = ({ onPlayPause, playing, currentTime, duration, numberOfSourceHandles, numberOfTargetHandles, audioComputed, isComputing}) => {
    const progress = (currentTime / duration) * 100;

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
      <GenerateHandles handleType="target" numberOfHandles={numberOfTargetHandles}/>
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

      <GenerateHandles handleType="source" numberOfHandles={numberOfSourceHandles}/>
    </NodeSmall>
  );
}

export default SignalView;