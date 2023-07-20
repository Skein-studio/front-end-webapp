import { Container } from "@/app/Util/BaseStyles";

interface Props{
    currentTime: number;
    duration: number;
    audioComputed: boolean;
    onPlayPause: () => void;
    playing: boolean;
    isComputing: boolean;
}

export default function OpenSignalView(props:Props) {
    return (
        <Container>
            <p>OpenSignalView</p>
        </Container>
    );
}