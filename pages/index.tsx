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
                    "ID": "[62889fba-1e12-4867-8019-1d3199aaf8c4:[output-[0] 62889fba-1e12-4867-8019-1d3199aaf8c4]out[0]]-[9774941b-1886-4dcb-ae85-b824c575644d:9774941b-1886-4dcb-ae85-b824c575644din[0]]",
                    "Input": {
                        "InputName": "input-[0]",
                        "NodeID": "9774941b-1886-4dcb-ae85-b824c575644d"
                    },
                    "Output": {
                        "NodeID": "62889fba-1e12-4867-8019-1d3199aaf8c4",
                        "OutputName": "output-[0]"
                    }
                },
                {
                    "ID": "[a3cc9c13-31e1-4f81-9dc6-7e75080d4b80:[output-[0] a3cc9c13-31e1-4f81-9dc6-7e75080d4b80]out[0]]-[a48718c2-a050-4724-8570-29c73eef8b41:a48718c2-a050-4724-8570-29c73eef8b41in[0]]",
                    "Input": {
                        "InputName": "input-[0]",
                        "NodeID": "a48718c2-a050-4724-8570-29c73eef8b41"
                    },
                    "Output": {
                        "NodeID": "a3cc9c13-31e1-4f81-9dc6-7e75080d4b80",
                        "OutputName": "output-[0]"
                    }
                },
                {
                    "ID": "[a48718c2-a050-4724-8570-29c73eef8b41:[output-[0] a48718c2-a050-4724-8570-29c73eef8b41]out[0]]-[62889fba-1e12-4867-8019-1d3199aaf8c4:62889fba-1e12-4867-8019-1d3199aaf8c4in[0]]",
                    "Input": {
                        "InputName": "input-[0]",
                        "NodeID": "62889fba-1e12-4867-8019-1d3199aaf8c4"
                    },
                    "Output": {
                        "NodeID": "a48718c2-a050-4724-8570-29c73eef8b41",
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
                    "ID": "a3cc9c13-31e1-4f81-9dc6-7e75080d4b80",
                    "Inputs": [],
                    "Outputs": [
                        {
                            "ID": "[output-[0] a3cc9c13-31e1-4f81-9dc6-7e75080d4b80]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 156.3,
                        "y": 561
                    },
                    "Type": "source"
                },
                {
                    "Data": {
                        "Prompt": "",
                        "Seed": "1234"
                    },
                    "Dirty": true,
                    "ID": "62889fba-1e12-4867-8019-1d3199aaf8c4",
                    "Inputs": [
                        {
                            "ID": "62889fba-1e12-4867-8019-1d3199aaf8c4in[0]",
                            "Name": "input-[0]"
                        }
                    ],
                    "Outputs": [
                        {
                            "ID": "[output-[0] 62889fba-1e12-4867-8019-1d3199aaf8c4]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 137,
                        "y": 908.3333333333334
                    },
                    "Type": "signal"
                },
                {
                    "Data": {
                        "Prompt": "",
                        "Seed": "1234"
                    },
                    "Dirty": true,
                    "ID": "9774941b-1886-4dcb-ae85-b824c575644d",
                    "Inputs": [
                        {
                            "ID": "9774941b-1886-4dcb-ae85-b824c575644din[0]",
                            "Name": "input-[0]"
                        }
                    ],
                    "Outputs": [
                        {
                            "ID": "[output-[0] 9774941b-1886-4dcb-ae85-b824c575644d]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 126.33333333333334,
                        "y": 1072.3333333333333
                    },
                    "Type": "signal"
                },
                {
                    "Data": {},
                    "Dirty": true,
                    "ID": "a48718c2-a050-4724-8570-29c73eef8b41",
                    "Inputs": [
                        {
                            "ID": "a48718c2-a050-4724-8570-29c73eef8b41in[0]",
                            "Name": "input-[0]"
                        },
                        {
                            "ID": "a48718c2-a050-4724-8570-29c73eef8b41in[1]",
                            "Name": "input-[1]"
                        }
                    ],
                    "Outputs": [
                        {
                            "ID": "[output-[0] a48718c2-a050-4724-8570-29c73eef8b41]out[0]",
                            "Name": "output-[0]",
                            "Src": ""
                        }
                    ],
                    "Position": {
                        "x": 152.3,
                        "y": 713
                    },
                    "Type": "merge"
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
