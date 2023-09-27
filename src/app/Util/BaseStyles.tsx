import styled from "styled-components";
import { purple, spookwhite } from "../Node/NodeStyles";

interface TextProps {
  size?: number;
  color?: string;
  weight?: string;
  align?: string;
  nomargin?: boolean;
  hovercolor?: string;
}

const Text = styled.p<TextProps>`
  font-size: ${({ size }) => (size ? `${size}px` : "20px")};
  color: ${({ color }) => (color ? color : "#333")};
  line-height: 1.7;
  font-family: "Helvetica", "Arial", sans-serif;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  text-align: ${({ align }) => (align ? align : "justify")};
  margin: 2px;
  margin: ${({ nomargin: noMargin }) => (noMargin ? "0" : "0 0 20px 0")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ hovercolor: hoverColor }) =>
      hoverColor ? hoverColor : "#007BFF"};
  }
`;

interface ButtonProps {
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

/**
 * A standard button, can be used for essentially anything.
 * @param props - The props for the button.
 * @returns A styled button.
 * */
const Button = styled.button<ButtonProps>`
  display: flex;
  font-family: verdana;
  justify-content: center;
  align-items: center;
  padding: 4px;
  height: fit-content; // Set a specific height
  background-color: ${({ bgColor, disabled }) =>
    disabled ? "#B0B0B0" : bgColor ? bgColor : "#404040"};
  color: ${({ color, disabled }) =>
    disabled ? "grey" : color ? color : purple};
  border: none;
  border-radius: 10px;
  box-shadow: 0px 1px 0px ${purple};
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 12px;
  text-align: center;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ hoverBgColor, disabled }) =>
      disabled ? "#B0B0B0" : hoverBgColor ? hoverBgColor : "#757575"};
    color: ${({ hoverColor, disabled }) =>
      disabled ? "#A0A0A0" : hoverColor ? hoverColor : "#404040"};
    box-shadow: ${({ disabled }) =>
      disabled ? "0px 1px 0px #A0A0A0" : "0px 0px 0px " + purple};
  }

  &:focus {
    outline: none;
  }
`;

/**
 * An input name for the graph name.
 * @param props - The props for the input field.
 * @returns A styled input field.
 * */
const GraphNameInput = styled.input`
  z-index: 1; /* Add a higher z-index value */
  position: absolute;
  top: 40px;
  left: 40px;
  font-size: 18px;
  width: 250px;
  padding: 8px;
  font-family: verdana;
  border: 1px solid ${spookwhite};
  border-radius: 10px;
`;

interface OuterBoxProps {
  flexdir?: string;
  width?: string;
  height?: string;
  shadow?: boolean;
}

/**
 * This is the outermost container that contains the ReactFlow View
 * @param props - The props for the container.
 * @returns A styled div.
 * */
const OuterBox = styled.div<OuterBoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: space-around;
  align-items: center;
  align-self: center;
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) =>
    props.height ? props.height : "100%"}; // Set height to 100%
  box-shadow: ${(props) =>
    props.shadow ? "0px 2px 8px rgba(0, 0, 0, 0.25)" : "0px"};
  border-radius: 10px;
  border: 1px solid black;
  padding: 4px;
  margin: 4px;
  overflow: hidden;
`;

interface BoxProps {
  flexdir?: string;
  width?: string;
  height?: string;
  shadow?: boolean;
  backgroundColor?: string;
}

/**
 * A standard container, can be used for essentially anything.
 * @param props - The props for the container.
 * @returns A styled div.
 * */
const Container = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: space-around;
  align-items: center;
  align-self: center;
  background-color: ${(props) => props.backgroundColor};
  width: ${(props) => (props.width ? props.width : "90%")};
  height: ${(props) =>
    props.height ? props.height : "100%"}; // Set height to 100%
  box-shadow: ${(props) =>
    props.shadow ? "0px 2px 8px rgba(0, 0, 0, 0.25)" : "0px"};
  padding: 4px;
  margin: 4px;
`;
interface BlankProps {
  flexdir?: string;
  width: number;
  height: number;
}

/**
 * Just a blank space to use as a spacer between elements.
 * @param props - The props for the blank space.
 * @returns A styled div.
 * */
const BlankSpace = styled.div<BlankProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  padding: 4px;
  margin: 4px;
`;

const StyledInput = styled.input`
  width: 100%;
  font-family: verdana;
  margin: 0;
  font-size: 12px;
  padding: 10px;
  border: none;
  border-radius: 10px;
  background-color: lightgrey; // Adjust as needed
`;

const FieldTitle = styled.div`
  left: 0;
  font-size: 14px;
  font-family: verdana;
  display: flex;
  align-items: center;
  margin-right: auto; // pushes the element to the left
  margin-bottom: 10px;

  & > img {
    width: 16px;
    height: 16px;
    margin-right: 4px;
  }
`;

export { Text, Button, Container, BlankSpace, OuterBox, GraphNameInput, StyledInput, FieldTitle };
