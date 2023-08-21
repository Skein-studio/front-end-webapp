//useAudio.tsx
import { useState, useEffect, useRef, useReducer } from "react";

export type AudioState = {
  src: string;
  playing: boolean;
  onPlayPause: () => void;
  progress: number;
  duration: number;
};

const useAudio = (source: string) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const currentTimeRef = useRef(0); // Use ref instead of state for currentTime
  const audioRef = useRef(new Audio(source));
  const [, forceUpdate] = useReducer(x => x + 1, 0); // Function to force a re-render

  useEffect(() => {
    const audio = audioRef.current;

    audio.src = source; // Update the audio source

    const handleLoadedData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      currentTimeRef.current = audio.currentTime;
      forceUpdate(); // Manually trigger a re-render
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener('loadeddata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      // Cleanup
      audio.pause();
      audio.currentTime = 0;
      setIsPlaying(false);
      currentTimeRef.current = 0;
      audio.removeEventListener('loadeddata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [source]);

  const handlePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }

    setIsPlaying(!isPlaying);
  };

  return {
    src: source,
    playing: isPlaying,
    onPlayPause: handlePlayPause,
    currentTime: currentTimeRef.current, // Use ref value
    duration,
    progress: duration > 0 ? (currentTimeRef.current / duration) * 100 : 0,
  };
};

export default useAudio;
