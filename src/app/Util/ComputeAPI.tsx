import { useContext } from "react";
import { Graph, GraphContext } from "../Node/GraphContext";
import { RootModel, OutputModel, NodeModel } from "../Node/Model/modelDatatypes";
import { Node } from "reactflow";

/**
 * Represents the job and node statuses.
 * @property {boolean} jobStatus - The overall status of the job.
 * @property {Array} nodeStatus - An array of individual node statuses.
 */
type Job = {
  nodeStatus: { status: boolean; nodeID: string }[];
  jobStatus: boolean;
};

// Initialize job with default values
let job: Job = {jobStatus: false, nodeStatus: []};


const BASE_URL = "http://localhost:5001";
const COMPUTE_ENDPOINT = `${BASE_URL}/compute`;
const AUDIO_UPLOAD_ENDPOINT = `${BASE_URL}/audio/put`;
const COMPUTED_NODE_ENDPOINT = `${BASE_URL}/compute/get_computed_node`;

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
 * Stops all pending tasks by setting the job status to false.
 */
export function stopJob() {
  job.nodeStatus = []
  job.jobStatus = false;
}

/**
 * Retrieves the current job status.
 * @returns The current job object.
 */
export function getJob(){
  return job;
}
/**
 * Retries a promise-based function until it is successful or until it reaches a maximum retry limit.
 * @param {() => Promise<any>} fn - The function to retry.
 * @param {number} maxRetries - Maximum number of retries.
 * @param {number} retryDelay - Delay between retries in milliseconds.
 * @throws Will throw an error if the maximum number of retries is reached.
 * @returns The result of the promise-based function if successful.
 */
async function retry(fn: () => Promise<any>, maxRetries: number, retryDelay: number) {
  let retries = 0;
  while (retries < maxRetries) {
    try {
      return await fn();
    } catch (error) {
      console.error(error);
      retries++;
      if (retries >= maxRetries) {
        throw new Error("Max retries reached");
      }
      await sleep(retryDelay);
    }
  }
}

/**
 * Computes an array of nodes in a specific order.
 * @param {string[]} nodeIDs - An array of node IDs to be computed.
 * @param {Graph} graph - The graph containing the nodes to be computed. 
 * @param {number} maxRetries - Maximum number of retries in case of failure. Default is 100.
 * @param {number} retryDelay - Time delay between each retry in milliseconds. Default is 2000.
 * @throws Will throw an error if a node is not found or if the job was stopped.
 */
export async function ComputeNodesInOrder(
  nodeIDs: string[],
  graph: Graph, // Moved graph here as an argument
  maxRetries: number = 100,
  retryDelay: number = 2000
) {
  for (const nodeID of nodeIDs) {
    if (!job.jobStatus) {
      console.log('Stopped the execution.');
      throw new Error("Job was stopped");
    }

    const node: Node | undefined = graph.nodes.find(node => (node.data.model as NodeModel).ID === nodeID);
    if (!node) {
      throw new Error("Node not found");
    }

    try {
      await retry(async () => {
        // Perform the actual computation for the node
        await computeNode(node.data.model);

        // Fetch and update node data from server
        const newDict = await fetchJSON(`${BASE_URL}${COMPUTED_NODE_ENDPOINT}/${node.data.model.ID}`);
        
        // Update node state
        node.data.nodeState.model.Dirty = false;
        node.data.nodeState.loading = false;
        node.data.nodeState.model.Outputs.forEach((output: OutputModel) => {
          output.Src = newDict[output.Name];
        });
      }, maxRetries, retryDelay);

      console.log(`Successfully computed node ${nodeID}`);
    } catch (error) {
      console.error(error);
      job.jobStatus = false; // Stop further tasks if one fails
    }
  }
}

/**
 * This function sends a node model to the compute endpoint. It takes a NodeModel object, stringifies it, and sends it in the POST request's body.
 * @param {NodeModel} node - The RootModel object to send to the compute endpoint
 * TODO @returns {Promise<Response>} - The response from the compute endpoint 
 * */
const computeNode = (node: NodeModel) =>{
  fetch(COMPUTE_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(node),
  });
}


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