import { useEffect, useRef, useState } from 'react';
import { useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface MouseState {
  sensitivity: number;
  isLocked: boolean;
  euler: THREE.Euler;
  prevTime: number;
}

export const useMouseControls = () => {
  const { camera } = useThree();
  const [isLocked, setIsLocked] = useState(false);
  
  const mouseState = useRef<MouseState>({
    sensitivity: 0.002, // Configurable between 0.001 and 0.02
    isLocked: false,
    euler: new THREE.Euler(0, 0, 0, 'YXZ'),
    prevTime: 0
  });

  useEffect(() => {
    //if (!isActive) return;

    // const handleMouseMove = (e: MouseEvent) => {
    //   if (!isPointerLocked) return;
      
    //   // Update rotation based on mouse movement
    //   const sensitivity = 0.002;
    //   const newRotationY = rotation.y - e.movementX * sensitivity;
    //   let newRotationX = rotation.x - e.movementY * sensitivity;
      
    //   // Clamp vertical rotation to prevent flipping
    //   newRotationX = Math.max(-Math.PI / 2 + 0.1, Math.min(Math.PI / 2 - 0.1, newRotationX));
      
    //   setRotation({ x: newRotationX, y: newRotationY });
      
    //   // Apply rotation to camera
    //   camera.rotation.x = newRotationX;
    //   camera.rotation.y = newRotationY;
    //   camera.rotation.z = 0; // Reset Z rotation
    
    const handleMouseMove = (event: MouseEvent) => {
      // Use ref for immediate check inside loop
      if (!mouseState.current.isLocked) return;

      const currentTime = performance.now();
      const deltaTime = (currentTime - mouseState.current.prevTime) / 1000;
      mouseState.current.prevTime = currentTime;

      // Apply mouse movement with sensitivity and delta time
      const movementX = event.movementX * mouseState.current.sensitivity * deltaTime;
      const movementY = event.movementY * mouseState.current.sensitivity * deltaTime;

      // Update euler angles
      mouseState.current.euler.y -= movementX;
      mouseState.current.euler.x = THREE.MathUtils.clamp(
        mouseState.current.euler.x - movementY,
        -Math.PI / 2 + 0.01, // Prevent complete vertical flip
        Math.PI / 2 - 0.01
      );

      // Apply smooth rotation
      const quat = new THREE.Quaternion();
      quat.setFromEuler(mouseState.current.euler);
      camera.quaternion.slerp(quat, 0.15);
    };

    const handlePointerLockChange = () => {
      const locked = document.pointerLockElement === document.querySelector('canvas');
      mouseState.current.isLocked = locked;
      setIsLocked(locked);
    };

    const handleClick = () => {
      if (!mouseState.current.isLocked) {
        document.querySelector('canvas')?.requestPointerLock();
      }
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
  }, [camera]);

  return {
    isLocked, // Now using state
    setSensitivity: (value: number) => {
      mouseState.current.sensitivity = THREE.MathUtils.clamp(value, 0.001, 0.02);
    },
    getRotation: () => mouseState.current.euler.clone()
  };
};