import React, { useState, useEffect } from "react";
import {NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";;
import SignalView from "./SignalView";


// Functions:
//  - playback of "spectrogram" 
//  - large view 

// load the presenter with the image to the spectrogram:
//const spectrogramUrl = 'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png';
type PresenterProps = {
  spectrogramUrl: string;
  audioUrl: string;
}

const SourcePresenter: React.FC<PresenterProps> = ({ spectrogramUrl, audioUrl }) => {
  const [spectrogram, setSpectrogram] = useState<HTMLImageElement | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // perhaps just load some sample thing
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);

  const [showLargeView, setShowLargeView] = useState<boolean>(false);

// function to load spectogram from some source
  useEffect(()=> {
    const img = new Image();
    img.src = spectrogramUrl;
    img.onload = () => {
      setSpectrogram(img)
    };
  }, [spectrogramUrl]);

  // temporary audio file loading
  useEffect(() => {
    const audio = new Audio(audioUrl);
    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
    audio.ontimeupdate = () => {
      setCurrentTime(audio.currentTime);
    };
    audio.play();
    setAudio(audio)

    return () => {
      audio.pause();
    };
  }, [audioUrl]);

  if (!spectrogram || !audio) {
    return <div>cargando...</div>
  }

  // dont think about this
  //const CurrentView = showLargeView ? NodeLarge : NodeSmall;

  return (
    <SignalView 
      spectrogram = {spectrogram}
      currentTime={currentTime}
      duration={duration}
    />
    
  );
};

export default SourcePresenter;
