// OpenSignalPresenter.tsx
import OpenSignalView from "./OpenSignalView";
import { useContext } from "react";
import { NodeContext, setPrompt } from "../NodeState";
import { useReactFlow, useUpdateNodeInternals } from "reactflow";

/**
 * The presenter for the opened Signal node, where signal can be edited or exported.
 * @returns An OpenSignalView component.
 * */
function OpenSignalPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData = node.model.Data;
  const reactFlowInstance = useReactFlow();
  const updateInternals = useUpdateNodeInternals();

  const handlePromptChange = (prompt: string) => {
    setPrompt(node, prompt);
    node.model.Dirty = true;
    updateInternals(node.model.ID);
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
