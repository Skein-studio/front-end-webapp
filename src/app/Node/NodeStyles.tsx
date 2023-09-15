import styled from "styled-components";
import { Handle, Position, HandleType } from "reactflow";

const purple = "#b892d4";
const spookwhite = "#d9d9d9";
const NODE_WIDTH = 300;
const NODE_HEIGHT = 50;

interface HandleProps {
  handleType: HandleType;
  position: Position;
  id: string;
}

function StyledHandle(props: HandleProps) {
  return (
    <Handle
      type={props.handleType}
      position={props.position}
      id={props.id}
      style={{
        background: "#757574",
        height: "20px",
        width: "20px",
        overflow: "hidden",
        transform:
          props.handleType === "source"
            ? "translateY(50%) translateX(-50%)"
            : "translateY(-50%) translateX(-50%)",
        borderRadius:
          props.handleType === "target" ? "100% 100% 0% 0%" : "0 0 90% 90%",
        zIndex: "-1", // couldn't get them to be nice semicircles
      }}
    />
  );
}

const NodeTitle = styled.p`
  position: absolute;
  top: -4px;
  left: 50px;
  font-family: verdana;
  font-size: 18px;
  color: ${purple};
`;

const IconContainer = styled.div`
  position: absolute;
  left: 10px;
  top: 10px;
  width: 32px;
  height: 32px;
`;
const Icon = styled.img`
  height: 100%;
  width: 100%;
`;

interface IconProps {
  src: string;
}

const NodeIcon = (props: IconProps) => {
  return (
    <IconContainer>
      <Icon src={props.src}></Icon>
    </IconContainer>
  );
};

const ToggleButton = styled.button`
  position: absolute; // Change from absolute to relative
  top: 10px;
  left: 10px;
`;

interface NodeProps {
  flexdir?: string;
  widthextension: number;
  selected: boolean;
}

const NodeSmall = styled.div<NodeProps>`
  display: flex;
  font-family: verdana;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  width: ${(props) => props.widthextension + NODE_WIDTH}px;
  height: 50px;
  margin: 2px 0; // Apply margin only on top and bottom
  padding: 4px;
  background-color: #404040;
  border-radius: 10px;
  box-shadow: ${(props) =>
    props.selected
      ? "0px 4px 8px rgba(100, 0, 255, 1)"
      : "0px 2px 8px rgba(100, 0, 255, 0)"};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: ${(props) =>
      props.selected
        ? "0px 4px 8px rgba(100, 0, 255, 1)"
        : "0px 2px 8px rgba(100, 0, 255, 1)"};
  }
`;

const HandleLabel = styled.div`
  font-family: verdana;
  font-size: 0.2em;
  position: relative;
  text-align: center;
  color: ${purple};
`;

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  align-items: center;
  width: 100%;
  padding: 10px 0;
`;

export {
  ToggleButton,
  NodeSmall,
  NodeTitle,
  HandleLabel,
  purple,
  spookwhite,
  NodeIcon,
  RowContainer,
  StyledHandle,
  NODE_WIDTH,
  NODE_HEIGHT,
};
