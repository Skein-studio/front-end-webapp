import { createContext, useContext } from "react";

export const AudioContext = createContext();

export function useAudio() {
  return useContext(AudioContext);
}
