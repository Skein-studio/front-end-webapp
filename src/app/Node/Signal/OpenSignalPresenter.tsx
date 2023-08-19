// SignalDetailPresenter.tsx
import useAudio from "@/app/Util/useAudio";
import OpenSignalView from "./OpenSignalView";
import { SignalType, transformtoTypescriptTypes } from "@/app/Util/modelTransformation";
import { useContext, useEffect } from "react";
import { NodeContext } from "../NodeState";
import { useGraph } from "../GraphContext";

  function OpenSignalPresenter(){
  // const audioState = useAudio();
  const node = useContext(NodeContext);
  const graph = useGraph();

  function reload() {
    graph?.reloadComponent();
  }

  useEffect(() => {}, [node]);

  const handlePromptChange = (prompt: string) => {
    node?.setPrompt(prompt)
    reload();
  };
  return (
    <OpenSignalView
      prompt={(useContext(NodeContext)?.model.Data as SignalType).prompt as string}
      setPrompt={handlePromptChange}
    />
  );
}
export default OpenSignalPresenter

