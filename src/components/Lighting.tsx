import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Lighting: React.FC = () => {
  const directionalLightRef = useRef<THREE.DirectionalLight>(null);
  const timeOfDay = useRef(0.5); // 0: night, 0.5: day, 1: night
  const timeDirection = useRef(0.0001); // Speed of day/night cycle
  
  useFrame(() => {
    // Update time of day
    timeOfDay.current += timeDirection.current;
    
    // Loop time between 0 and 1
    if (timeOfDay.current >= 1 || timeOfDay.current <= 0) {
      timeDirection.current *= -1;
    }
    
    // Update directional light based on time of day
    if (directionalLightRef.current) {
      // Calculate sun position based on time of day (simplified circular path)
      const angle = timeOfDay.current * Math.PI;
      const height = Math.sin(angle) * 10;
      const distance = Math.cos(angle) * 10;
      
      directionalLightRef.current.position.set(distance, height + 5, -distance);
      
      // Adjust light intensity based on time
      const intensity = Math.max(0.1, Math.sin(angle));
      directionalLightRef.current.intensity = intensity * 2;
      
      // Update shadow camera
      directionalLightRef.current.shadow.camera.updateProjectionMatrix();
    }
  });
  
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.3} />
      
      {/* Main directional light (sun) */}
      <directionalLight
        ref={directionalLightRef}
        position={[10, 10, 10]}
        intensity={2}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={50}
        shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20}
      />
      
      {/* Fill lights */}
      <pointLight position={[-5, 2, -10]} intensity={0.2} />
      <pointLight position={[5, 2, -10]} intensity={0.2} />
    </>
  );
};