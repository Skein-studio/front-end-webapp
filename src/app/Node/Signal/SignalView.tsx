import React, { useContext } from 'react';
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeIcon, NodeSmall, RowContainer, ProgressBar, ProgressBarContainer, ProgressBarText, NodeTitle} from "@/app/Util/Flow/NodeStyles";
import GenerateHandles from '@/app/Util/HandleHandler';
import { NodeContext } from '../NodeState';
import { useGraph } from '../GraphContext';
import SignalImg from "./signal.svg";
import PauseImg from "./pause.svg";
import PlayImg from "./play.svg";
import { styled } from 'styled-components';
import { Handle, Position } from 'reactflow';

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
    const progress = duration != 0 ? (currentTime / duration) * 100 : 0;

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
      {/*<GenerateHandles handleType="target" numberOfHandles={numberOfTargetHandles}/> away for now*/}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
      <NodeIcon src={SignalImg}></NodeIcon>
      <NodeTitle>signal</NodeTitle>
      <Container flexdir='row'>
        
        <ProgressBarContainer> 
          
            {!audioComputed && !isComputing&& <ProgressBarText>compute for 3 tokens</ProgressBarText>}
            <ProgressBar progress={progress}/>
            <ButtonContainer>
              {isComputing ? 
                  "computing..." 
                  :
                  playing ? <PlayButton img={PauseImg} callback={onPlayPause}/> : <PlayButton img={PlayImg} callback={onPlayPause}/>
              }
            </ButtonContainer>
        </ProgressBarContainer>
      </Container>

      {/*<GenerateHandles handleType="source" numberOfHandles={numberOfSourceHandles}/> away for now */}
    </NodeSmall>
  );
}

export default SignalView;

const ButtonContainer = styled.div`
right:10px;
position:absolute;
`

interface PlayButtonProps {
  img: string;
  callback: () => void;
}

export const PlayButton: React.FC<PlayButtonProps> = ({ img, callback }) => {
  return (
    <StyledPlayButton onClick={callback}>
      <img src={img} />
    </StyledPlayButton>
  );
};

const StyledPlayButton = styled.button`
  height: 32px;
  width: 32px;
  border:none;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
`;
