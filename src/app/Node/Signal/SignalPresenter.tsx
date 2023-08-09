// SignalPresenter.tsx
import useAudio from "@/app/Util/useAudio";
import SignalView from "./SignalView";
import { useContext, useState } from "react";
import { NodeContext } from "../NodeState";

export default function SignalPresenter() {
  const audioState = useAudio();

  const node = useContext(NodeContext); // Use NodeContext to get NodeState instance
  
  const [numberOfTargetHandles, setNumberOfTargetHandles] = useState<number>(
    node?.inputs?.length ?? 1
  );
  const [numberOfSourceHandles, setNumberOfSourceHandles] = useState<number>(
    node?.outputs?.length ?? 1
  );

  return <SignalView audioState={audioState} />;
}
