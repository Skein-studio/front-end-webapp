//GenerateAudio.tsx

import React, { useContext } from "react";
import { BlankSpace, Button, Container, FieldTitle, StyledInput } from "../BaseStyles";
import { NodeContext } from "@/app/Node/NodeState";
import { useGraph } from "@/app/Node/GraphContext";
import useAudio from "@/app/Util/AudioPlayback/useAudio";
import AudioPlayer from "../AudioPlayback/AudioPlayer";
import { SourceTypeModel } from "../../Node/Model/modelDatatypes";

/**
 * The view for the GenerateAudio component, which is used to generate audio for the Source node.
 * @returns A Container component, which contains a Button and an AudioPlayer.
 * */
function GenerateAudio() {
  const nodeContext = useContext(NodeContext);
  const node = nodeContext.nodeState;
  const nodeData = node.model.Data as SourceTypeModel;
  const audioData = nodeData.URL;
  const graph = useGraph();
  const audioState = useAudio(audioData);
  const [prompt, setPrompt] = React.useState(nodeData.Prompt);

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
    nodeData.Prompt = event.target.value;
  };

  const handleClick = async () => {
    // This is where we will call our backend service to generate the audio
    // For now, we'll use a dummy audio file
    node.model.Dirty = true;
    nodeData.URL = "/dummyshort.mp3";
    graph.refresh();
  };

  return (
    <Container>
        <FieldTitle>
          🤖
          <p>
           Prompt
          </p>
        </FieldTitle>
        <StyledInput
          type="text"
          value={prompt}
          onChange={handlePromptChange}
        />
        <BlankSpace width={5} height={10} />
      <Button onClick={handleClick}>Generate</Button>
      {audioData && (
        <AudioPlayer audioState={audioState} audioComputed={true} error="" />
      )}
    </Container>
  );
}

export default GenerateAudio;
