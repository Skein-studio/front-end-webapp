import React, { useContext } from "react";
import { Container } from "@/app/Util/BaseStyles";
import { NodeIcon, NodeSmall, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";
import SignalImg from "./signal.svg";
import AudioPlayer from "@/app/Util/AudioPlayback/AudioPlayer";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";
import { AudioState } from "@/app/Util/AudioPlayback/useAudio";

interface Props {
  audioState: AudioState;
  playAudio: () => void;
  fetched: boolean;
}

function SignalView(props: Props) {
  const graph = useGraph();
  const node = useContext(NodeContext);

  console.log(props.fetched)

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
      selected={node?.selected ?? false}
      onClick={selectNode}
    >
      {/*<GenerateHandles handleType="target" numberOfHandles={numberOfTargetHandles}/> away for now*/}
      {GenerateHandles(node)}

      <NodeIcon src={SignalImg}></NodeIcon>
      <NodeTitle>signal</NodeTitle>
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
