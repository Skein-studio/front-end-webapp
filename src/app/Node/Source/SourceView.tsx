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
import { useContext } from "react";
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
  switch (base) {
    case "record":
      return <RecordPresenter />;
    case "import":
      return <ImportAudio />;
    case "generate":
      return <GenerateAudio />;
    default:
      return <div>Choose a base first!</div>;
  }
};

const SmallView = () => {
  const { audioData, setAudioData } = useAudio();

  return (
    <Container>
      {audioData && audioData.toString()}
      {/*audioData && <audio src={audioData} controls /> this is removed since we currently decided not to have a play button in the source file*/}
    </Container>
  );
};

type SourceProps = {
  base: string;
  handleBaseChange: (text: string) => void;
};

const SourceView: React.FC<SourceProps> = ({ base, handleBaseChange }) => {
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  function openNode() {
    // set the currently open node to this node
    graph.setOpenNode(node);
  }

  return (
    //can extend width by multiplying a value times the number of outputs - 10 or something in that manner
    <NodeSmall widthextension={0}>
      <BlankSpace height={5} width={5}></BlankSpace>
      {<NodeIcon src={SourceImg} />}
      <NodeTitle>source{base != "" ? `[${base}]` : ""}</NodeTitle>
      <SelectButton onClick={openNode}>select</SelectButton>
      <Container style={{ flex: 1 }}>
        {base ? (
          <SmallView />
        ) : (
          <BaseOptionsView handleBaseChange={handleBaseChange} />
        )}
        <Handle type="target" position={Position.Bottom} />
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
