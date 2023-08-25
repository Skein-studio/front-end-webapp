// SignalPresenter.tsx
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import SignalView from "./SignalView";
import { useContext, useEffect, useState } from "react";
import { NodeContext } from "../NodeState";
import { SendGraphForCompute } from "@/app/Util/ComputeAPI";
import {
  Output,
  transformtoTypescriptTypes,
} from "@/app/Util/modelTransformation";
import { getSoundFromNodeID } from "@/app/Util/ComputeAPI";
import { GraphContext, setNode, useGraph } from "../GraphContext";

export default function SignalPresenter() {
  const {nodes, setNodes} = useContext(GraphContext);
  const graph = useGraph();
  const { nodeState, forceReload } = useContext(NodeContext);
  const node = nodeState;
  const [audioUrl, setAudioUrl] = useState<string>(nodeState.model.Outputs[0].Src);
  console.log("NODESTATE!! ",nodeState)
  const [fetched, setFetched] = useState<boolean>(false);
  const audioState = useAudio(audioUrl);

  function getAudioFromInput() {
    // This function is used to get the audio URL from the parent node
    let thisEdge = graph.edges.find((edge) => {
      return edge.target == node.model.ID;
    });

    if (thisEdge == undefined) {
      return "";
    }

    let handleID = thisEdge.sourceHandle;

    let sourceNode = thisEdge.source;
    let sourceNodeModel = graph.nodes.find((node) => {
      return node.id == sourceNode;
    })?.data.nodeState.model;

    let outputArray = sourceNodeModel.Outputs as Output[];

    let output = outputArray.find((output:any) => {
      return output.ID == handleID;
    });

    if(output == undefined){
      return "";
    }
    
    let audioSrc = output.Src;

    if (audioSrc == undefined) {
      return "";
    }

    return audioSrc as string;
  }

  // useEffect to reset fetched state when node.model.Dirty changes
  useEffect(() => {
    if (node.model.Dirty || audioUrl == "") {
      setFetched(false);
    } else setFetched(true);
    /*
      TODO: Store audios in the graph so that they can be accessed without fetching them again when it is not dirty (standard value of audioUrl)
      */
  }, [node.model.Dirty]);

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
      console.log(transformtoTypescriptTypes(graph))
      let url: string;

      //THIS DOES NOT WORK?? PLS HELP
      //(Src ska alltså uppdateras i)
      await getSoundFromNodeID(node.id, graph);
      
      graph.reloadComponent()
      console.log(
        graph.nodes.find((n) => {
          return n.id == `${node.id}`;
        })
      );
      url = graph.nodes.find((n) => {
        return n.id == `${node.id}`;
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
