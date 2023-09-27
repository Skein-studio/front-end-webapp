//OpenSourceView.tsx
import GenerateAudio from "@/app/Util/AudioGenerator/GenerateAudio";
import ImportAudio from "@/app/Util/AudioImporter/ImportAudio";
import RecordPresenter from "@/app/Util/AudioRecorder/RecordPresenter";
import { Button, Container } from "@/app/Util/BaseStyles";
import { useContext, useState } from "react";
import { NodeContext } from "../NodeState";
import { SourceTypeModel } from "@/app/Node/Model/modelDatatypes";

function BaseComponent(base: string) {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const [reload, setReload] = useState<boolean>(false);

  function handleBaseChange(text: string) {
    (node.model.Data as SourceTypeModel).base = text;
    setReload(!reload);
  }

  function BaseOptionsView() {
    return (
      <Container flexdir="row">
        <Button onClick={() => handleBaseChange("record")}>record</Button>
        <Button onClick={() => handleBaseChange("import")}>import</Button>
        <Button onClick={() => handleBaseChange("generate")} disabled={false}>
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

/**
 * The view for the opened Source node, where source node base can be set, and then you can record, import, or generate audio.
 * @returns A Container component, which contains the selected BaseComponent.
 * */
export default function OpenSourceView() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;

  return (
    <Container flexdir="column">
      {BaseComponent(
        (node?.model.Data as SourceTypeModel).base ?? "Select a base"
      )}
    </Container>
  );
}
