import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import styled from 'styled-components';
import { Button , Container, NodeLarge, NodeSmall } from '../Util/BaseStyles';

const TopBar = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  box-sizing: border-box; /* Add this line */
  border-bottom: 1px solid black;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const StyledSelect = styled.select`
  padding: 5px;
  margin: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;



const ToggleButton = styled.button`
  position: absolute;
  top: 10px;
  left: 10px;
`;

const Source: React.FC = () => {
  const [showLargeView, setShowLargeView] = useState<boolean>(false);
  const [base, setBase] = useState<string>('');
  const [style, setStyle] = useState<string>('');

  const handleBaseChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBase(event.target.value);
  };
  const handleStyleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setStyle(event.target.value);
  };

  const handleDone = (e: React.MouseEvent) => {
    e.stopPropagation(); 
    setShowLargeView(false);
  };

  const handleToggleView = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowLargeView(!showLargeView);
  };

  const CurrentNode = showLargeView ? NodeLarge : NodeSmall;

  return (
    <CurrentNode>
      <TopBar>Source { base != "" ? `: ${base}` : ""}</TopBar>
      {base && (
        <ToggleButton onClick={handleToggleView}>
          {showLargeView ? "-" : "+"}
        </ToggleButton>
      )}
      <Handle type="target" position={Position.Right} />
      {base ? (
        <>
          {showLargeView ? (
            <Container>
                <StyledSelect value={style} onChange={handleStyleChange}>
                <option value="">Select...</option>
                <option value="guitar">Guitar Solo</option>
                <option value="flute">Fantasy Flute</option>
                </StyledSelect>
                <Button onClick={handleDone}>Done</Button>
            </Container>
          ) : (
            <>
              <p>Spectrogram here</p>
              <Button>Play</Button>
            </>
          )}
        </>
      ) : (
        <StyledSelect value={base} onChange={handleBaseChange}>
          <option value="">Select...</option>
          <option value="record">Record</option>
          <option value="import">Import</option>
          <option value="generate">Generate</option>
        </StyledSelect>
      )}
      <Handle type="source" position={Position.Left} />
    </CurrentNode>
  );
};

export default Source;
