import React, { useState } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface StonePathProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

// Define stone positions in a path pattern
const stonePositions = [
  // Z=0 is at World Z=10
  // Increasing Z moves CLOSER to the Dojo (which is at World Z=6)
  // Keep Z < 3 to stay outside the steps
  // Negative Z values move AWAY from the Dojo
  [0, 0, -2],   // Far away
  [-1, 0, -1],  
  [0, 0, 0],    // Start position
  [0.8, 0, 1.2],
  [-0.6, 0, 2.0],
  [0.5, 0, 2.8] // Closest to door (approx World Z=7.2)
];

export const StonePath: React.FC<StonePathProps> = ({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  // Create stone texture
  const stoneTexture = useTexture('https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg');
  stoneTexture.wrapS = THREE.RepeatWrapping;
  stoneTexture.wrapT = THREE.RepeatWrapping;
  stoneTexture.repeat.set(1, 1);
  
  const [stoneData] = useState<{pos: number[], rotation: number, radius: number}[]>(() => 
    stonePositions.map((pos) => ({
      pos,
      rotation: Math.random() * Math.PI * 2,
      radius: 0.4 + Math.random() * 0.2
    }))
  );
  
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      {stoneData.map((data, i) => (
        <mesh 
          key={i} 
          position={data.pos as [number, number, number]} 
          rotation={[-Math.PI/2, 0, data.rotation]}
          receiveShadow
        >
          <circleGeometry args={[data.radius, 8]} />
          <meshStandardMaterial 
            map={stoneTexture}
            color="#9E9E9E"
            roughness={0.9}
            metalness={0.1}
          />
        </mesh>
      ))}
    </group>
  );
};