import React, { useState } from "react";
import RecordPresenter from "../Presenter/RecordPresenter";
import { OuterBox, Text, Button, InnerBox } from "../Util/BaseStyles";
import InstrumentToggle from "./InstrumentToggle";
import GenreDropdown from "./GenreDropdown";

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
  } = props;
  const [showPrompt, setShowPrompt] = useState(false);

  const prompt = `A ${genre}-themed song with the following instruments:\n ${instruments.join(
    ", "
  )}`;

  function handleCreateButtonClick() {
    if (audioFile) {
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
