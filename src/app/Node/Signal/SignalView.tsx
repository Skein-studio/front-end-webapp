import React, { useContext } from "react";
import { Container } from "@/app/Util/BaseStyles";
import { NodeIcon, NodeSmall, NodeTitle } from "@/app/Node/NodeStyles";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";
import SignalImg from "./signal.svg";
import SpinnerImg from "./Ellipsis-4.3s-800px.svg";
import AudioPlayer from "@/app/Util/AudioPlayback/AudioPlayer";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";
import { AudioState } from "@/app/Util/AudioPlayback/useAudio";

interface Props {
  audioState: AudioState;
  playAudio: () => void;
  fetched: boolean;
  fetching: boolean;
}

/**
 * The view for the Signal node.
 * @returns A NodeSmall component.
 * */
function SignalView(props: Props) {
  const graph = useGraph();
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;

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
      {GenerateHandles(node)}

      <NodeIcon src={SignalImg}></NodeIcon>
      <NodeTitle>signal</NodeTitle>
      {props.fetching ? (
        <LoadingIcon src={SpinnerImg} />
      ) : (
        <Container flexdir="row">
          <AudioPlayer
            audioState={modifiedAudioState}
            audioComputed={props.fetched}
            error=""
            smallplayer={true}
          />
        </Container>
      )}
    </NodeSmall>
  );
}

export default SignalView;

import styled from "styled-components";

const LoadingIcon = styled.img`
  width: 80px;
  height: 80px;
  position: absolute;
  right: 70px; // Adjust the position as needed
  top: -10px; // Adjust the position as needed
`;
