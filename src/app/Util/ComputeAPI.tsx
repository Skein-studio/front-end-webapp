import { Node } from "reactflow";
import { Graph } from "../Node/GraphContext";
import { Root, Output as modelOutput } from "./modelTransformation";
import isEqual from "lodash/isEqual";

const COMPUTE_ENDPOINT = "http://localhost:5001/compute";
const AUDIO_UPLOAD_ENDPOINT = "http://localhost:5001/audio/put";
const COMPUTED_NODES_ENDPOINT =
  "http://localhost:5001/compute/get_computed_nodes";

export async function SendGraphForCompute(graph: Root) {
  console.log("Sending graph for compute: ", graph);

  await fetch(COMPUTE_ENDPOINT, {
    method: "POST", // or 'PUT'
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(graph),
  });
}

export async function uploadAudioBlob(blob: Blob): Promise<string> {
  const formData = new FormData();
  formData.append("audiofile", blob);

  return fetch(AUDIO_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      return data.url;
    })
    .catch((error) => console.error("Error:", error));
}

type nodeOutputMapping = {
  [nodeID: string]: OutputMapping;
};
type OutputMapping = {
  [outputName: string]: string;
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

export async function populateDependenciesByNodeID(
  id: string,
  graphContext: Graph,
  maxRetries: number = 100,
  retryDelay: number = 2000
) {
  //console.log(graphContext)
  let idString = `${id}`;
  let nestedDict: nodeOutputMapping = {};
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const response = await fetch(COMPUTED_NODES_ENDPOINT);
      if (!response.ok) {
        throw new Error("{$response.status}");
      }

      let newDict: nodeOutputMapping = await response.json();
      newDict = getDifferences(nestedDict, newDict);
      console.log("nestedDict: " + nestedDict);
      console.log("newDixt:" + newDict);

      if (Object.keys(newDict).length > 0) {
        updateGraph(graphContext, newDict);
        nestedDict = { ...nestedDict, ...newDict };
      }

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
  }

  if (retries == maxRetries) {
    throw new Error("Max amount of fetch retries. Cancelling...");
  }
}

function updateGraph(graph: Graph, diff: nodeOutputMapping) {
  for (const nodeID in diff) {
    const node = graph.nodes.find((n) => n.data.nodeState.model.ID === nodeID);
    if (!node) {
      continue;
    }
    node.data.nodeState.model.Dirty = false;
    // Traverse each output of the node
    node.data.nodeState.model.Outputs.forEach((output: modelOutput) => {
      const outputName = output.Name;

      // Check if the outputName exists in the JSON data for the current node
      if (diff[nodeID][outputName]) {
        output.Src = diff[nodeID][outputName];
      }
    });
  }
}

function getDifferences(
  oldDict: nodeOutputMapping,
  newDict: nodeOutputMapping
): nodeOutputMapping {
  const differences: nodeOutputMapping = {};

  for (const nodeId in newDict) {
    if (!oldDict[nodeId] || !isEqual(oldDict[nodeId], newDict[nodeId])) {
      differences[nodeId] = newDict[nodeId];
    }
  }

  return differences;
}
