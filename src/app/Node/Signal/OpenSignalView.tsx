import { Container } from "@/app/Util/BaseStyles";
import styled from "styled-components";
import StarImg from "../Signal/stars.svg";
import { useState } from "react";

interface Props {
  currentTime: number;
  duration: number;
  audioComputed: boolean;
  onPlayPause: () => void;
  playing: boolean;
  isComputing: boolean;
}

export default function OpenSignalView(props: Props) {
  const [selectedInstrument, setSelectedInstrument] = useState("Solo Guitar");

  const handleInstrumentChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedInstrument(event.target.value);
  };

  return (
    <Container>
      <Container>
        <FieldTitle>
          <img src={StarImg} alt="Star" />
          <span>Style Edit</span>
        </FieldTitle>
        <Dropdown>
          <select value={selectedInstrument} onChange={handleInstrumentChange}>
            <option>Solo Guitar</option>
            <option>Solo Drums</option>
            {/* Add more options as needed */}
          </select>
        </Dropdown>
      </Container>
    </Container>
  );
}

const FieldTitle = styled.div`
  position: relative;
  left: -150px;
  font-size: 14px;
  font-family: verdana;
  display: flex;
  align-items: center;
  margin-bottom: 10px;

  & > img {
    width: 16px;
    height: 16px;
    margin-right: 4px; // Add some space between the image and the text
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
