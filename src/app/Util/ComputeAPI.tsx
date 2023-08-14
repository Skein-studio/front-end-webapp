import { Node } from "reactflow";
import { useGraph } from "../Node/GraphContext";
import { NodeContext, NodeState } from "../Node/NodeState";
import { transformtoTypescriptTypes } from "./modelTransformation"
import { useContext } from "react";

export async function SendGraphForCompute(){

    let graph = transformtoTypescriptTypes()


    let endpoint = "http://localhost:5001/audio/put"

    const response = await fetch(endpoint, {
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

export async function getSoundFromNodeID(): Promise<string>{
    let nodeContext = useContext(NodeContext)
    debugger;
    let id = nodeContext?nodeContext.id: 0
    let idString = `${id}`
    let endpoint = "http://localhost:5001/compute/poll"
    let outputs: outputs
    let nestedDict: nodesDict
    let count = 0
    while(true){
        const response = await fetch(endpoint)
        nestedDict = await response.json()
        if (count == 2){
            let node: NodeState = useGraph().nodes[id].data.nodeState
            let handle: string = node.outputs? node.outputs[0]: ""
            nestedDict[idString][handle] =   "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav";
        }
        if (nestedDict[idString]){
            outputs = nestedDict[idString]
            break
        }

        sleep(2000)
        count++;
    }

    let graphContext =  useGraph()
   
    graphContext.nodes.forEach((node: Node)=>{
        node.data.nodeState.dirty = false
        node.data.nodeState.data.audio = outputs[idString]
    })
    //set current nodeID sound output handle name to correct url
    let node: NodeState = graphContext.nodes[id].data.nodeState
    let handle: string = node.outputs? node.outputs[0]: ""
    
    return nestedDict[id as number][handle]
}