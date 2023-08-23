import GenerateAudio from "@/app/Util/AudioGenerator/GenerateAudio";
import ImportAudio from "@/app/Util/AudioImporter/ImportAudio";
import RecordPresenter from "@/app/Util/AudioRecorder/RecordPresenter";
import { Button, Container } from "@/app/Util/BaseStyles";
import { useContext, useState } from "react";
import { useGraph } from "../GraphContext";
import { NodeContext } from "../NodeState";
import { SourceType } from "@/app/Util/modelTransformation";

function BaseComponent(base: string) {
  const graph = useGraph();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const [reload, setReload] = useState<boolean>(false);

  function handleBaseChange(text: string) {
    if (node) {
      (node.model.Data as SourceType).base = text;
    }
    setReload(!reload);
  }

  function BaseOptionsView() {
    return (
      <Container flexdir="row">
        <Button onClick={() => handleBaseChange("record")}>record</Button>
        <Button onClick={() => handleBaseChange("import")}>import</Button>
        <Button onClick={() => handleBaseChange("generate")} disabled={true}>
          generate
        </Button>
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
  const { nodeState, forceReload } = useContext(NodeContext);

  return (
    <Container flexdir="column">
      {BaseComponent((nodeState?.model.Data as SourceType).base ?? "Select a base")}
    </Container>
  );
}
