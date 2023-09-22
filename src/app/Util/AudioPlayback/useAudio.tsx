// useAudio.tsx
import { useState, useEffect, useRef } from "react";

export type AudioState = {
  src: string;
  playing: boolean;
  onPlayPause: () => void;
  progress: number;
  duration: number;
};

/**
 * A hook for playing audio.
 * @param source The source of the audio.
 * @param loop Whether or not the audio should loop.
 * @returns An AudioState object, which contains the source, whether or not the audio is playing, a function to play/pause the audio, the progress of the audio, and the duration of the audio.
 * */
const useAudio = (source: string, loop?: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio());

  useEffect(() => {
    if (!loop) {
      loop = false;
    }
    audioRef.current.loop = loop;
  }, [loop]);

  // Function to update progress using requestAnimationFrame
  const updateProgress = () => {
    if (isPlaying && duration > 0) {
      const newProgress = (audioRef.current.currentTime / duration) * 100;
      setProgress(newProgress);

      if (newProgress >= 100) {
        setProgress(0); // Reset progress to 0%
        audioRef.current.currentTime = 0; // Reset audio time to the beginning
      }

      requestAnimationFrame(updateProgress);
    }
  };

  // Updating the source directly if it changes
  useEffect(() => {
    audioRef.current.src = source;
  }, [source]);

  // Handling audio events
  useEffect(() => {
    const audio = audioRef.current;

    const handleLoadedData = () => {
      setDuration(audio.duration);
    };

    const handleTimeUpdate = () => {
      updateProgress(); // Call updateProgress when time updates
    };

    const handleEnded = () => {
      setIsPlaying(false);
    };

    audio.addEventListener("loadeddata", handleLoadedData);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);

    return () => {
      // Cleanup
      audio.pause(); // Pause the audio when component is unmounted

      audio.removeEventListener("loadeddata", handleLoadedData);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []); // Dependencies array is empty, so this will run once on mount and cleanup on unmount

  useEffect(() => {
    if (isPlaying) {
      updateProgress();
    }
  }, [isPlaying]);

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
    duration,
    progress,
  };
};

export default useAudio;
