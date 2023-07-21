// SignalDetailPresenter.tsx
import useAudio from "@/app/Util/useAudio";
import OpenSignalView from "./OpenSignalView";

export default function OpenSignalPresenter() {
  const audioState = useAudio();

  return (
    <OpenSignalView
      audioComputed={audioState.audioComputed}
      currentTime={audioState.currentTime}
      duration={audioState.duration}
      onPlayPause={audioState.handlePlayPause}
      playing={audioState.isPlaying}
      isComputing={audioState.isComputing}
    />
  );
}
