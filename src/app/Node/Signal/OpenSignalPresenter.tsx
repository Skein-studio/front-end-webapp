// SignalDetailPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import OpenSignalView from "./OpenSignalView";
import {
  SignalType,
  transformtoTypescriptTypes,
} from "@/app/Util/modelTransformation";
import { useContext, useEffect } from "react";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

function OpenSignalPresenter() {
  // const audioState = useAudio();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const nodeData = node?.model.Data as SignalType;
  const graph = useGraph();

  function reload() {
    graph?.reloadComponent();
  }

  useEffect(() => {}, [node]);

  const handlePromptChange = (prompt: string) => {
    node?.setPrompt(prompt);
    reload();
  };
  return (
    <OpenSignalView
      prompt={nodeData.prompt as string}
      setPrompt={handlePromptChange}
    />
  );
}
export default OpenSignalPresenter;
