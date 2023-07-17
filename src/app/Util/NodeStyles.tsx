import styled from "styled-components";

const NodeBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 200px;
`;

const NodeText = styled.p`
  font-size: 18px;
  color: rgba(0, 123, 255, 0.5);
`;

const TopBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px; // Set a specific height
  box-sizing: border-box; /* Add this line */
  border-bottom: 1px solid rgba(0, 123, 255, 0.125);
  padding: 10px;
  margin: 10px;
`;
const StyledSelect = styled.select`
  padding: 5px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ToggleButton = styled.button`
  position: absolute; // Change from absolute to relative
  top: 10px;
  left: 10px;
`;

interface NodeProps {
  flexdir?: string;
}

const NodeSmall = styled.div<NodeProps>`
  position: relative;
  display: flex;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  height: 40px;
  width: 500px;
  margin: 2px 0; // Apply margin only on top and bottom
  padding: 2px;
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.25);
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 2px 8px rgba(0, 123, 255, 0.5);
  }
`;

const NodeLarge = styled(NodeSmall)`
  width: 300px;
  height: 600px;
  padding: 20px;
`;

export {
  NodeBox,
  TopBar,
  StyledSelect,
  ToggleButton,
  NodeLarge,
  NodeSmall,
  NodeText,
};