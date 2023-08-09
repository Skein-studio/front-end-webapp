// SignalDetailPresenter.tsx
import useAudio from "@/app/Util/useAudio";
import OpenSignalView from "./OpenSignalView";
import { transformJSONtoTypescript } from "@/app/Util/modelTransformation";

export default function OpenSignalPresenter() {
  const audioState = useAudio();

  console.log(JSON.stringify(transformJSONtoTypescript()))

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
