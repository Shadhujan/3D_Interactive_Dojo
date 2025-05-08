import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Exterior } from './scene/Exterior';
import { Interior } from './scene/Interior';

export const Scene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(({ clock }) => {
    // Subtle scene animation
    if (groupRef.current) {
      // Subtle breathing effect
      const t = clock.getElapsedTime();
      groupRef.current.position.y = Math.sin(t * 0.1) * 0.03;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Ground plane */}
      <mesh 
        rotation={[-Math.PI / 2, 0, 0]} 
        position={[0, -0.01, 0]} 
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial 
          color="#4a5568" 
          roughness={1}
          metalness={0}
        />
      </mesh>
      
      {/* Exterior elements */}
      <Exterior />
      
      {/* Interior elements */}
      <Interior />
    </group>
  );
};