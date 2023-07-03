import styled from "styled-components";

const NodeBox = styled.div`
  display:flex;
  flex-direction:column;
  background-color: #ffffff;
  border-radius: 8px;
  box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
  padding: 16px;
  width: 200px;
`;


const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box; /* Add this line */
  border-bottom: 1px solid black;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledSelect = styled.select`
  padding: 5px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ToggleButton = styled.button`
  position: absolute;
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
  width: 150px;
  height: 150px;
  margin: 2px auto;
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
  width: 500px;
  height: 500px;
  padding: 20px;
`;


export {NodeBox, TopBar, StyledSelect, ToggleButton, NodeLarge, NodeSmall};