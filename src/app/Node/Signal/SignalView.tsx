import {  Button, Container, BlankSpace } from "@/app/Util/BaseStyles";
import { Handle, Position } from "reactflow";
import { TopBar, ToggleButton, NodeLarge, NodeSmall, NodeText } from "@/app/Util/NodeStyles";
const spectrogramPlaceHolder = 'https://s3.amazonaws.com/izotopedownloads/docs/rx6/img/07g-regular-stft.png';
import React, { useEffect, useRef } from 'react';



interface SignalViewProps{
  spectrogramUrl: string;
  currentTime: number;
  duration: number;
  onToggleDrawer: () => void;
  onPlayPause: () => void;
  playing: boolean;
  showExpand: boolean;
  drawerOpen: boolean;
}

const SignalView: React.FC<SignalViewProps> = ({ spectrogramUrl, onToggleDrawer, onPlayPause, playing, showExpand, drawerOpen}) => {
    const imgRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (imgRef.current) {
            imgRef.current.src = spectrogramUrl;
        }
    }, [spectrogramUrl]);

  return (
    <div>
        <button onClick={onPlayPause}> {playing? "pause" : "play"}  </button>
        {showExpand && <button onClick={onToggleDrawer}> {drawerOpen? "> <" : "<  >"} </button>}
    </div>
  );
}

export default SignalView;
