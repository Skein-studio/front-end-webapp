import { Graph } from "../Node/GraphContext";
import { RootModel, OutputModel } from "../Node/Model/modelDatatypes";
import isEqual from "lodash/isEqual";

const BASE_URL = "http://localhost:5001";
const COMPUTE_ENDPOINT = `${BASE_URL}/compute`;
const AUDIO_UPLOAD_ENDPOINT = `${BASE_URL}/audio/put`;
const COMPUTED_NODES_ENDPOINT = `${BASE_URL}/compute/get_computed_nodes`;

/**
 * A utility function that fetches data from a URL and returns the JSON-parsed response. The function takes a URL and optional fetch parameters, executes a fetch request, and directly returns the JSON.
 * @param {string} url - The URL to fetch from
 * @param {object} opts - Optional fetch parameters
 */
const fetchJSON = async (url: string, opts = {}) =>
  (await fetch(url, opts)).json();

/**
 * This function sends a graph model to the compute endpoint. It takes a RootModel object, stringifies it, and sends it in the POST request's body.
 * @param {RootModel} rootModel - The RootModel object to send to the compute endpoint
 * @returns {Promise<Response>} - The response from the compute endpoint
 * */
export const SendGraphForCompute = (rootModel: RootModel) =>
  fetch(COMPUTE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(rootModel),
  });

/**
 * This function uploads an audio blob to a specific endpoint and returns the URL of the uploaded file. It uses the FormData object to hold the blob data and sends it via a POST request.
 * @param {Blob} blob - The audio blob to upload
 * @returns {Promise<string>} - The URL of the uploaded file
 * */
export const uploadAudioBlob = async (blob: Blob): Promise<string> => {
  const formData = new FormData();
  formData.append("audiofile", blob);
  const data = await fetchJSON(AUDIO_UPLOAD_ENDPOINT, {
    method: "POST",
    body: formData,
  });
  return data.url;
};

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * This function continuously fetches from the COMPUTED_NODES_ENDPOINT until it retrieves data for a given node ID or the maximum number of retries is reached. It updates the graph context with newly fetched data during each iteration.
 * @param {string} id - The ID of the node to fetch data for
 * @param {Graph} graphContext - The graph context to update
 * @param {number} maxRetries - The maximum number of retries
 * @param {number} retryDelay - The delay between each retry
 * @returns {Promise<void>} - A promise that resolves when the node data is fetched
 * */
export async function populateDependenciesByNodeID(
  id: string,
  graphContext: Graph,
  maxRetries: number = 100,
  retryDelay: number = 2000
) {
  let nestedDict: nodeOutputMapping = {};
  let retries = 0;

  const retry = async () => {
    if (++retries < maxRetries) await sleep(retryDelay);
    else throw new Error("Max amount of fetch retries. Cancelling...");
  };

  while (retries < maxRetries) {
    try {
      const newDict = await fetchJSON(COMPUTED_NODES_ENDPOINT);
      const diff = getDifferences(nestedDict, newDict);

      if (Object.keys(diff).length) {
        updateGraph(graphContext, diff);
        Object.assign(nestedDict, diff);
      }

      if (nestedDict[id]) break;
      await retry();
    } catch (error) {
      console.error(error);
      await retry();
    }
  }
}

type nodeOutputMapping = Record<string, Record<string, string>>;

/**
 * This function updates the graph context with new data. It goes through each node ID in the received diff and updates the corresponding node in the graph.
 * @param {Graph} graph - The graph context to update
 * @param {nodeOutputMapping} diff - The diff object containing the node IDs and their outputs
 * */
function updateGraph(graph: Graph, diff: nodeOutputMapping) {
  for (const nodeID in diff) {
    const node = graph.nodes.find((n) => n.data.nodeState.getID() === nodeID);
    if (!node) {
      continue;
    }
    node.data.nodeState.model.Dirty = false;
    node.data.nodeState.loading = false;
    node.data.nodeState.model.Outputs.forEach((output: OutputModel) => {
      const outputName = output.Name;

      // Check if the outputName exists in the JSON data for the current node
      if (diff[nodeID][outputName]) {
        output.Src = diff[nodeID][outputName];
      }
    });
    graph.refresh();
  }
}

/**
 * This function compares two dictionaries (oldDict and newDict) and returns the differences between them. It's used to figure out which parts of the graph have changed and need to be updated.
 * @param {nodeOutputMapping} oldDict - The old dictionary to compare
 * @param {nodeOutputMapping} newDict - The new dictionary to compare
 * @returns {nodeOutputMapping} - The differences between the two dictionaries
 * */
const getDifferences = (
  oldDict: nodeOutputMapping,
  newDict: nodeOutputMapping
) => {
  const diff: nodeOutputMapping = {};

  for (const [nodeId, value] of Object.entries(newDict)) {
    if (!isEqual(oldDict[nodeId], value)) diff[nodeId] = value;
  }

  return diff;
};
