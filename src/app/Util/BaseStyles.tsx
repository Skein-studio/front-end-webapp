import styled from "styled-components";

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
  justify-content: center;
  align-items: center;
  padding: 16px;
  margin: 4px;
  height: 36px; // Set a specific height
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#FFFFFF")};
  color: ${({ color }) => (color ? color : "rgba(0, 123, 255, 0.5)")};
  border: none;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.25);
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    background-color: ${({ hoverBgColor }) =>
      hoverBgColor ? hoverBgColor : "#f8f9fa"};
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : "#0056b3")};
    box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.5);
  }

  &:focus {
    outline: none;
  }
`;

interface BoxProps {
  flexdir?: string;
}

const Container = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: space-around;
  align-items: center;
  width: 90%;
  height: 100%; // Set height to 100%
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

export { Text, Button, Container, BlankSpace };
