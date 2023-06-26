// InstrumentToggle.tsx
import { Button, InnerBox } from "../Util/BaseStyles";

interface Props {
  instruments: string[];
  onToggleInstrument: (instrument: string) => void;
}

const availableInstruments = [
  "Guitar",
  "Piano",
  "Flute",
  "Trumpet",
  "Banjo",
  "Violin",
]; // Add more as required

export default function InstrumentToggle({
  instruments,
  onToggleInstrument,
}: Props) {
  return (
    <InnerBox flexdir="row">
      {availableInstruments.map((instrument) => (
        <Button
          key={instrument}
          onClick={() => onToggleInstrument(instrument)}
          style={{
            backgroundColor: instruments.includes(instrument)
              ? "lightcoral"
              : "white",
          }}
        >
          {instrument}
        </Button>
      ))}
    </InnerBox>
  );
}
