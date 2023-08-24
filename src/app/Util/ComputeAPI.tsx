import { Node } from "reactflow";
import { Graph, useGraph } from "../Node/GraphContext";
import { NodeContext, NodeState } from "../Node/NodeState";
import { Root, transformtoTypescriptTypes, Output as modelOutput} from "./modelTransformation";
import { useContext } from "react";

export async function SendGraphForCompute(graph: Root) {
  console.log("Sending graph for compute: ", graph);
  let endpoint = "http://localhost:5001/compute";

  await fetch(endpoint, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graph),
  });
}

export async function postSoundBLOB(blob: Blob): Promise<string> {
  let endpoint = "http://localhost:5001/audio/put";
  const formData = new FormData();
  formData.append("audiofile", blob);

  return fetch(endpoint, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data.url;
    })
    .catch((error) => console.error("Error:", error));
}

type nodesDict = {
  [nodeID: string]: outputs;
};
type outputs = {
  [outputName: string]: string;
};



const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function getSoundFromNodeID(
  id: string,
  graph: Graph,
  endpoint: string = "http://localhost:5001/compute/get_computed_nodes",
  maxRetries: number = 100,
  retryDelay: number = 2000
) {
  //console.log(graphContext)
  let idString = `${id}`;
  // let endpoint = "http://localhost:5001/compute/poll"
  let nestedDict: nodesDict = {};
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await fetch(endpoint);
      if (!response.ok) {
        throw new Error("{$response.status}");
      }

      console.log(response);
      nestedDict = await response.json();
      if (nestedDict[idString]) {
        break;
      }

      retries++;
      if (retries < maxRetries) {
        await sleep(retryDelay);
      }
    } catch (error) {
      console.error(error);
      retries++;
      if (retries < maxRetries) {
        await sleep(retryDelay);
      }
    }
    //console.log(nestedDict);
  }

  if (retries == maxRetries) {
    throw new Error("Max amount of fetch retries. Cancelling...");
  }
  graph.nodes.forEach((node: Node) => {
    node.data.nodeState.model.Dirty = false;
    const nodeId = node.data.nodeState.model.ID;

    // Check if the nodeID exists in the JSON data
    if (nestedDict[nodeId]) {
      // Traverse each output of the node
      node.data.nodeState.model.Outputs.forEach((output: modelOutput) => {
        const outputName = output.Name;
 
        // Check if the outputName exists in the JSON data for the current node
        if (nestedDict[nodeId][outputName]) {
          output.Src = nestedDict[nodeId][outputName];
        }
      });
    }
  })
  
  return graph.nodes
}
