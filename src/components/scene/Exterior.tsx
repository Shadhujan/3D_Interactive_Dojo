import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { DojoBuilding } from './exterior/DojoBuilding';
import { KoiPond } from './exterior/KoiPond';
import { Trees } from './exterior/Trees';
import { StonePath } from './exterior/StonePath';
import { BambooGrove } from './exterior/BambooGrove';

export const Exterior: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    // Subtle ambient animation for exterior elements
    const t = clock.getElapsedTime();
    
    if (groupRef.current) {
      // No animation for the main group
    }
  });
  
  return (
    <group ref={groupRef}>
      <DojoBuilding position={[0, 0, 0]} />
      <KoiPond position={[-8, 0, -5]} />
      <Trees />
      <StonePath position={[0, 0.01, 10]} rotation={[0, Math.PI, 0]} />
      <BambooGrove />
    </group>
  );
};