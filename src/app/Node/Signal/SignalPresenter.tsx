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
  const node = useContext(NodeContext);
  const nodeData = node!.model.Data as SignalType;
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(false);
  const audioState = useAudio(audioUrl);

  // useEffect to reset fetched state when node.model.Dirty changes
  useEffect(() => {
    if (node!.model.Dirty || audioUrl == "") {
      setFetched(false);
    } else setFetched(true);
    /*
      TODO: graph.reloadComponent(); this should be uncommented, but currently this resets the audioUrl, 
      TODO: first we need to store audios in the graph so that they can be accessed without fetching them again when it is not dirty
      */
  }, []);

  //  play button's callback include the fetchAudio function
  const playAudio = () => {
    if (fetched && audioUrl != "") {
      audioState.onPlayPause();
    } else {
      fetchAudio();
    }
  };

  const fetchAudio = async () => {
    try {
      //   //TODO get audioURL with while loop until node with nodeID is found in computed nodes ??
      await SendGraphForCompute(transformtoTypescriptTypes(graph));
      let url: string;

      if (node && node.id) {
        await getSoundFromNodeID(node.id, graph);
        console.log(
          graph.nodes.find((n) => {
            return n.id == `${node.id}`;
          })
        );
        url = graph.nodes.find((n) => {
          return n.id == `${node.id}`;
        })?.data.nodeState.model.Data.URL as string;
      } else {
        url = "";
        console.log("node not found when fetching audio(signalpresenter)");
        return;
      }
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
