import styled from "styled-components";

const purple = "#b892d4";
const spookwhite = "#d9d9d9";

const NodeTitle = styled.p`
  position: absolute;
  top:0px;
  left: 50px;
  font-family:verdana;
  font-size: 16px;
  color: ${purple};
`;

const IconContainer = styled.div`
position: absolute;
left: 10px;
top: 10px;
width:32px;
height: 32px;
`
const Icon = styled.img`
height: 100%;
width: 100%;
`

interface IconProps{
  src:string, 
}

const NodeIcon = (
  props:IconProps,
) => {
  return (<IconContainer>
    <Icon src={props.src}></Icon>
  </IconContainer>)
}

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
  widthextension:number;
}

const NodeSmall = styled.div<NodeProps>`
  display: flex;
  font-family:verdana;
  flex-direction: ${(props) => (props.flexdir ? props.flexdir : "column")};
  justify-content: center;
  align-items: center;
  align-self: center;
  width: ${(props) => (props.widthextension + 300)}px;
  height: 75px;
  margin: 2px 0; // Apply margin only on top and bottom
  padding: 4px;
  background-color: #404040;
  border-radius: 10px;
  box-shadow: 0px 0px 0px ${purple};
  transition: box-shadow 0.3s ease;

  &:hover {
    box-shadow: 0px 2px 8px rgba(100, 0, 255, 0.625);
  }
`;

export {
  StyledSelect,
  ToggleButton,
  NodeSmall,
  NodeTitle,
  purple,
  spookwhite,
  NodeIcon,
};
