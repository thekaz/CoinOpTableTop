import React, {useRef, useState, useEffect, useCallback} from 'react';
import StatStateContainer from './StatStateContainer';

const expectedKeyPressList = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
  'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'];

function KeyboardListenerContainer() {
  const codeIndex = useRef(0);
  const [codeEnabled, setCodeEnabled] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    console.log(e.key);
    console.log(expectedKeyPressList[codeIndex.current])
    if (expectedKeyPressList[codeIndex.current] !== e.key) {
      codeIndex.current = 0;
      return;
    }

    if (codeIndex.current === expectedKeyPressList.length - 1) {
      setCodeEnabled(true);
      window.removeEventListener('keydown', handleKeyDown);
      return;
    }

    codeIndex.current++;
    
  }, [codeIndex, setCodeEnabled]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  return (
    <>
      <StatStateContainer codeEnabled={codeEnabled} />
    </>
  );
}

export default KeyboardListenerContainer;
