//index.tsx

import React from "react";
import "reactflow/dist/style.css";
import Canvas from "@/app/Util/Flow/FlowPresenter";
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
      {/*This content is outside the Flow window*/}
    </ApplicationFrame>
  );
}
