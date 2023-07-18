//index.tsx

import React from "react";
import ReactFlow from "reactflow";
import "reactflow/dist/style.css";
import { Container } from "@/app/Util/BaseStyles";
import Canvas from "@/app/Util/Flow/Flow";
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
  return (
    <ApplicationFrame>
      <Canvas></Canvas>

      <Container>
        This content is outside the Flow window
        {/*<MyFlowDiagram></MyFlowDiagram>*/}
      </Container>
    </ApplicationFrame>
  );
}
