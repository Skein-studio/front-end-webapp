import React, { useContext } from 'react';
import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeIcon, NodeTitle,  } from "@/app/Util/Flow/NodeStyles";
import GenerateHandles from '@/app/Util/HandleHandler';
import { useGraph } from '../GraphContext';
import { NodeContext } from '../NodeState';

import MergeImg from "./merge.svg";


interface SplitViewProps{
  numberOfSourceHandles: number;
  numberOfTargetHandles: number;
  addTargetHandle: () => void;
}

const MergeView: React.FC<SplitViewProps> = ({ numberOfSourceHandles, numberOfTargetHandles, addTargetHandle }) => {

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
      <GenerateHandles 
        splitNode = {false} 
        handleType ="target" 
        numberOfHandles = {numberOfTargetHandles} 
      />
        
      <NodeIcon src={MergeImg}></NodeIcon>
      <NodeTitle>merge</NodeTitle>

        <Container>
            <button onClick={addTargetHandle}>+</button>
        </Container>

      <GenerateHandles 
        splitNode = {false} 
        handleType = "source" 
        numberOfHandles = {numberOfSourceHandles}
      />
    </NodeSmall>
  );
}


export default MergeView;