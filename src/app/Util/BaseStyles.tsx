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
  padding: 10px 20px;
  margin: 4px;
  background-color: ${({ bgColor }) => (bgColor ? bgColor : "#FFFFFF")};
  color: ${({ color }) => (color ? color : "#007BFF")};
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

const OuterBox = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  width: 100%;
  height: 100%;
  margin: 10px auto;
  padding: 4px;
  background-color: #ffffff;
  border-radius: 4px;
  box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.25);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.5);
  }
`;

interface BoxProps {
  flexdir?: string;
}

const Container = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 4px;
  margin: 4px;
`;

const InnerBox = styled.div<BoxProps>`
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 80%; // slightly smaller than OuterBox to create a nested appearance
  height: 80%; // slightly smaller than OuterBox to create a nested appearance
  padding: 4px;
  background-color: #f8f9fa; // slightly darker than OuterBox to create a contrast
  border-radius: 4px;
  box-shadow: 0px 2px 4px rgba(0, 123, 255, 0.1); // slightly softer shadow than OuterBox
  transition: box-shadow 0.3s ease;
  margin: 2px;
  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.3); // slightly softer hover effect than OuterBox
  }
`;

export { OuterBox, Text, Button, InnerBox, Container };
