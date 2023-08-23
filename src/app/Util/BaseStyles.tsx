import styled from "styled-components";
import { purple, spookwhite } from "./Flow/NodeStyles";

interface TextProps {
  size?: number;
  color?: string;
  weight?: string;
  align?: string;
  noMargin?: boolean;
  hoverColor?: string;
}

const Text = styled.p<TextProps>`
  font-size: ${({ size }) => (size ? `${size}px` : "20px")};
  color: ${({ color }) => (color ? color : "#333")};
  line-height: 1.7;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: ${({ weight }) => (weight ? weight : "400")};
  text-align: ${({ align }) => (align ? align : "justify")};
  margin: 2px;
  margin: ${({ noMargin }) => (noMargin ? "0" : "0 0 20px 0")};
  transition: color 0.3s ease;

  &:hover {
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : "#007BFF")};
  }
`;

interface ButtonProps {
  bgColor?: string;
  color?: string;
  hoverBgColor?: string;
  hoverColor?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

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

// Usage
<Button disabled={true}>My Button</Button>;

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
  border: 4px solid black;
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
export { Text, Button, Container, BlankSpace, OuterBox, GraphNameInput };
