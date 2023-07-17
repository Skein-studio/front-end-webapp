import { Handle, Position } from "reactflow";

/*
  Generates input|target / output|source handles and stacks them.
*/
interface GenerateHandleProps{
    type: 'source' | 'target';
    numberOfHandles: number;
  }
  
const GenerateHandles: React.FC<GenerateHandleProps> = ({ type, numberOfHandles}) => {

    let handles = [];

    for (let i = 1; i < numberOfHandles+1; i++) {
        const handleStyle = { 
          left: `${10 * i}%`, 
          background: '#555',
          height: '10px',
          width: '10px'
        };

        handles.push(
          <Handle // should be some naming scheme here for bass/drums etc.
            key={i}
            type={type}
            id={`${type}${i}`}
            position={type === 'source'? Position.Bottom : Position.Top}
            style={handleStyle}
          />
        );
    }
    return <>{handles}</>
  };
  
  export default GenerateHandles;