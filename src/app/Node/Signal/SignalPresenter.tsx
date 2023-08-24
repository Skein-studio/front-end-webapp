// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../NodeState";
import { SendGraphForCompute } from "@/app/Util/ComputeAPI";
import {
  SignalType,
  transformtoTypescriptTypes,
} from "@/app/Util/modelTransformation";
import { getSoundFromNodeID } from "@/app/Util/ComputeAPI";
import { useGraph } from "../GraphContext";

export default function SignalPresenter() {
  const graph = useGraph();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(false);
  const audioState = useAudio(audioUrl);

  // useEffect to reset fetched state when node.model.Dirty changes
  useEffect(() => {
    if (node!.model.Dirty || audioUrl == "") {
      setFetched(false);
    } else setFetched(true);
    /*
      TODO: Store audios in the graph so that they can be accessed without fetching them again when it is not dirty (standard value of audioUrl)
      */
  }, [node!.model.Dirty]);

  //  play button's callback include the fetchAudio function
  const playAudio = () => {
    if (fetched && audioUrl != "") {
      audioState.onPlayPause();
    } else {
      fetchAudio();
    }
  };

  const fetchAudio = async () => {
    setFetched(false);
    try {
      //   //TODO get audioURL with while loop until node with nodeID is found in computed nodes ??
      await SendGraphForCompute(transformtoTypescriptTypes(graph));
      let url: string;

      await getSoundFromNodeID(node!.id, graph);
      console.log(
        graph.nodes.find((n) => {
          return n.id == `${node!.id}`;
        })
      );
      url = graph.nodes.find((n) => {
        return n.id == `${node!.id}`;
      })?.data.nodeState.model.Data.URL as string;

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
    />
  );
}
