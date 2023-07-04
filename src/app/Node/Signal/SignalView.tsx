import React, { useEffect, useRef } from 'react';

import {  Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { TopBar, ToggleButton, NodeLarge, NodeSmall, NodeText } from "@/app/Util/NodeStyles";
const spectrogramPlaceHolder = 'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png';



interface SignalProps{
  spectrogram: HTMLImageElement | null;
  currentTime: number;
  duration: number;
}

const SignalView: React.FC<SignalProps> = ({ spectrogram, currentTime, duration }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // drawing spectrogram on canvas
    ctx.drawImage(spectrogram, 0, 0, canvas.width, canvas.height);

    // drawing progress bar
    const progress = (currentTime / duration) * canvas.width;

    ctx.fillStyle = 'red';
    ctx.fillRect(0, canvas.height - 50, progress, 50);
  }, [spectrogram, currentTime, duration]);

  return <canvas ref={canvasRef} width={500} height={300} />
}

const TopBarView = ({ base }: { base: string }) => (
    <TopBar>
      <NodeText>Source{base != "" ? `: ${base}` : ""}</NodeText>
    </TopBar>
);
  
const ToggleButtonView = ({ showLargeView, handleClick }: { showLargeView: boolean; handleClick: (e: React.MouseEvent) => void }) => (
  <ToggleButton onClick={handleClick}>{showLargeView ? "-" : "+"}</ToggleButton>
);

const BaseOptionsView = ({ handleBaseChange }: { handleBaseChange: (text: string) => void }) => (
  <Container>
    <Button onClick={() => handleBaseChange("Record")}>Record</Button>
    <Button onClick={() => handleBaseChange("Import")}>Import</Button>
    <Button onClick={() => handleBaseChange("Generate")}>Generate</Button>
  </Container>
);

const LargeView = ({ base, handleDone }: { base: string; handleDone: (e: React.MouseEvent) => void }) => (
  <Container>
    <img src={spectrogramPlaceHolder} alt="Spectrogram placeholder" width={600} height={300} /> {/* Use Image component here */}
    {base}
  </Container>
);

const SmallView = () => (
  <Container>
    <img src={spectrogramPlaceHolder} alt="Spectrogram placeholder" width={300} height={150} /> {/* Use Image component here */}
  </Container>
);



export default SignalView;