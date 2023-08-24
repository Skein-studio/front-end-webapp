// OpenSignalPresenter.tsx
import OpenSignalView from "./OpenSignalView";
import { SignalType } from "@/app/Util/modelTransformation";
import { useContext, useEffect } from "react";
import { NodeContext } from "../NodeState";

function OpenSignalPresenter() {
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const nodeData = node.model.Data as SignalType;

  useEffect(() => {}, [node]);

  const handlePromptChange = (prompt: string) => {
    node.setPrompt(prompt);
    forceReload();
  };
  return (
    <OpenSignalView
      prompt={nodeData.Prompt as string}
      setPrompt={handlePromptChange}
    />
  );
}
export default OpenSignalPresenter;
