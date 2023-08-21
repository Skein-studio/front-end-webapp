// AudioPlayer.tsx
import { Container } from "../BaseStyles";
import styled from "styled-components";
import PlayImg from "./play.svg";
import PauseImg from "./pause.svg";
import { AudioState } from "./useAudio";

export type AudioPlayerProps = {
  audioState: AudioState;
  isComputing: boolean;
  audioComputed: boolean|undefined;
  error: string;
  smallplayer?: boolean;
};

export default function AudioPlayer(props: AudioPlayerProps) {

  return (
    <Container flexdir="row">
      <ProgressBarContainer smallplayer={props.smallplayer}>
        
        {props.error != "" ? (
          <ProgressBarText>{props.error}</ProgressBarText>
        ) : !props.audioComputed && !props.isComputing ? (
          <ProgressBarText>compute for 3 tokens</ProgressBarText>
        ) : props.isComputing ? (
          <ProgressBarText>"computing..."</ProgressBarText>
        ) : (
          <></>
        )}
        {
          props.audioState.playing ? (
            <PlayButton img={PauseImg} callback={props.audioState.onPlayPause} />
          ) : (
            <PlayButton img={PlayImg} callback={props.audioState.onPlayPause} />
          )
        }
        
        <ProgressBar progress={props.audioState.progress} />
      </ProgressBarContainer>
    </Container>
  );
}

interface PlayButtonProps {
  img: string;
  callback: () => void;
}

const PlayButton: React.FC<PlayButtonProps> = ({ img, callback }) => {
  return (
    <StyledPlayButton onClick={callback}>
      <img src={img} />
    </StyledPlayButton>
  );
};

const StyledPlayButton = styled.button`
  height: 32px;
  width: 32px;
  border: none;
  border-radius: 16px;
  display: flex;
  position: absolute;
  right: 10px;
  align-items: center;
  justify-content: center;
  background-color: lightgrey;
`;
interface ProgressBarContainerProps {
  smallplayer?: boolean;
}

const ProgressBarContainer = styled(
  ({
    smallplayer,
    ...rest
  }: ProgressBarContainerProps & React.HTMLProps<HTMLDivElement>) => (
    <div {...rest} />
  )
)`
  position: relative;
  display: flex;
  align-items: center;
  width: 72.5%;
  left: ${(props) => (props.smallplayer ? "60px" : "0px")};
  height: 50px;
  border: 2px solid lightgrey;
  border-radius: 10px;
`;

const ProgressBar = styled.div.attrs<ProgressBarProps>((props) => ({
  style: {
    width: `${props.progress}%`,
  },
}))`
  height: 100%;
  background-color: lightgrey;
  border-radius: 8px;
`;

interface ProgressBarProps {
  progress: number;
}

const ProgressBarText = styled.div`
  margin-left: 10px;
  font-size: 12px;
  font-family: verdana;
  color: crimson;
`;
