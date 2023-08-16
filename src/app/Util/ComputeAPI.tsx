import { Node } from "reactflow";
import { Graph, useGraph } from "../Node/GraphContext";
import { NodeContext, NodeState } from "../Node/NodeState";
import { transformtoTypescriptTypes } from "./modelTransformation"
import { useContext } from "react";

export async function SendGraphForCompute(){

    let graph = transformtoTypescriptTypes()


    let endpoint = "http://localhost:5001/audio/put"

    await fetch(endpoint, {
        method: "POST", // or 'PUT'
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(graph),
        });
}

export async function postSoundBLOB(blob: Blob): Promise<string>{
    let endpoint = "http://localhost:5001/audio/put"

    const formData = new FormData();
    formData.append('audiofile', blob);

    return fetch(endpoint+'/upload', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        return data.url
    })
    .catch(error => console.error('Error:', error));

}

type nodesDict = {
    [nodeID: string]:outputs
};
type outputs = {
    [handleID: string]: string;  
}
const sleep = (ms:number) => new Promise(r => setTimeout(r, ms));

export async function getSoundFromNodeID(
    id: number, 
    graphContext: Graph,
    endpoint: string = "http://localhost:5001/compute/poll",
    maxRetries: number = 20,
    retryDelay: number = 2000
): Promise<string> {

    //console.log(graphContext)
    let idString = `${id}`
    // let endpoint = "http://localhost:5001/compute/poll"
    let outputs: outputs
    let nestedDict: nodesDict = {}
    let retries = 0;

    while(retries < maxRetries){
        try {
            const response = await fetch(endpoint)
                if (!response.ok) {
                    throw new Error('{$response.status}');
                }

            nestedDict = await response.json()
                //nestedDict['2'] = {}
                //nestedDict['2']['2out[0]'] = "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav";

                if (nestedDict[idString]){
                    outputs = nestedDict[idString]
                        break
                }
            retries++;
            if (retries < maxRetries) {
                sleep(retryDelay);
            }
        } catch (error) {
            console.error(error);
            retries++;
            if (retries < maxRetries) {
                sleep(retryDelay);

            }
        }
    }

    if (retries == maxRetries) {
        throw new Error("Max amount of fetch retries. Cancelling...")
    }
   
     graphContext.nodes.forEach((node: Node)=>{
        //TODO uncomment when dirty propagation is completed
        //  node.data.nodeState.dirty = false
         node.data.nodeState.data.audio = outputs[idString]
     })
     
     //set current nodeID sound output handle name to correct url
     let node: NodeState = graphContext.nodes[id].data.nodeState
     let handle: string = node.outputs? node.outputs[0]: ""
    
    //return  nestedDict['2']['2out[0]']
    return nestedDict[id][handle]
}
