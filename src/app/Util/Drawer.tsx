import Node from 'reactflow';
import React, { ReactNode }  from 'react';
import SignalView from "../Node/Signal/SignalView";

// children should be additional components rendered inside of the drawer
interface DrawerProps {
  isOpen: boolean;
  children: ReactNode;
}

// This should be a general drawer to render whatever component you want
//
const Drawer: React.FC<DrawerProps> = ({ isOpen, children }) => {
  const drawerStyle = {
    display: isOpen ? 'grid' : 'none',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    width: '100%',
    height: '200px',  
    position: 'relative',
    bottom: '0',
    background: '#f1f1f1',
    boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.1)',
    padding: '20px',
  };
  return (
    <div style={drawerStyle} >
      {children}
    </div>
  );
};

export default Drawer;
