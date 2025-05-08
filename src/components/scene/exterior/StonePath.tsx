import React from 'react';
import * as THREE from 'three';

interface StonePathProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const StonePath: React.FC<StonePathProps> = ({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  // Create stone texture
  const stoneTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg');
  stoneTexture.wrapS = THREE.RepeatWrapping;
  stoneTexture.wrapT = THREE.RepeatWrapping;
  stoneTexture.repeat.set(1, 1);
  
  // Define stone positions in a path pattern
  const stonePositions = [
    [0, 0, 0],
    [1, 0, 1],
    [0, 0, 2],
    [-1, 0, 3],
    [0, 0, 4],
    [1, 0, 5],
    [0, 0, 6],
    [-1, 0, 7],
    [0, 0, 8],
    [0, 0, 9]
  ];
  
  return (
    <group position={position} rotation={rotation as [number, number, number]}>
      {stonePositions.map((stonePos, i) => (
        <mesh 
          key={i} 
          position={stonePos as [number, number, number]} 
          rotation={[-Math.PI/2, 0, Math.random() * Math.PI * 2]}
          receiveShadow
        >
          <circleGeometry args={[0.4 + Math.random() * 0.2, 8]} />
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