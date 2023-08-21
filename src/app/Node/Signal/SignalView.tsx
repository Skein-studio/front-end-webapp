//SignalView.tsx

import React, { useContext } from "react";
import { Container } from "@/app/Util/BaseStyles";
import { NodeIcon, NodeSmall, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";
import SignalImg from "./signal.svg";
import AudioPlayer from "@/app/Util/AudioPlayback/AudioPlayer";
import { GenerateHandles, GetWidthExtension } from "@/app/Util/Handles";
interface Props {
  audioState: any;
}
function SignalView(props: Props) {
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  function selectNode() {
    graph.selectNode(node);
  }

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
          audioState={props.audioState}
          isComputing={false}
          audioComputed={true}
          error=""
          smallplayer={true}
        />
      </Container>
      {/*<GenerateHandles handleType="source" numberOfHandles={numberOfSourceHandles}/> away for now */}
    </NodeSmall>
  );
}

export default SignalView;
