import SignalPresenter from "./SignalPresenter";

type SignalContainerProps = {
  spectrogramUrl: string;
  audioUrl: string;
}

//      vvv
const SignalContainer: React.FC<SignalContainerProps> = ({ spectrogramUrl, audioUrl }) => {
  return (
    <SignalPresenter 
      spectrogramUrl={spectrogramUrl}
      audioUrl={audioUrl}
    />
  );
};

export default SignalContainer;
