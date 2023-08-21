// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../NodeState";
import { SendGraphForCompute } from "@/app/Util/ComputeAPI";
import { transformtoTypescriptTypes } from "@/app/Util/modelTransformation";
import { getSoundFromNodeID } from "@/app/Util/ComputeAPI";
import { useGraph } from "../GraphContext";
import { useEdges } from "reactflow";

export default function SignalPresenter() {
  const graph = useGraph();
  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  const [audioUrl, setAudioUrl] = useState<string>("");
  const audioState = useAudio(audioUrl);

  useEffect(() => {
    fetchAudio();
  }, [audioUrl]);

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
    } catch (e) {
      console.log(e);
    }
  };

  return <SignalView audioState={audioState} />;
}
