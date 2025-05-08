import { useState, useEffect } from 'react';

export const useKeyboardControls = () => {
  const [keys, setKeys] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    run: false,
  });
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Prevent default behavior for WASD keys
      if (['w', 'a', 's', 'd', ' ', 'shift'].includes(e.key.toLowerCase())) {
        e.preventDefault();
      }
      
      if (e.key.toLowerCase() === 'w') {
        setKeys((keys) => ({ ...keys, moveForward: true }));
      } else if (e.key.toLowerCase() === 's') {
        setKeys((keys) => ({ ...keys, moveBackward: true }));
      } else if (e.key.toLowerCase() === 'a') {
        setKeys((keys) => ({ ...keys, moveLeft: true }));
      } else if (e.key.toLowerCase() === 'd') {
        setKeys((keys) => ({ ...keys, moveRight: true }));
      } else if (e.key === ' ') {
        setKeys((keys) => ({ ...keys, jump: true }));
      } else if (e.key.toLowerCase() === 'shift') {
        setKeys((keys) => ({ ...keys, run: true }));
      }
    };
    
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 'w') {
        setKeys((keys) => ({ ...keys, moveForward: false }));
      } else if (e.key.toLowerCase() === 's') {
        setKeys((keys) => ({ ...keys, moveBackward: false }));
      } else if (e.key.toLowerCase() === 'a') {
        setKeys((keys) => ({ ...keys, moveLeft: false }));
      } else if (e.key.toLowerCase() === 'd') {
        setKeys((keys) => ({ ...keys, moveRight: false }));
      } else if (e.key === ' ') {
        setKeys((keys) => ({ ...keys, jump: false }));
      } else if (e.key.toLowerCase() === 'shift') {
        setKeys((keys) => ({ ...keys, run: false }));
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);
  
  return keys;
};