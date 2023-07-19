//SourceView.tsx

import { Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { NodeSmall, NodeTitle, NodeIcon } from "@/app/Util/Flow/NodeStyles";
import RecordPresenter from "@/app/Util/AudioRecorder/RecordPresenter";
import ImportAudio from "@/app/Util/AudioImporter/ImportAudio";
import GenerateAudio from "@/app/Util/AudioGenerator/GenerateAudio";
import { useAudio } from "@/app/Util/AudioContext";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import { useContext, useEffect, useState } from "react";
import { styled } from "styled-components";
import SourceImg from "./source.svg";

const BaseOptionsView = ({
  handleBaseChange,
}: {
  handleBaseChange: (text: string) => void;
}) => (
  <Container flexdir="row">
    <Button onClick={() => handleBaseChange("record")}>record</Button>
    <Button onClick={() => handleBaseChange("import")}>import</Button>
    <Button onClick={() => handleBaseChange("generate")}>generate</Button>
  </Container>
);

export const BaseComponent = ({ base }: { base: string }) => {
  const graph = useGraph();
  const node = useContext(NodeContext);

  const handleBaseChange = (text: string) => {
    if (node) {
      node.data.base = text;
      graph.reloadComponent();
    }
  };

  switch (base) {
    case "record":
      return <RecordPresenter />;
    case "import":
      return <ImportAudio />;
    case "generate":
      return <GenerateAudio />;
    default:
      return <BaseOptionsView handleBaseChange={handleBaseChange}/>;
  }
};

const PreviewText = styled.p`
color: white;
position: absolute;
bottom: -15px;
`


const SmallView = () => {
  const { audioData, setAudioData } = useAudio();

  return (
    <>
      <PreviewText>{audioData && audioData.toString()}</PreviewText>
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
      <NodeTitle>source{base != "" ? `[${base}]` : ""}</NodeTitle>
      <Container style={{ flex: 1 }}>
        {base ? (
          <SmallView />
        ) : (
          <></>
        )}
        <Handle type="source" position={Position.Bottom} />
      </Container>
    </NodeSmall>
  );
};

export default SourceView;

//temp
const SelectButton = styled.button`
  font-family: verdana;
  border-radius: 10px;
  position: absolute;
  right: 5px;
  top: 5px;
`;
