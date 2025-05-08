import { useEffect, useState } from 'react';
import { useThree } from '@react-three/fiber';

export const useMouseControls = (isActive: boolean) => {
  const { camera } = useThree();
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isPointerLocked, setIsPointerLocked] = useState(false);
  
  useEffect(() => {
    if (!isActive) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!isPointerLocked) return;
      
      // Update rotation based on mouse movement
      const sensitivity = 0.002;
      const newRotationY = rotation.y - e.movementX * sensitivity;
      let newRotationX = rotation.x - e.movementY * sensitivity;
      
      // Clamp vertical rotation to prevent flipping
      newRotationX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, newRotationX));
      
      setRotation({ x: newRotationX, y: newRotationY });
      
      // Apply rotation to camera
      camera.rotation.x = newRotationX;
      camera.rotation.y = newRotationY;
    };
    
    const handleClick = () => {
      const canvas = document.querySelector('canvas');
      if (!canvas) return;
      
      if (!isPointerLocked) {
        canvas.requestPointerLock();
      }
    };
    
    const handlePointerLockChange = () => {
      setIsPointerLocked(document.pointerLockElement === document.querySelector('canvas'));
    };
    
    // Add event listeners
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('pointerlockchange', handlePointerLockChange);
    document.querySelector('canvas')?.addEventListener('click', handleClick);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('pointerlockchange', handlePointerLockChange);
      document.querySelector('canvas')?.removeEventListener('click', handleClick);
    };
  }, [camera, isActive, isPointerLocked, rotation]);
  
  return { rotation };
};