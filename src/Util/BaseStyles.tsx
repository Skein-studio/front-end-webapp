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
}

const Button = styled.button<ButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#007BFF")};
  color: ${({ color }) => (color ? color : "#FFF")};
  border: none;
  border-radius: 4px;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 16px;
  font-weight: 500;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;

  &:hover {
    background-color: ${({ hoverBgColor }) =>
      hoverBgColor ? hoverBgColor : "#0056b3"};
    color: ${({ hoverColor }) => (hoverColor ? hoverColor : "#FFF")};
  }

  &:focus {
    outline: none;
  }
`;

const OuterBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80%;
  height: 200px;
  margin: 10px auto;
  background-color: #f5f5f5;
  border-radius: 10px;
  box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.19), 0px 6px 6px rgba(0, 0, 0, 0.23);
`;

export { OuterBox, Text, Button };
