import { Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";
import { TopBar, ToggleButton, NodeText } from "@/app/Util/NodeStyles";
import RecordPresenter from "@/app/Util/AudioRecorder/RecordPresenter";
import ImportAudio from "@/app/Util/AudioImporter/ImportAudio";
import GenerateAudio from "@/app/Util/AudioGenerator/GenerateAudio";

const spectrogramPlaceHolder =
  "https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png";

const TopBarView = ({ base }: { base: string }) => (
  <TopBar>
    <NodeText>Source{base != "" ? `: ${base}` : ""}</NodeText>
  </TopBar>
);

const ToggleButtonView = ({
  showLargeView,
  handleClick,
}: {
  showLargeView: boolean;
  handleClick: (e: React.MouseEvent) => void;
}) => (
  <ToggleButton onClick={handleClick}>{showLargeView ? "-" : "+"}</ToggleButton>
);

const BaseOptionsView = ({
  handleBaseChange,
}: {
  handleBaseChange: (text: string) => void;
}) => (
  <Container>
    <Button onClick={() => handleBaseChange("Record")}>Record</Button>
    <Button onClick={() => handleBaseChange("Import")}>Import</Button>
    <Button onClick={() => handleBaseChange("Generate")}>Generate</Button>
  </Container>
);

const BaseComponent = ({ base }: { base: string }) => {
  switch (base) {
    case "Record":
      return <RecordPresenter />;
    case "Import":
      return <ImportAudio />;
    case "Generate":
      return <GenerateAudio />;
    default:
      return null;
  }
};

const LargeView = ({
  base,
  handleDone,
}: {
  base: string;
  handleDone: (e: React.MouseEvent) => void;
}) => (
  <Container>
    <img
      src={spectrogramPlaceHolder}
      alt="Spectrogram placeholder"
      style={{ width: "100%", height: "auto" }} // change here
    />{" "}
    {/* Use Image component here */}
    <BaseComponent base={base}></BaseComponent>
    <Button>
      <NodeText onClick={handleDone}>Done</NodeText>
    </Button>
  </Container>
);

const SmallView = () => (
  <Container>
    <img
      src={spectrogramPlaceHolder}
      alt="Spectrogram placeholder"
      style={{ width: "100%", height: "auto" }} // change here
    />{" "}
    {/* Use Image component here */}
    <Button>
      <NodeText>▶️</NodeText>
    </Button>
  </Container>
);


type SourceProps = {
  showLargeView: boolean;
  handleToggleView: (e: React.MouseEvent) => void;
  base: string;
  handleBaseChange: (text: string) => void;
  handleDone: (e: React.MouseEvent) => void;
};

const SourceView: React.FC<SourceProps> = ({
  showLargeView,
  handleToggleView,
  base,
  handleBaseChange,
  handleDone,
}) => {
  const CurrentNode = showLargeView ? NodeLarge : NodeSmall;

  return (
    <CurrentNode>
      <Container>
        <TopBarView base={base} />
        {base && (
          <ToggleButtonView
            showLargeView={showLargeView}
            handleClick={handleToggleView}
          />
        )}
        <Container style={{flex: 1}}> 
          {base ? (
            showLargeView ? (
              <LargeView base={base} handleDone={handleDone} />
            ) : (
              <SmallView />
            )
          ) : (
            <BaseOptionsView handleBaseChange={handleBaseChange} />
          )}
          <Handle type="target" position={Position.Bottom} />
        </Container>
      </Container>
    </CurrentNode>
  );
};

export default SourceView;
