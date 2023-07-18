import React, { useState, useEffect, useRef, ReactNode } from "react";
import SignalView from "./SignalView";

const SignalPresenter: React.FC = () => {
  const [isComputing, setIsComputing] = useState<boolean>(false);
  const [audioComputed, setAudioComputed] = useState<boolean>(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); 

  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const [numberOfTargetHandles, setNumberOfTargetHandles] = useState<number>(1);
  const [numberOfSourceHandles, setNumberOfSourceHandles] = useState<number>(1);


  // temporary fetch. 
  // The audio state for each signal node will be updated in 
  //    some other way when implementing the backend. 
  // Each signal node should know which audio it should recieve based on some id mapping in the bucket.
  const fetchAudio = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return "https://www2.cs.uic.edu/~i101/SoundFiles/gettysburg10.wav";
  }

// This handles the play/payse with three states:
/*
  1. signal is uncomputed 
  2. computed signal,  not playing
  3. computed signal,  playing
*/
const handlePlayPause = async () => {
  if (isComputing) {
    return;
  }
  if (!audioComputed) {   //1.
    setIsComputing(true);
    const audioUrl = await fetchAudio();
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
    return;
  } 
  if (audio && audioComputed) { //2.
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {  //3.
      audio.pause();
      setIsPlaying(false);
    }
  }
};

// This is for the progress bar. Needs some refactoring as I'm not sure if this is efficient.
useEffect(() => { 
    let intervalId: number | undefined;

    const updateCurrentTime = () => {
        if (audio && !audio.paused) {
            setCurrentTime(audio.currentTime);
        }
        requestAnimationFrame(updateCurrentTime);
    };

    intervalId = window.setInterval(updateCurrentTime, 1000);

    return () => {
      if (intervalId) {
        window.clearInterval(intervalId);
      }
    };
  }, [audio]);

  return (
      <SignalView 
        audioComputed={audioComputed}
        currentTime={currentTime}
        numberOfSourceHandles={numberOfSourceHandles}
        numberOfTargetHandles={numberOfTargetHandles}
        duration={duration}
        onPlayPause={handlePlayPause}
        playing={isPlaying}
        isComputing={isComputing}
      />
  );
};

export default SignalPresenter;

