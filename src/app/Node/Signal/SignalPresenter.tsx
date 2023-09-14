// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../NodeState";
import {
  transformtoTypescriptTypes,
  Graph,
  topologicalSortFromGraph,
  topologicalSort
} from "@/app/Util/modelTransformation";
import { useGraph } from "../GraphContext";
import { SendGraphForCompute, populateDependenciesByNodeID } from "@/app/Util/ComputeAPI";

function delay(ms: number) {
  return new Promise( resolve => setTimeout(resolve, ms) );
}

export default function SignalPresenter() {
  const graph = useGraph();
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const [audioUrl, setAudioUrl] = useState<string>(node.model.Outputs[0].Src);
  const [fetched, setFetched] = useState<boolean>(false);
  const [fetching, setFetching] = useState<boolean>(false);
  const audioState = useAudio(audioUrl, true);

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
    setFetching(true); // Set fetching to true when the audio is being fetched, so that the spinner is shown

    try {
      let loadingNodes: string[] = topologicalSort(transformtoTypescriptTypes(graph).Sketch.Graph)
      console.log(loadingNodes)
      loadingNodes.forEach((id)=>{
        let n = graph.nodes.find(n => n.id == id)
        if(n)
          n.data.nodeState.loading = true
      })


      await SendGraphForCompute(transformtoTypescriptTypes(graph));
      let url: string;

      await populateDependenciesByNodeID(node.id, graph);

      graph.reloadComponent();
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

    console.log(graph)
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
