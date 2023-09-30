// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext } from "react";
import { NodeContext } from "../NodeState";
import { topologicalSort } from "@/app/Node/Model/modelTransformation";
import {
  SendGraphForCompute,
  populateDependenciesByNodeID,
} from "@/app/Util/ComputeAPI";
import { useReactFlow, useUpdateNodeInternals } from "reactflow";

/**
 * The presenter for the Signal node.
 * @returns A SignalView component.
 * */
export default function SignalPresenter() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const audioUrl = node.model.Outputs[0].Src;
  const fetched = !node.model.Dirty;
  const audioState = useAudio(audioUrl, true);
  const reactFlowInstance = useReactFlow();
  const nodes = reactFlowInstance.getNodes();
  const edges = reactFlowInstance.getEdges();
  const updateInternals = useUpdateNodeInternals();

  //  play button's callback include the fetchAudio function
  const playAudio = () => {
    if (fetched) {
      audioState.onPlayPause();
    } else {
      fetchAudio();
    }
  };

  const fetchAudio = async () => {
    try {
      let loadingNodes: string[] = topologicalSort(nodes, edges);
      loadingNodes.forEach((id) => {
        let n = nodes.find((n) => n.id == id);
        if (n) {
          n.data.nodeState.loading = true;
          updateInternals(n.id);
        }
      });
      await SendGraphForCompute(reactFlowInstance.toObject());
      await populateDependenciesByNodeID(node.model.ID);

      updateInternals(node.model.ID);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignalView
      audioState={audioState}
      playAudio={playAudio}
      fetched={fetched}
      fetching={node.loading}
    />
  );
}
