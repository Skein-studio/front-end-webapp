import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  NodeBox,
  TopBar,
  StyledSelect,
  ToggleButton,
  NodeLarge,
  NodeSmall,
  NodeText,
} from "../Util/NodeStyles";
import { Button, Container, BlankSpace } from "../Util/BaseStyles";

const Source: React.FC = () => {
  const [showLargeView, setShowLargeView] = useState<boolean>(false);
  const [base, setBase] = useState<string>("");

  const handleBaseChange = (text:String) => {
    setBase(text);
  };

  const handleDone = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLargeView(false);
  };

  const handleToggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLargeView(!showLargeView);
  };

  const CurrentNode = showLargeView ? NodeLarge : NodeSmall;

  return (
    <CurrentNode>
      <TopBar>
        <NodeText>Source{base != "" ? `: ${base}` : ""}</NodeText>
      </TopBar>
      {base && (
        <ToggleButton onClick={handleToggleView}>
          {showLargeView ? "-" : "+"}
        </ToggleButton>
      )}
      {/*<Handle type="source"  position={Position.Left} /> Source has no input */}
      <BlankSpace width={1} height={100}></BlankSpace>
      {base ? (
        <Container>
          {showLargeView ? (
            <Container>
              <p>Spectrogram here</p>
              {/*
                Style:
                <StyledSelect value={style} onChange={handleStyleChange}>
                <option value="">Select...</option>
                <option value="guitar">Guitar Solo</option>
                <option value="flute">Fantasy Flute</option>
                </StyledSelect>
                
           This will be present in the signal node instead */}

              {base}
              <Button onClick={handleDone}>
                <NodeText>✅</NodeText>
              </Button>
            </Container>
          ) : (
            <>
              <NodeText>Spectrogram here</NodeText>
              <Button>
                <NodeText>Play</NodeText>
              </Button>
            </>
          )}
        </Container>
      ) : (
        <Container>
            <Button onClick={() => handleBaseChange("Record")}>Record</Button>
            <Button onClick={() => handleBaseChange("Import")}>Import</Button>
            <Button onClick={() => handleBaseChange("Generate")}>Generate</Button>
        </Container>
      )}
      <Handle type="target" position={Position.Right} />
    </CurrentNode>
  );
};

export default Source;
