// useAudio.tsx
import { useState, useEffect } from "react";

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

const useAudio = (source?:string) => { // source is the url of the audio file to be played, later delete the question mark and make it required
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [audioComputed, setAudioComputed] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); 

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const fetchAudio = async () => {
    setIsComputing(true);
    await new Promise(resolve => setTimeout(resolve, 500));

    const audioUrl = source ? source : "https://www2.cs.uic.edu/~i101/SoundFiles/CantinaBand3.wav"; //If no source is provided, use this default source
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
    }
    audio.onerror = () => {
      console.error("Something went wrong while fetching audio.");
      setIsComputing(false);
    };
  };

  const handlePlayPause = async () => { // This function is called when the user clicks the play/pause button
    if (isComputing) {
      return;
    }
    if (!audioComputed) {
      await fetchAudio();
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

  useEffect(() => {  // This effect is called when the audio is playing and updates the currentTime state
    let intervalId: number | undefined;

    const updateCurrentTime = () => {
      if (audio && !audio.paused) {
        setCurrentTime(audio.currentTime);
      }
    };

    intervalId = window.setInterval(updateCurrentTime, 1000);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [audio]);

  return {
    isComputing,
    audioComputed,
    currentTime,
    duration,
    isPlaying,
    handlePlayPause
  };
};

export default useAudio;
