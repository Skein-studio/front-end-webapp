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
import { Button, Container } from "../Util/BaseStyles";

const Source: React.FC = () => {
  const [showLargeView, setShowLargeView] = useState<boolean>(false);
  const [base, setBase] = useState<string>("");

  const handleBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBase(event.target.value);
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
      {/*<Handle type="source" position={Position.Left} /> Source has no input */}
      {base ? (
        <>
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
        </>
      ) : (
        <StyledSelect value={base} onChange={handleBaseChange}>
          <option value="">Select...</option>
          <option value="record">Record</option>
          <option value="import">Import</option>
          <option value="generate">Generate</option>
        </StyledSelect>
      )}
      <Handle type="target" position={Position.Right} />
    </CurrentNode>
  );
};

export default Source;
