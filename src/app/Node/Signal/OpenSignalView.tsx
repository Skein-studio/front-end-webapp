// OpenSignalView.tsx

import {
  Container,
  Button,
  Text,
  StyledInput,
  FieldTitle,
} from "@/app/Util/BaseStyles";
import styled from "styled-components";
import StarImg from "../Signal/stars.svg";
import { NodeContext } from "../NodeState";
import { useContext } from "react";

interface Props {
  setPrompt(value: string): void;
  prompt: string;
  exportFile(): void;
}

/**
 * The view for the opened Signal node, where signal can be edited or exported.
 * @returns A Container component.
 * */
export default function OpenSignalView(props: Props) {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;

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
      <Button onClick={handleExport} disabled={node.model.Dirty}>
        Export
      </Button>
      {node.model.Dirty ? (
        <Text size={12} hovercolor="solid black">
          You must fetch the node before exporting.
        </Text>
      ) : (
        <></>
      )}
    </Container>
  );
}

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
