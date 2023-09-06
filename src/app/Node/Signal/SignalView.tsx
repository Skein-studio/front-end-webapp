import React, { useContext } from "react";
import { Container } from "@/app/Util/BaseStyles";
import { NodeIcon, NodeSmall, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";
import SignalImg from "./signal.svg";
import SpinnerImg from "./spinner.svg";
import AudioPlayer from "@/app/Util/AudioPlayback/AudioPlayer";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";
import { AudioState } from "@/app/Util/AudioPlayback/useAudio";

interface Props {
  audioState: AudioState;
  playAudio: () => void;
  fetched: boolean;
  fetching: boolean;
}

function SignalView(props: Props) {
  const graph = useGraph();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;

  function selectNode() {
    graph.selectNode(node);
  }

  const modifiedAudioState: AudioState = {
    ...props.audioState,
    onPlayPause: props.playAudio, // Use the playAudio function from props
  };

  return (
    <NodeSmall
      widthextension={GetWidthExtension(node)}
      selected={node.selected ?? false}
      onClick={selectNode}
    >
      {/*<GenerateHandles handleType="target" numberOfHandles={numberOfTargetHandles}/> away for now*/}
      {GenerateHandles(node)}

      <NodeIcon src={SignalImg}></NodeIcon>
      <NodeTitle>Signal</NodeTitle>
      {props.fetching && <LoadingIcon src={SpinnerImg} />}
      <Container flexdir="row">
        <AudioPlayer
          audioState={modifiedAudioState}
          isComputing={false}
          audioComputed={props.fetched} // Use the fetched prop
          error=""
          smallplayer={true}
        />
      </Container>
      {/*<GenerateHandles handleType="source" numberOfHandles={numberOfSourceHandles}/> away for now */}
    </NodeSmall>
  );
}

export default SignalView;

import styled from "styled-components";

const LoadingIcon = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 75px; // Adjust the position as needed
  top: 15px; // Adjust the position as needed
`;
