import {NodeLarge, NodeSmall } from "@/app/Util/NodeStyles";;
import React, { useState, useEffect, useRef, ReactNode } from "react";
import SignalView from "./SignalView";
import Drawer from "../../Util/Drawer";


// Functions:
//  - playback of "spectrogram" with a small button 
//  - large view with a toggle button
//  - the large view should introduce a drawer with additional buttons

// load the presenter with the image to the spectrogram:
//const spectrogramUrl = 'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png';
type SignalPresenterProps = {
  spectrogramUrl: string;
  audioUrl: string;
}

const SignalPresenter: React.FC<SignalPresenterProps> = ({ spectrogramUrl, audioUrl }) => {
  const [spectrogram, setSpectrogram] = useState<HTMLImageElement | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null); // perhaps just load some sample thing
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [drawerOpen, setDrawerOpen] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);

// loading spectrogram image from url
  useEffect(()=> {
    const img = new Image();
    img.src = spectrogramUrl;
    img.onload = () => {
      setSpectrogram(img)
    };
  }, [spectrogramUrl]);

  // loading audio from url
  useEffect(() => {
    const audio = new Audio(audioUrl);

    audio.onloadedmetadata = () => {
      setDuration(audio.duration);
    };
    const updateCurrentTime = () => {
        if (!audio.paused) {
            setCurrentTime(audio.currentTime);
        }
        requestAnimationFrame(updateCurrentTime);
    };

    updateCurrentTime();
    setAudio(audio)

    return () => {
      audio.pause();
    };
  }, [audioUrl]);

  const handlePlayPause = () => {
    if (!audio) {
        return;
    }
    if (audio.paused) {
      audio.play();
      setIsPlaying(true);
    } else {
      audio.pause();
      setIsPlaying(false);
    }
  };

  // simple progress bar with canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !spectrogram) {
      return;
    }
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    // drawing spectrogram on canvas
    ctx.drawImage(spectrogram, 0, 0, canvas.width, canvas.height);

    // drawing progress bar
    const progress = (currentTime / duration) * canvas.width;
    ctx.beginPath();
    ctx.moveTo(progress, 0);
    ctx.lineTo(progress, canvas.height);
    ctx.strokeStyle= 'black';
    ctx.stroke();
  }, [spectrogram, currentTime, duration]);

    const [newGenerations, setNewGenerations] = useState<Array<ReactNode>>([]);

    // replace with fetch that gets image and audio data
    const generateVariations = () => {
        const newSpectrograms = [
            'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png',
            'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png',
            'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png',
            'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png',
            ];
        const variations = [];    
        for (let i = 0; i < 4; i++) {
            variations.push(
                <SignalView
                    key={i}
                    spectrogramUrl={newSpectrograms[i]}
                    currentTime={currentTime}
                    duration={duration}
                    onPlayPause={handlePlayPause}
                    playing={false}
                    showExpand={false}
                />
            );
        }
        setNewGenerations(variations);
    };

  if (!spectrogram || !audio) {
    return <div>cargando...</div>
  }

  return (
    <div>
    <canvas ref={canvasRef} width={500} height={300} />
      <SignalView 
        spectrogramUrl={spectrogramUrl}
        currentTime={currentTime}
        duration={duration}
        onToggleDrawer={() => setDrawerOpen(!drawerOpen)} 
        onPlayPause={handlePlayPause}
        playing={isPlaying}
        drawerOpen={drawerOpen}
        showExpand={true}
      />
        <Drawer isOpen={drawerOpen} >
            <button onClick={generateVariations}> generate variations </button>
            <button> export </button>
            <button> edit </button>
            // another SignalPresenter should exist here
            {newGenerations}
        </Drawer>
    </div>
  );
};

export default SignalPresenter;

