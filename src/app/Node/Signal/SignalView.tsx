//SignalView.tsx

import React, { useContext } from "react";
import { Container } from "@/app/Util/BaseStyles";
import { NodeIcon, NodeSmall, NodeTitle } from "@/app/Util/Flow/NodeStyles";
import GenerateHandles from "@/app/Util/HandleHandler";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";
import SignalImg from "./signal.svg";
import { styled } from "styled-components";
import { Handle, Position } from "reactflow";
import AudioPlayer from "@/app/Util/AudioPlayer/AudioPlayer";

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
      widthextension={0}
      selected={node?.selected ?? false}
      onClick={selectNode}
    >
      {/*<GenerateHandles handleType="target" numberOfHandles={numberOfTargetHandles}/> away for now*/}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />

      <NodeIcon src={SignalImg}></NodeIcon>
      <NodeTitle>signal</NodeTitle>
      <Container flexdir="row">
        <AudioPlayer audioState={props.audioState} smallplayer={true} />
      </Container>
      {/*<GenerateHandles handleType="source" numberOfHandles={numberOfSourceHandles}/> away for now */}
    </NodeSmall>
  );
}

export default SignalView;
