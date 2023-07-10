import React from 'react';

type SignalDrawerProps = {
  isOpen: boolean;
  onToggleDrawer: () => void;
};

const SignalDrawer: React.FC<SignalDrawerProps> = ({ isOpen, onToggleDrawer }) => {
  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      {/* Here you add the code for your drawer, including additional buttons */}
      <button onClick={onToggleDrawer}>Toggle Drawer</button>
    </div>
  );
};

export default SignalDrawer;
