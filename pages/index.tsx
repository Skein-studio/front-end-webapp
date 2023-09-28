//index.tsx

import React from "react";
import "reactflow/dist/style.css";
import FlowWrapper from "@/app/Util/Flow/FlowPresenter";
import { styled } from "styled-components";
const ApplicationFrame = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export default function Home() {
  const dummyData = {
    "Sketch": {
        "Graph": {
            "Edges": [
                {
                    "ID": "[eda9bfb3-f55c-410e-aec1-4ada87da1d78:[output-[0] eda9bfb3-f55c-410e-aec1-4ada87da1d78]out[0]]-[a8e389b5-261d-4574-b337-53b90e42a322:a8e389b5-261d-4574-b337-53b90e42a322in[0]]",
                    "Input": {
                        "InputName": "input-[0]",
                        "NodeID": "a8e389b5-261d-4574-b337-53b90e42a322"
                    },
                    "Output": {
                        "NodeID": "eda9bfb3-f55c-410e-aec1-4ada87da1d78",
                        "OutputName": "output-[0]"
                    }
                },
                {
                    "ID": "[f739abeb-f167-4a38-a30b-9bce7b053a26:[output-[0] f739abeb-f167-4a38-a30b-9bce7b053a26]out[0]]-[eda9bfb3-f55c-410e-aec1-4ada87da1d78:eda9bfb3-f55c-410e-aec1-4ada87da1d78in[0]]",
                    "Input": {
                        "InputName": "input-[0]",
                        "NodeID": "eda9bfb3-f55c-410e-aec1-4ada87da1d78"
                    },
                    "Output": {
                        "NodeID": "f739abeb-f167-4a38-a30b-9bce7b053a26",
                        "OutputName": "output-[0]"
                    }
                }
            ],
            "Nodes": [
                {
                    "Data": {
                        "URL": "",
                        "base": ""
                    },
                    "Dirty": true,
                    "ID": "f739abeb-f167-4a38-a30b-9bce7b053a26",
                    "Inputs": [],
                    "Outputs": [
                        {
                            "ID": "[output-[0] f739abeb-f167-4a38-a30b-9bce7b053a26]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 149.63333333333333,
                        "y": 262.3333333333333
                    },
                    "Type": "source"
                },
                {
                    "Data": {},
                    "Dirty": true,
                    "ID": "eda9bfb3-f55c-410e-aec1-4ada87da1d78",
                    "Inputs": [
                        {
                            "ID": "eda9bfb3-f55c-410e-aec1-4ada87da1d78in[0]",
                            "Name": "input-[0]"
                        },
                        {
                            "ID": "eda9bfb3-f55c-410e-aec1-4ada87da1d78in[1]",
                            "Name": "input-[1]"
                        }
                    ],
                    "Outputs": [
                        {
                            "ID": "[output-[0] eda9bfb3-f55c-410e-aec1-4ada87da1d78]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 144.29999999999995,
                        "y": 440.99999999999994
                    },
                    "Type": "merge"
                },
                {
                    "Data": {
                        "Prompt": "",
                        "Seed": "1234"
                    },
                    "Dirty": true,
                    "ID": "a8e389b5-261d-4574-b337-53b90e42a322",
                    "Inputs": [
                        {
                            "ID": "a8e389b5-261d-4574-b337-53b90e42a322in[0]",
                            "Name": "input-[0]"
                        }
                    ],
                    "Outputs": [
                        {
                            "ID": "[output-[0] a8e389b5-261d-4574-b337-53b90e42a322]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 126.33333333333334,
                        "y": 580.3333333333334
                    },
                    "Type": "signal"
                }
            ]
        },
        "ID": "1",
        "Name": "spaghetti"
    }
};


  return (
    <ApplicationFrame>
      <FlowWrapper rootModel={dummyData}/>
      {/*This content is outside the Flow window*/}
    </ApplicationFrame>
  );
}
