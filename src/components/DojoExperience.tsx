import React, { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky, Environment, OrbitControls } from '@react-three/drei';
import { Scene } from './Scene';
import { Character } from './Character';
import { Lighting } from './Lighting';

export const DojoExperience: React.FC = () => {
  const isFirstPerson = useRef(false);
  
  return (
    <Canvas
      shadows
      camera={{ position: [0, 2, 5], fov: 60 }}
      className="w-full h-full"
    >
      {/* Environment */}
      <Sky sunPosition={[100, 20, 100]} />
      <Environment preset="sunset" />
      
      {/* Scene */}
      <Scene />
      
      {/* Lighting */}
      <Lighting />
      
      {/* Character */}
      <Character />
      
      {/* Controls - Only active when not in first person */}
      {!isFirstPerson.current && <OrbitControls />}
      
      {/* Debug Controls */}
      {process.env.NODE_ENV === 'development' && !isFirstPerson.current && (
        <axesHelper args={[5]} />
      )}
    </Canvas>
  );
};