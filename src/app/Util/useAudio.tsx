// useAudio.tsx
import { useState, useEffect, useContext } from "react";
import { NodeContext, NodeState } from "../Node/NodeState";
import { SendGraphForCompute, getSoundFromNodeID } from "./ComputeAPI";
import { Graph, GraphContext, useGraph } from "../Node/GraphContext";
import { transformtoTypescriptTypes } from "./modelTransformation";

/* The purpose of this hook is to provide a way to play audio in the application.
The way to use it is to call the useAudio hook in the component that needs to play audio.
The useAudio hook returns an object with the following properties:
    - audioComputed: boolean
    - currentTime: number
    - duration: number
    - isPlaying: boolean
    - isComputing: boolean
    - handlePlayPause: () => void
*/

const standardAudioUrl =
  "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav";
  
const useAudio = (source?: string) => {
  // source is the url of the audio file to be played, later delete the question mark and make it required
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [audioComputed, setAudioComputed] = useState<boolean|undefined>(useContext(NodeContext)?.dirty);
  const [graph, setGraph] = useState<Graph>(useContext(GraphContext))
  const [node, setNode] = useState<NodeState | undefined>(useContext(NodeContext))
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  // compute progress as a percentage based on currentTime and duration
  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  const fetchAudio = async () => {
    setIsComputing(true);
    try {
      //TODO get audioURL with while loop until node with nodeID is found in computed nodes
      await SendGraphForCompute(transformtoTypescriptTypes(graph))
      let audioUrl: string
    
      if (node && node.id) {      
      audioUrl = await getSoundFromNodeID(node.id, graph);
      
    } else {
        audioUrl = standardAudioUrl;
    }      // const audioUrl = standardAudioUrl
      const audio = new Audio(audioUrl);

      audio.onloadedmetadata = () => {
        setDuration(audio.duration);
        setAudio(audio);
        setAudioComputed(true);
        setIsComputing(false);
      };

      audio.onended = () => {
        setCurrentTime(0);
        setIsPlaying(false);
      };
    } catch (error) {
      console.error(error);
      setIsComputing(false);
    }
  };

  const handlePlayPause = async () => {
    // This function is called when the user clicks the play/pause button
    if (isComputing) {
      return;
    }
    if (!audioComputed) {
      fetchAudio();
    }
    if (audio && audioComputed) {
      if (audio.paused) {
        audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    }
  };


  useEffect(() => {
    // This effect is called when the audio is playing and updates the currentTime state
    let intervalId: number | undefined;

    const updateCurrentTime = () => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime);
      }
    };

    intervalId = window.setInterval(updateCurrentTime, 10);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [audio]);

  useEffect(() => {
    // When the component unmounts, pause the audio and reset the currentTime
    return () => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0; // reset the audio time
      }
    };
  }, [audio]);

  return {
    src: source ? source : standardAudioUrl, // change source to src to match with AudioPlayerProps
    isComputing,
    audioComputed,
    playing: isPlaying, // change isPlaying to playing to match with AudioPlayerProps
    onPlayPause: handlePlayPause, // change handlePlayPause to onPlayPause to match with AudioPlayerProps
    currentTime,
    duration,
    progress,
  };
};

export default useAudio;
