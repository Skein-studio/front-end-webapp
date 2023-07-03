import {  Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { TopBar, ToggleButton, NodeText } from "@/app/Util/NodeStyles";
const spectrogramPlaceHolder = 'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png';


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
      <img src={spectrogramPlaceHolder} alt="Spectrogram placeholder" width={400} height={150}/> {/* Use Image component here */}
      {base}
      <Button onClick={handleDone}>
        <NodeText>✔️</NodeText>
      </Button>
    </Container>
  );
  
  const SmallView = () => (
    <Container>
      <img src={spectrogramPlaceHolder} alt="Spectrogram placeholder" width={400} height={150} /> {/* Use Image component here */}
      <Button>
        <NodeText>▶️</NodeText>
      </Button>
    </Container>
  );
  
  const NodeContainer = ({ children }: { children: React.ReactNode }) => {
    return (
      <>
        <BlankSpace width={1} height={75}></BlankSpace>
        {children}
        <Handle type="target" position={Position.Bottom} />
      </>
    );
  };

  export {NodeContainer, SmallView, LargeView, BaseOptionsView, ToggleButtonView, TopBarView}