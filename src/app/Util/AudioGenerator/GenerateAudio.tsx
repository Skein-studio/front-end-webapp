//GenerateAudio.tsx
import React, { useContext, useState } from "react";
import {
  BlankSpace,
  Button,
  Container,
  FieldTitle,
  StyledInput,
  StyledSelect,
  FieldDescription,
} from "../BaseStyles";
import { NodeContext } from "@/app/Node/NodeState";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { useUpdateNodeInternals } from "reactflow";

function GenerateAudio() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData = node.model.Data;
  const audioData = nodeData.URL;
  const updateInternals = useUpdateNodeInternals();
  const audioState = useAudio(audioData);
  const [prompt, setPrompt] = useState(nodeData.Prompt);

  // State for Genre, BPM and Mood
  const [genre, setGenre] = useState<string>(nodeData.genre);
  const [bpm, setBpm] = useState<number>(nodeData.bpm);
  const [mood, setMood] = useState<string>(nodeData.mood);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
    nodeData.Prompt = event.target.value;
    node.model.Dirty = true;
  };

  const handleGenreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGenre(event.target.value);
    nodeData.genre = event.target.value;
    node.model.Dirty = true;
  };

  const handleBpmChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBpm(Number(event.target.value));
    nodeData.bpm = Number(event.target.value);
    node.model.Dirty = true;
  };

  const handleMoodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMood(event.target.value);
    nodeData.mood = event.target.value;
    node.model.Dirty = true;
  };

  const handleClick = async () => {
    // This is where we will call our backend service to generate the audio
    // For now, we'll use a dummy audio file
    node.model.Dirty = true;
    nodeData.URL = "/dummyshort.mp3";
    updateInternals(node.model.ID);
  };

  return (
    <Container>
      <FieldTitle>Prompt</FieldTitle>
      <StyledInput type="text" value={prompt} onChange={handlePromptChange} />
      <BlankSpace width={5} height={10} />

      {/* Genre Radio Buttons */}
      <FieldTitle>Genres</FieldTitle>
      <FieldDescription>
        <StyledSelect
          value={genre}
          onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
            handleGenreChange(e)
          }
        >
          {[
            "Classical",
            "Jazz",
            "Blues",
            "Ambient",
            "Electronic",
            "Post-Rock",
            "Lo-fi",
            "Progressive Rock",
            "Orchestral",
            "Funk",
            "Flamenco",
            "Reggae",
            "Techno",
            "Trance",
            "Drum and Bass",
            "Bluegrass",
            "Celtic",
            "Raggae",
            "Phonk",
            "Smooth Jazz",
          ].map((g) => (
            <option key={g} value={g}>
              {g}
            </option>
          ))}
        </StyledSelect>
      </FieldDescription>

      {/* BPM Slider */}
      <FieldTitle>BPM</FieldTitle>
      <div>
        <input
          type="range"
          min="60"
          max="150"
          step="10"
          value={bpm}
          onChange={handleBpmChange}
        />
        <FieldDescription>{bpm}</FieldDescription>{" "}
        {/* Display the value of the slider */}
      </div>

      {/* Mood Radio Buttons */}
      <FieldTitle>Mood</FieldTitle>
      {["None", "Chill", "Aggressive"].map((m) => (
        <FieldDescription key={m}>
          <input
            type="radio"
            value={m}
            checked={mood === m}
            onChange={handleMoodChange}
          />
          {m}
        </FieldDescription>
      ))}
      <BlankSpace height={5} width={5} />
      <Button onClick={handleClick}>Generate</Button>
      {audioData && (
        <AudioPlayer audioState={audioState} audioComputed={true} error="" />
      )}
    </Container>
  );
}

export default GenerateAudio;
