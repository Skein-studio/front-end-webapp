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
    ID: "IDPLACEHOLDER",
    version: 0,
    nodes: [
      {
        width: 308,
        height: 62,
        id: "15622f82-b7bb-441b-a59f-d20b7d7078d9",
        type: "source",
        data: {
          nodeState: {
            model: {
              Position: { x: 245.52499999999998, y: 157.875 },
              ID: "15622f82-b7bb-441b-a59f-d20b7d7078d9",
              Dirty: true,
              Type: "source",
              Inputs: [],
              Outputs: [
                {
                  ID: "[output-[0] 15622f82-b7bb-441b-a59f-d20b7d7078d9]out[0]",
                  Name: "output-[0]",
                  Src: "",
                },
              ],
              Data: {
                URL: "/dummyshort.mp3",
                base: "generate",
                Prompt: "",
                Seed: "1234",
              },
            },
            selected: false,
            loading: false,
          },
        },
        position: { x: 245.52499999999998, y: 157.875 },
        selected: false,
        positionAbsolute: { x: 245.52499999999998, y: 157.875 },
        dragging: false,
      },
      {
        width: 308,
        height: 62,
        id: "56759fd6-acaa-445e-ab43-144db705646e",
        type: "merge",
        data: {
          nodeState: {
            model: {
              Position: { x: 374.525, y: 335.875 },
              ID: "56759fd6-acaa-445e-ab43-144db705646e",
              Dirty: true,
              Type: "merge",
              Inputs: [
                {
                  ID: "56759fd6-acaa-445e-ab43-144db705646ein[0]",
                  Name: "input-[0]",
                },
                {
                  ID: "56759fd6-acaa-445e-ab43-144db705646ein[1]",
                  Name: "input-[1]",
                },
                {
                  ID: "56759fd6-acaa-445e-ab43-144db705646ein[2]",
                  Name: "input-[2]",
                },
              ],
              Outputs: [
                {
                  ID: "[output-[0] 56759fd6-acaa-445e-ab43-144db705646e]out[0]",
                  Name: "output-[0]",
                  Src: "",
                },
              ],
              Data: { URL: "", base: "", Prompt: "", Seed: "1234" },
            },
            selected: false,
            loading: false,
          },
        },
        position: { x: 374.525, y: 335.875 },
        selected: false,
        positionAbsolute: { x: 374.525, y: 335.875 },
        dragging: false,
      },
      {
        width: 308,
        height: 62,
        id: "fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80",
        type: "source",
        data: {
          nodeState: {
            model: {
              Position: { x: 645.525, y: 160.875 },
              ID: "fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80",
              Dirty: true,
              Type: "source",
              Inputs: [],
              Outputs: [
                {
                  ID: "[output-[0] fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80]out[0]",
                  Name: "output-[0]",
                  Src: "",
                },
              ],
              Data: {
                URL: "/dummyshort.mp3",
                base: "generate",
                Prompt: "",
                Seed: "1234",
              },
            },
            selected: false,
            loading: false,
          },
        },
        position: { x: 645.525, y: 160.875 },
        selected: false,
        positionAbsolute: { x: 645.525, y: 160.875 },
        dragging: false,
      },
      {
        width: 358,
        height: 62,
        id: "0d14018f-6a36-4bda-96dd-1244b6853c91",
        type: "split",
        data: {
          nodeState: {
            model: {
              Position: { x: 310.525, y: 463.875 },
              ID: "0d14018f-6a36-4bda-96dd-1244b6853c91",
              Dirty: true,
              Type: "split",
              Inputs: [
                {
                  ID: "0d14018f-6a36-4bda-96dd-1244b6853c91in[0]",
                  Name: "input-[0]",
                },
              ],
              Outputs: [
                {
                  ID: "[drums 0d14018f-6a36-4bda-96dd-1244b6853c91]out[0]",
                  Name: "drums",
                  Src: "",
                },
                {
                  ID: "[piano 0d14018f-6a36-4bda-96dd-1244b6853c91]out[1]",
                  Name: "piano",
                  Src: "",
                },
                {
                  ID: "[vocals 0d14018f-6a36-4bda-96dd-1244b6853c91]out[2]",
                  Name: "vocals",
                  Src: "",
                },
                {
                  ID: "[guitar 0d14018f-6a36-4bda-96dd-1244b6853c91]out[3]",
                  Name: "guitar",
                  Src: "",
                },
                {
                  ID: "[other 0d14018f-6a36-4bda-96dd-1244b6853c91]out[4]",
                  Name: "other",
                  Src: "",
                },
                {
                  ID: "[bass 0d14018f-6a36-4bda-96dd-1244b6853c91]out[5]",
                  Name: "bass",
                  Src: "",
                },
              ],
              Data: { URL: "", base: "", Prompt: "", Seed: "1234" },
            },
            selected: false,
            loading: false,
          },
        },
        position: { x: 310.525, y: 463.875 },
        selected: false,
        positionAbsolute: { x: 310.525, y: 463.875 },
        dragging: false,
      },
      {
        width: 308,
        height: 62,
        id: "c36e74b7-f082-4448-82c2-e479bbc81211",
        type: "signal",
        data: {
          nodeState: {
            model: {
              Position: { x: 260, y: 586 },
              ID: "c36e74b7-f082-4448-82c2-e479bbc81211",
              Dirty: true,
              Type: "signal",
              Inputs: [
                {
                  ID: "c36e74b7-f082-4448-82c2-e479bbc81211in[0]",
                  Name: "input-[0]",
                },
              ],
              Outputs: [
                {
                  ID: "[output-[0] c36e74b7-f082-4448-82c2-e479bbc81211]out[0]",
                  Name: "output-[0]",
                  Src: "",
                },
              ],
              Data: { URL: "", base: "", Prompt: "", Seed: "1234" },
            },
            selected: true,
            loading: true,
          },
        },
        position: { x: 260, y: 586 },
        selected: true,
        positionAbsolute: { x: 260, y: 586 },
        dragging: false,
      },
    ],
    edges: [
      {
        id: "reactflow__edge-15622f82-b7bb-441b-a59f-d20b7d7078d9[output-[0] 15622f82-b7bb-441b-a59f-d20b7d7078d9]out[0]-56759fd6-acaa-445e-ab43-144db705646e56759fd6-acaa-445e-ab43-144db705646ein[0]",
        source: "15622f82-b7bb-441b-a59f-d20b7d7078d9",
        target: "56759fd6-acaa-445e-ab43-144db705646e",
        sourceHandle: "[output-[0] 15622f82-b7bb-441b-a59f-d20b7d7078d9]out[0]",
        targetHandle: "56759fd6-acaa-445e-ab43-144db705646ein[0]",
      },
      {
        id: "reactflow__edge-fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80[output-[0] fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80]out[0]-56759fd6-acaa-445e-ab43-144db705646e56759fd6-acaa-445e-ab43-144db705646ein[1]",
        source: "fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80",
        target: "56759fd6-acaa-445e-ab43-144db705646e",
        sourceHandle: "[output-[0] fd2b51e0-17c9-4ef6-a9d9-7ed3baa4ae80]out[0]",
        targetHandle: "56759fd6-acaa-445e-ab43-144db705646ein[1]",
      },
      {
        id: "reactflow__edge-56759fd6-acaa-445e-ab43-144db705646e[output-[0] 56759fd6-acaa-445e-ab43-144db705646e]out[0]-0d14018f-6a36-4bda-96dd-1244b6853c910d14018f-6a36-4bda-96dd-1244b6853c91in[0]",
        source: "56759fd6-acaa-445e-ab43-144db705646e",
        target: "0d14018f-6a36-4bda-96dd-1244b6853c91",
        sourceHandle: "[output-[0] 56759fd6-acaa-445e-ab43-144db705646e]out[0]",
        targetHandle: "0d14018f-6a36-4bda-96dd-1244b6853c91in[0]",
      },
      {
        id: "reactflow__edge-0d14018f-6a36-4bda-96dd-1244b6853c91[piano 0d14018f-6a36-4bda-96dd-1244b6853c91]out[1]-c36e74b7-f082-4448-82c2-e479bbc81211c36e74b7-f082-4448-82c2-e479bbc81211in[0]",
        source: "0d14018f-6a36-4bda-96dd-1244b6853c91",
        target: "c36e74b7-f082-4448-82c2-e479bbc81211",
        sourceHandle: "[piano 0d14018f-6a36-4bda-96dd-1244b6853c91]out[1]",
        targetHandle: "c36e74b7-f082-4448-82c2-e479bbc81211in[0]",
      },
    ],
    viewport: { x: 0, y: 0, zoom: 1 },
  };

  return (
    <ApplicationFrame>
      <FlowWrapper graph={dummyData} />
      {/*This content is outside the Flow window*/}
    </ApplicationFrame>
  );
}
