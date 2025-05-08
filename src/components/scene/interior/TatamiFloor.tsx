import React from 'react';
import * as THREE from 'three';

interface TatamiFloorProps {
  position?: [number, number, number];
}

export const TatamiFloor: React.FC<TatamiFloorProps> = ({ position = [0, 0, 0] }) => {
  // Create tatami texture
  const tatamiTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/4946965/pexels-photo-4946965.jpeg');
  tatamiTexture.wrapS = THREE.RepeatWrapping;
  tatamiTexture.wrapT = THREE.RepeatWrapping;
  tatamiTexture.repeat.set(1, 1);
  
  // Standard tatami mat dimensions (90cm x 180cm)
  const tatamiWidth = 1.8;
  const tatamiHeight = 0.05;
  const tatamiLength = 0.9;
  
  // 6x6 layout of tatami mats
  const rows = 6;
  const cols = 6;
  const totalWidth = cols * tatamiLength;
  const totalLength = rows * tatamiWidth;
  
  // Create tatami mat pattern (traditional 6x6)
  const tatami = [];
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const isVertical = (row + col) % 2 === 0;
      const width = isVertical ? tatamiLength : tatamiWidth;
      const length = isVertical ? tatamiWidth : tatamiLength;
      
      const x = col * tatamiLength - totalWidth / 2 + tatamiLength / 2;
      const z = row * tatamiWidth - totalLength / 2 + tatamiWidth / 2;
      
      tatami.push({
        position: [x, 0, z] as [number, number, number],
        rotation: [0, isVertical ? 0 : Math.PI / 2, 0] as [number, number, number],
        width,
        length
      });
    }
  }
  
  return (
    <group position={position}>
      {tatami.map((mat, i) => (
        <mesh 
          key={i} 
          position={mat.position} 
          rotation={mat.rotation}
          receiveShadow
        >
          <boxGeometry args={[mat.width, tatamiHeight, mat.length]} />
          <meshStandardMaterial 
            map={tatamiTexture}
            color="#D7CFA0"
            roughness={0.8}
            metalness={0}
          />
        </mesh>
      ))}
    </group>
  );
};