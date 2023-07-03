import React, { useState } from "react";
import { Handle, Position } from "reactflow";
import {
  TopBar,
  ToggleButton,
  NodeLarge,
  NodeSmall,
  NodeText,
} from "../Util/NodeStyles";
import { Button, Container, BlankSpace } from "../Util/BaseStyles";
const spectrogramPlaceHolder = require("../Image/audio-spectrogram.jpg");
import Image from "next/image";

const Source: React.FC = () => {
  const [showLargeView, setShowLargeView] = useState<boolean>(false);
  const [base, setBase] = useState<string>("");

  const handleBaseChange = (text: string) => {
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
      <BlankSpace width={1} height={75}></BlankSpace>
      {base ? (
        <Container>
          {showLargeView ? (
            <Container>
              <Image
                src={spectrogramPlaceHolder}
                alt="Spectrogram placeholder"
              />{" "}
              {/* Use Image component here */}
              {base}
              <Button onClick={handleDone}>
                <NodeText>✔️</NodeText>
              </Button>
            </Container>
          ) : (
            <>
              <Image
                src={spectrogramPlaceHolder}
                alt="Spectrogram placeholder"
              />{" "}
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
      <Handle type="target" position={Position.Bottom} />
    </CurrentNode>
  );
};

export default Source;
