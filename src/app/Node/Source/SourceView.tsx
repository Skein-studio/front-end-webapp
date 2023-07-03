import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import { TopBar, ToggleButton, NodeText } from "@/app/Util/NodeStyles";
import { Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";;
const spectrogramPlaceHolder = 'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png';

const TopBarView = ({ base }) => (
  <TopBar>
    <NodeText>Source{base != "" ? `: ${base}` : ""}</NodeText>
  </TopBar>
);

const ToggleButtonView = ({ showLargeView, handleToggleView }) => (
  <ToggleButton onClick={handleToggleView}>{showLargeView ? "-" : "+"}</ToggleButton>
);

const BaseOptionsView = ({ handleBaseChange }) => (
  <Container>
    <Button onClick={() => handleBaseChange("Record")}>Record</Button>
    <Button onClick={() => handleBaseChange("Import")}>Import</Button>
    <Button onClick={() => handleBaseChange("Generate")}>Generate</Button>
  </Container>
);

const BaseComponent = ({ base }) => {
  switch (base) {
    case "Record":
      return <Container>record</Container>;
    case "Import":
      return <Container>import</Container>;
    case "Generate":
      return <Container>generate</Container>;
    default:
      return null; // or some default jsx
  }
};

const LargeView = ({ base, handleDone }) => (
  <Container>
    <img src={spectrogramPlaceHolder} alt="Spectrogram placeholder" width={400} height={150} />
    <BaseComponent base={base} />
    <Button onClick={handleDone}>
      <NodeText>✔️</NodeText>
    </Button>
  </Container>
);

const SmallView = () => (
  <Container>
    <img src={spectrogramPlaceHolder} alt="Spectrogram placeholder" width={400} height={150} />
    <Button>
      <NodeText>▶️</NodeText>
    </Button>
  </Container>
);

const NodeContainer = ({ children }) => {
  return (
    <>
      <BlankSpace width={1} height={75} />
      {children}
      <Handle type="target" position={Position.Bottom} />
    </>
  );
};
const SourceView: React.FC<SourceProps> = ({
  handleBaseChange,
  handleDone,
  handleToggleView,
  base,
  showLargeView,
}) => {
  const CurrentNode = showLargeView ? NodeLarge : NodeSmall;

  return (
    <CurrentNode>
      <TopBarView base={base} />
      {base && <ToggleButtonView showLargeView={showLargeView} handleToggleView={handleToggleView} />}
      <NodeContainer>
        {base ? (
          showLargeView ? (
            <LargeView base={base} handleDone={handleDone} />
          ) : (
            <SmallView />
          )
        ) : (
          <BaseOptionsView handleBaseChange={handleBaseChange} />
        )}
      </NodeContainer>
    </CurrentNode>
  );
};

export { SourceView };
