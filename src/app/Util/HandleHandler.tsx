import { Handle, Position } from "reactflow";
import styled from "styled-components";

/*
  Generates input|target / output|source handles and stacks them.
*/
interface GenerateHandleProps{
    handleType: 'source' | 'target';
    numberOfHandles: number;
    splitNode?: boolean;
  }

const HandleLabel = styled.div`
  position: relative;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
  text-align: center;
  width: 50px;
`;
  
const GenerateHandles: React.FC<GenerateHandleProps> = ({ handleType, numberOfHandles, splitNode}) => {

    let handles = [];
    const handleNames = ['drums', 'bass', 'piano', 'guitar', 'voice', 'other'];

    for (let i = 0; i < numberOfHandles; i++) {
        const handleStyle = { 
          left: `${10 * (i+1)}%`, 
          background: '#555',
          height: '10px',
          width: '10px'
        };

        handles.push(
          <div key={i} style={{ position: 'relative' }}>
            {handleType === 'source' && splitNode && <HandleLabel>{handleNames[i]}</HandleLabel>}
          <Handle // should be some naming scheme here for bass/drums etc.
            key={i}
            type={handleType}
            id={`${handleType}${i}`}
            position={handleType === 'source'? Position.Bottom : Position.Top}
            style={handleStyle}
          />
          </div>
        );
    }
    return <>{handles}</>
  };
  
  export default GenerateHandles;