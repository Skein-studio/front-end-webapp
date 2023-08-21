// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../NodeState";
import { SendGraphForCompute } from "@/app/Util/ComputeAPI";
import { transformtoTypescriptTypes } from "@/app/Util/modelTransformation";
import { getSoundFromNodeID } from "@/app/Util/ComputeAPI";
import { useGraph } from "../GraphContext";

export default function SignalPresenter() {
  const graph = useGraph();
  const node = useContext(NodeContext);
  const [audioUrl, setAudioUrl] = useState<string>("");
  const [fetched, setFetched] = useState<boolean>(false); // TODO: When the dirty functionality is implemented, this should actually start out as true and be set to false in the useEffect below
  const audioState = useAudio(audioUrl);

  // useEffect to reset fetched state when node.model.Dirty changes
  useEffect(() => {
    if (node!.model.Dirty) {
      setFetched(false);
    }
  }, [node!.model.Dirty]);

  //  play button's callback include the fetchAudio function
  const playAudio = () => {
    if(fetched){
      audioState.onPlayPause();
    } else{
      fetchAudio();
    }
  };

  const fetchAudio = async () => {
    try {
      //   //TODO get audioURL with while loop until node with nodeID is found in computed nodes
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
      }
      setAudioUrl(url);
      setFetched(true); // Set fetched to true once the audio URL is obtained
    } catch (e) {
      console.log(e);
    }
        
  };

  return <SignalView audioState={audioState} playAudio={playAudio} fetched={fetched} />;
}
