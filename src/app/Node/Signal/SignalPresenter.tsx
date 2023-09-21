// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext } from "react";
import { NodeContext } from "../NodeState";
import {
  transformGraphToRootModel,
  topologicalSort,
} from "@/app/Node/Model/modelTransformation";
import { useGraph } from "../GraphContext";
import {
  SendGraphForCompute,
  populateDependenciesByNodeID,
} from "@/app/Util/ComputeAPI";

/**
 * The presenter for the Signal node.
 * @returns A SignalView component.
 * */
export default function SignalPresenter() {
  const graph = useGraph();
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const audioUrl = node.model.Outputs[0].Src;
  const fetched = !node.model.Dirty;
  const audioState = useAudio(audioUrl, true);

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
      let loadingNodes: string[] = topologicalSort(
        transformGraphToRootModel(graph).Sketch.Graph
      );
      loadingNodes.forEach((id) => {
        let n = graph.nodes.find((n) => n.id == id);
        if (n) n.data.nodeState.loading = true;
      });
      graph.refresh(); // Reload the component to show the spinner

      await SendGraphForCompute(transformGraphToRootModel(graph));
      await populateDependenciesByNodeID(node.getID(), graph);

      graph.refresh(); // done
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
