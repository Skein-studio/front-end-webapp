//SourceView.tsx

import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeTitle, NodeIcon } from "@/app/Util/Flow/NodeStyles";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import { useContext, useEffect } from "react";
import { styled } from "styled-components";
import SourceImg from "./source.svg";
import { GenerateHandles } from "@/app/Util/Handles";
import { SourceType } from "@/app/Util/modelTransformation";

const PreviewText = styled.p`
  color: white;
  overflow: hidden;
  font-size: 8px;
  position: absolute;
  bottom: 0px;
`;

const SmallView = () => {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  return (
    <>
      <PreviewText>{(node?.model.Data as SourceType).URL}</PreviewText>
      {/*audioData && <audio src={audioData} controls /> this is removed since we currently decided not to have a play button in the source file*/}
    </>
  );
};

type SourceProps = {
  base: string;
};

const SourceView: React.FC<SourceProps> = ({ base }) => {
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  function selectNode() {
    graph.selectNode(node);
  }

  return (
    //can extend width by multiplying a value times the number of outputs - 10 or something in that manner
    <NodeSmall
      widthextension={0}
      selected={node?.selected ?? false}
      onClick={selectNode}
    >
      <BlankSpace height={5} width={5}></BlankSpace>
      {<NodeIcon src={SourceImg} />}
      <NodeTitle>
        source{base != "" && base != undefined ? `[${base}]` : ""}
      </NodeTitle>
      <Container style={{ flex: 1 }}>
        {base ? <SmallView /> : <></>}
        {GenerateHandles(node)}
      </Container>
    </NodeSmall>
  );
};

export default SourceView;
