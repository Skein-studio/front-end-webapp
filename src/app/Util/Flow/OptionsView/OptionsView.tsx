//OptionsView.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { purple } from "../../../Node/NodeStyles";
import plus from "./plus.svg";
import redo from "./redo.svg";
import trashcan from "./trashcan.svg";
import undo from "./undo.svg";
import edit from "./edit.svg";
import load from "./load.svg";

interface Props {
  toggle: () => void;
  deleteSelectedNode: () => void;
  deleteSelectedEdge: () => void;
  addButtonHandler: () => void;
  loadFromRootModel: ()=>void;
}

const Tooltip = styled.div`
  position: absolute;
  top: -10px;
  width: fit-content;
  background-color: #333;
  color: white;
  padding: 5px;
  border-radius: 5px;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 10;
  &.visible {
    opacity: 1;
  }
`;

interface OptionsButtonProps {
  img: string;
  callback: () => void;
  tooltipText: string;
}

/**
 * A button for the OptionsView.
 * @param img The image to be displayed on the button.
 * @param callback The function to be called when the button is clicked.
 * @param tooltipText The text to be displayed in the tooltip.
 * @returns A button component.
 * */
export const OptionsButton: React.FC<OptionsButtonProps> = ({
  img,
  callback,
  tooltipText,
}) => {
  const [isHovered, setHovered] = useState(false);

  return (
    <StyledOptionsButton
      onClick={callback}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Tooltip className={isHovered ? "visible" : ""}>{tooltipText}</Tooltip>
      <NodeIcon src={img} />
    </StyledOptionsButton>
  );
};

/**
 * The view for the OptionsView.
 * @returns A OptionsContainer component.
 * */
export default function OptionsView(props: Props) {
  return (
    <OptionsContainer>
      <OptionsButton img={edit} callback={props.toggle} tooltipText="Edit" />
      <OptionsButton
        img={plus}
        callback={() => props.addButtonHandler()}
        tooltipText="Add"
      />
      <OptionsButton
        img={trashcan}
        callback={() => {
          props.deleteSelectedNode();
          props.deleteSelectedEdge();
        }}
        tooltipText="Delete"
      />
      <OptionsButton
        img={undo}
        callback={() => console.log("undo")}
        tooltipText="Undo"
      />
      <OptionsButton
        img={redo}
        callback={() => console.log("redo")}
        tooltipText="Redo"
      />

      <OptionsButton
        img={load}
        callback={() => props.loadFromRootModel()}
        tooltipText="Load"
      />
      
    </OptionsContainer>
  );
}

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
  right: 0;
  left: 0;
  margin: auto;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  width: 250px;
  z-index: 2;
  padding: 10px;
  background-color: white;
  border-radius: 10px;
  border: 1px solid black;
  @media (max-width: 768px) {
    right: 0;
    left: 0;
    bottom: 150px; // adjust this for mobile devices
    margin: auto;
  }
`;
