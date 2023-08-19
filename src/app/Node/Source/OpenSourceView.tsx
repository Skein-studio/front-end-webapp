import GenerateAudio from "@/app/Util/AudioGenerator/GenerateAudio";
import ImportAudio from "@/app/Util/AudioImporter/ImportAudio";
import RecordPresenter from "@/app/Util/AudioRecorder/RecordPresenter";
import { Button, Container } from "@/app/Util/BaseStyles";
import { useContext } from "react";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import { SourceType } from "@/app/Util/modelTransformation";

function BaseComponent(base: string) {
  const graph = useGraph();
  const node = useContext(NodeContext);

  function handleBaseChange(text: string) {
    if (node) {
      (node.model.Data as SourceType).base = text;
      graph.reloadComponent();
    }
  }

  function BaseOptionsView() {
    return (
      <Container flexdir="row">
        <Button onClick={() => handleBaseChange("record")}>record</Button>
        <Button onClick={() => handleBaseChange("import")}>import</Button>
        <Button onClick={() => handleBaseChange("generate")}>generate</Button>
      </Container>
    );
  }

  switch (base) {
    case "record":
      return <RecordPresenter />;
    case "import":
      return <ImportAudio />;
    case "generate":
      return <GenerateAudio />;
    default:
      return <BaseOptionsView />;
  }
}

export default function OpenSourceView() {
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance

  return (
    <Container flexdir="column">
      {BaseComponent((node?.model.Data as SourceType).base ?? "Select a base")}
    </Container>
  );
}
