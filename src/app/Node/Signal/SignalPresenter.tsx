// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../NodeState";
import { SendGraphForCompute,populateDependenciesByNodeID } from "@/app/Util/ComputeAPI";
import {
  transformtoTypescriptTypes,
} from "@/app/Util/modelTransformation";
import { useGraph } from "../GraphContext";

export default function SignalPresenter() {
  const graph = useGraph();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const [audioUrl, setAudioUrl] = useState<string>(nodeState.model.Outputs[0].Src);
  const [fetched, setFetched] = useState<boolean>(false);
  const [fetching , setFetching] = useState<boolean>(false);
  const audioState = useAudio(audioUrl);

  // useEffect to reset fetched state when node.model.Dirty changes
  useEffect(() => {
    if (node.model.Dirty) {
      setFetched(false);
      setFetching(false);
    } else {
      setFetched(true);
    }
    /*
      TODO: Store audios in the graph so that they can be accessed without fetching them again when it is not dirty (standard value of audioUrl)
    */
  }, [node.model.Dirty]);

  //  play button's callback include the fetchAudio function
  const playAudio = () => {
    if (fetched) {
      audioState.onPlayPause();
    } else {
      fetchAudio();
    }
  };

  const fetchAudio = async () => {
    setFetching(true);// Set fetching to true when the audio is being fetched, so that the spinner is shown

    try {
      await SendGraphForCompute(transformtoTypescriptTypes(graph));
      console.log(transformtoTypescriptTypes(graph))
      let url: string;

      await populateDependenciesByNodeID(node.id, graph);
  
      graph.reloadComponent()
      console.log(
        graph.nodes.find((n) => {
          return n.id == `${node.id}`;
        })
      );
      url = graph.nodes.find((n) => {
        return n.id == `${node.id}`;
      })?.data.nodeState.model.Data.URL as string;
      setFetching(false);
      setAudioUrl(url);
      setFetched(true); // Set fetched to true once the audio URL is obtained
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SignalView
      audioState={audioState}
      playAudio={playAudio}
      fetched={fetched}
      fetching={fetching}
    />
  );
}
