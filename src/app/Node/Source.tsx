import React, { useState } from 'react';
import { Handle, Position } from 'reactflow';
import {NodeBox, TopBar, StyledSelect, ToggleButton, NodeLarge, NodeSmall} from '../Util/NodeStyles';
import { Button , Container, Text} from '../Util/BaseStyles';

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
                <Container>
                    Style:
                    <StyledSelect value={style} onChange={handleStyleChange}>
                    <option value="">Select...</option>
                    <option value="guitar">Guitar Solo</option>
                    <option value="flute">Fantasy Flute</option>
                    </StyledSelect>
                    <Button onClick={handleDone}>Done</Button>
                </Container>
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
