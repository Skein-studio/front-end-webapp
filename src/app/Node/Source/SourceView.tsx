//SourceView.tsx

import { Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeSmall, NodeTitle, NodeIcon } from "@/app/Node/NodeStyles";
import { NodeContext } from "../NodeState";
import { useContext } from "react";
import { styled } from "styled-components";
import SourceImg from "./source.svg";
import { GenerateHandles } from "@/app/Util/Handles";
import { SourceTypeModel } from "@/app/Util/modelTransformation";

const PreviewText = styled.p`
  color: white;
  overflow: hidden;
  font-size: 8px;
  position: absolute;
  bottom: 0px;
`;

interface SmallViewProps {
  url: string;
}

function SmallView(props: SmallViewProps) {
  return (
    <>
      <PreviewText>{props.url}</PreviewText>
    </>
  );
}

type SourceProps = {
  selectNode: () => void;
};

function SourceView(props: SourceProps) {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const sourceData = node.model.Data as SourceTypeModel;

  return (
    <NodeSmall
      widthextension={0}
      selected={node.selected ?? false}
      onClick={props.selectNode}
    >
      <BlankSpace height={5} width={5}></BlankSpace>
      {<NodeIcon src={SourceImg} />}
      <NodeTitle>
        source
        {sourceData.base != "" && sourceData.base != undefined
          ? `[${sourceData.base}]`
          : ""}
      </NodeTitle>
      <Container style={{ flex: 1 }}>
        {sourceData.base ? <SmallView url={sourceData.URL} /> : <></>}
        {GenerateHandles(node)}
      </Container>
    </NodeSmall>
  );
}

export default SourceView;
