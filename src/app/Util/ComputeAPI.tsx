import { Node } from "reactflow";
import { Graph, useGraph } from "../Node/GraphContext";
import { NodeContext, NodeState } from "../Node/NodeState";
import { Root, transformtoTypescriptTypes } from "./modelTransformation"
import { useContext } from "react";

export async function SendGraphForCompute(graph: Root){
    console.log(graph)
    let endpoint = "http://localhost:5001/compute"

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

    return fetch(endpoint, {
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
    endpoint: string = "http://localhost:5001/compute/get_computed_nodes",
    maxRetries: number = 100,
    retryDelay: number = 2000
) {

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
                console.log(response)


            nestedDict = await response.json()
                //nestedDict['2'] = {}
                //nestedDict['2']['2out[0]'] = "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav";

                if (nestedDict[idString]){
                    outputs = nestedDict[idString]
                        break
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
        console.log(nestedDict)
    }

    if (retries == maxRetries) {
        throw new Error("Max amount of fetch retries. Cancelling...")
    }

    graphContext.nodes.forEach((node: Node)=>{
        //TODO uncomment when dirty propagation is completed
        node.data.nodeState.dirty = false
        console.log("1",node)      
          
        node.data.nodeState.model.Data.URL = Object.values(nestedDict[idString])[0]
        console.log("2", node)

     })
     //set current nodeID sound output handle name to correct url
     //console.log(graphContext.nodes)
}
