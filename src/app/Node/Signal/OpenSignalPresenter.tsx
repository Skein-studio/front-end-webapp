// OpenSignalPresenter.tsx
import OpenSignalView from "./OpenSignalView";
import { SignalType } from "@/app/Util/modelTransformation";
import { useContext, useEffect } from "react";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

function OpenSignalPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData = node.model.Data as SignalType;
  const graph = useGraph();

  useEffect(() => {}, [node]);

  const handlePromptChange = (prompt: string) => {
    node.setPrompt(prompt);
    node.model.Dirty = true;
    graph.refresh();
  };

  const exportFile = async () => {
    const outputSrc = node.model.Outputs[0].Src;

    // Fetch the file
    const response = await fetch(outputSrc);
    const blob = await response.blob();

    // Create a temporary anchor element and simulate a click event
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `skeinstudio-${outputSrc}.mp3`); // You can dynamically set the file name as well
    document.body.appendChild(link);
    link.click();

    // Cleanup
    window.URL.revokeObjectURL(url);
    document.body.removeChild(link);
  };

  return (
    <OpenSignalView
      exportFile={exportFile}
      prompt={nodeData.Prompt}
      setPrompt={handlePromptChange}
    />
  );
}
export default OpenSignalPresenter;
