//OptionsView.tsx

import React from "react";
import styled from "styled-components";
import { purple } from "../NodeStyles";
import plus from "./plus.svg";
import redo from "./redo.svg";
import trashcan from "./trashcan.svg";
import undo from "./undo.svg";
import enlarge from "./enlarge.svg";

/* This component is the options view for the flow editor. 
It contains the options buttons in the corner of the window */

interface Props {
  toggle: () => void;
  deleteSelectedNode: () => void;
  deleteSelectedEdge: () => void;
  addButtonHandler: () => void;
}

export default function OptionsView(props: Props) {
  
  return (
    <OptionsContainer>
      <OptionsButton img={enlarge} callback={props.toggle} />
      <OptionsButton
        img={trashcan}
        callback={() => {
          props.deleteSelectedNode();
          props.deleteSelectedEdge();
        }}
      />
      <OptionsButton
        img={undo}
        callback={() => {
          console.log("undo");
        }}
      />
      <OptionsButton
        img={redo}
        callback={() => {
          console.log("redo");
        }}
      />
      <OptionsButton
        img={plus}
        callback={() => {
          props.addButtonHandler();
        }}
      />
    </OptionsContainer>
  );
}

interface OptionsButtonProps {
  img: string;
  callback: () => void;
}

export const OptionsButton: React.FC<OptionsButtonProps> = ({ img, callback }) => {
  return (
    <StyledOptionsButton onClick={callback}>
      <NodeIcon src={img} />
    </StyledOptionsButton>
  );
};

const StyledOptionsButton = styled.button`
  height: 32px;
  width: 32px;
  border-radius: 10px;
  border: 1px solid black;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #ffffff;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
  box-shadow: 0px 1px 0px ${purple};
  cursor: pointer;
  z-index: 1;

  &:hover {
    background-color: #757575;
    box-shadow: 0px 0px 0px ${purple};
  }

  &:active {
    background-color: #757575;
    box-shadow: 0px 0px 0px ${purple};
  }

  &:focus {
    outline: none;
  }
`;

const Icon = styled.img`
  height: 100%;
  width: 100%;
`;

interface IconProps {
  src: string;
}

const NodeIcon = (props: IconProps) => {
  return <Icon src={props.src}></Icon>;
};

const OptionsContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 200px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 200px;
  z-index: 2;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
`;
