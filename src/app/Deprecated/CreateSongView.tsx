import React, { useState } from "react";
import RecordPresenter from "./RecordPresenter";
import { OuterBox, Text, Button, InnerBox } from "../Util/BaseStyles";
import InstrumentToggle from "./InstrumentToggle";
import GenreDropdown from "../View/GenreDropdown";

interface Props {
  instruments: string[];
  onToggleInstrument: (instrument: string) => void;
  onGenreChange: (genre: string) => void;
  onFileChange: (file: File | null) => void;
  audioFile: File | null;
  genre: string;
}

export default function CreateSongView(props: Props) {
  const {
    instruments,
    onToggleInstrument,
    onGenreChange,
    onFileChange,
    audioFile,
    genre,
  } = props; // later add a callback for sending the prompt up to the CreateSongPresenter which will handle it and send to back-end along with audio filex
  const [showPrompt, setShowPrompt] = useState(false);

  const prompt = `A ${genre}-themed song with the following instruments:\n ${instruments.join(
    ", "
  )}`;

  function handleCreateButtonClick() {
    if (audioFile) { // later update this to have more reqs like having at least one instrument as well as a genre chosen
      setShowPrompt(true);
    }
  }

  return (
    <OuterBox>
      <InstrumentToggle
        instruments={instruments}
        onToggleInstrument={onToggleInstrument}
      />
      <GenreDropdown onChange={onGenreChange} />
      <RecordPresenter onFileChange={onFileChange} />
      <InnerBox>
        <Button onClick={handleCreateButtonClick}>Create</Button>
      </InnerBox>
      {showPrompt && (
        <InnerBox>
          <Text>Resulting prompt:</Text>
          <Text> {prompt}</Text>
        </InnerBox>
      )}
    </OuterBox>
  );
}
