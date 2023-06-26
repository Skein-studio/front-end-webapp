import { useState } from "react";
import CreateSongView from "../View/CreateSongView";

export default function CreateSongPresenter() {
  const [instruments, setInstruments] = useState<string[]>([]);
  const [genre, setGenre] = useState<string>("");
  const [audioFile, setAudioFile] = useState<File | null>(null);

  function handleFileChange(file: File | null) {
    setAudioFile(file);
  }

  function handleToggleInstrument(instrument: string) {
    setInstruments((prevInstruments) =>
      prevInstruments.includes(instrument)
        ? prevInstruments.filter((i) => i !== instrument)
        : [...prevInstruments, instrument]
    );
  }

  function handleGenreChange(newGenre: string) {
    setGenre(newGenre);
  }

  return (
    <CreateSongView
      instruments={instruments}
      onToggleInstrument={handleToggleInstrument}
      onGenreChange={handleGenreChange}
      onFileChange={handleFileChange}
      audioFile={audioFile}
      genre={genre}
    />
  );
}
