import { Container } from "@/app/Util/BaseStyles";
import styled from "styled-components";
import StarImg from "../Signal/stars.svg";
import { useState } from "react";

interface Props {
  setPrompt(value: string): void;
  prompt: string;
}

export default function OpenSignalView(props: Props) {
  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.setPrompt(event.target.value);
  };
  console.log(props.prompt);

  return (
    <Container>
      <Container>
        <FieldTitle>
          <img src={StarImg} alt="Star" />
          <p>Style Edit</p>
        </FieldTitle>
        <div>
          <input
            type="text"
            value={props.prompt}
            onChange={handleInstrumentChange}
            defaultValue={props.prompt}
          />
        </div>
      </Container>
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
