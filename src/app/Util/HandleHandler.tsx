import { Handle, Position } from "reactflow";
import styled from "styled-components";
import { NodeSmall, RowContainer, ProgressBar, ProgressBarContainer, ProgressBarWrapper, ProgressBarText, PlayButton, NodeIcon, NodeTitle, HandleLabel } from "@/app/Util/Flow/NodeStyles";

/*
  Generates input|target / output|source handles and stacks them.
*/
interface HandleProps{
  handleType: 'source' | 'target';
  numberOfHandles: number;
  splitNode?: boolean;
}

const HandleWrapper = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const HandleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  width: 100%;
`

//const HandleLabel = styled.div`
//  position: relative;
//  text-align: center;
//`;

const GenerateHandles: React.FC<HandleProps> = ({ handleType, numberOfHandles, splitNode}) => {

    let handles = [];
    const splitNames = ['drums', 'bass', 'piano', 'guitar', 'voice', 'other'];

    for (let i = 0; i < numberOfHandles; i++) {
          {handles.push(
            <HandleWrapper key={i}>
              {handleType === 'source' && splitNode && <HandleLabel>{splitNames[i]}</HandleLabel>}
            
            <Handle 
              type={handleType}
              id={`${handleType}${i}`}
              position={handleType === 'source'? Position.Bottom : Position.Top}
              style={{
                background: '#757574',
                height: '20px',
                width: '20px',
                overflow: 'hidden',
                transform: handleType === 'source' ? 'translateY(50%) translateX(-50%)' : 'translateY(-50%) translateX(-50%)',
                borderRadius: handleType === 'target' ? '100% 100% 0% 0%' : '0 0 90% 90%',
                zIndex: '-1', // couldn't get them to be nice semicircles
              }}
            />

            </HandleWrapper>
          )};
    }
    return <HandleContainer>{handles}</HandleContainer>
  };
  
  export default GenerateHandles;