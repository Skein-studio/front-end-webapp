import React, { useState, useEffect } from 'react';

interface WindowDimensions {
  width: number;
  height: number;
}

const useWindowDimensions = (): WindowDimensions => {
  const hasWindow = typeof window !== 'undefined';

  const [windowDimensions, setWindowDimensions] = useState<WindowDimensions>({
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.innerHeight : 0,
  });

  useEffect(() => {
    if (hasWindow) {
      const handleResize = () => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };

      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return windowDimensions;
}

export default useWindowDimensions;
