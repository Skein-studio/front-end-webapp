// OpenSignalView.tsx

import { Container, Button } from "@/app/Util/BaseStyles";
import styled from "styled-components";
import StarImg from "../Signal/stars.svg";

interface Props {
  setPrompt(value: string): void;
  prompt: string;
  exportFile(): void;
}

export default function OpenSignalView(props: Props) {
  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setPrompt(event.target.value);
  };

  function handleExport() {
    props.exportFile();
  }

  return (
    <Container>
      <Container>
        <FieldTitle>
          <img src={StarImg} alt="Star" />
          <p>Style Edit</p>
        </FieldTitle>
        <StyledInput
          type="text"
          value={props.prompt}
          onChange={handleInstrumentChange}
        />
      </Container>
      <Button onClick={handleExport}>Export</Button>
    </Container>
  );
}

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

const Dropdown = styled.div`
  width: 100%;

  & > select {
    width: 100%;
    padding: 10px;
    border: none;
    border-radius: 10px;
    background-color: #f8f8f8; // Adjust as needed
  }
`;
