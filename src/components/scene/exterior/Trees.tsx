import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export const Trees: React.FC = () => {
  const treesRef = useRef<THREE.Group>(null);
  
  // Create bark texture
  const barkTexture = useTexture('https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg');
  barkTexture.wrapS = THREE.RepeatWrapping;
  barkTexture.wrapT = THREE.RepeatWrapping;
  barkTexture.repeat.set(1, 3);
  
  // Create leaf texture
  const leafTexture = useTexture('https://images.pexels.com/photos/338936/pexels-photo-338936.jpeg');
  
  const treePositions = [
    [8, 0, 8],
    [-8, 0, 8],
    [12, 0, -5],
    [-12, 0, -12]
  ];
  
  useFrame(({ clock }) => {
    // Animate trees swaying gently
    if (treesRef.current) {
      treesRef.current.children.forEach((tree, i) => {
        const time = clock.getElapsedTime() * 0.5 + i;
        tree.rotation.x = Math.sin(time * 0.3) * 0.02;
        tree.rotation.z = Math.cos(time * 0.2) * 0.02;
      });
    }
  });
  
  return (
    <group ref={treesRef}>
      {treePositions.map((position, i) => (
        <group key={i} position={position as [number, number, number]}>
          {/* Tree trunk */}
          <mesh position={[0, 1.5, 0]} castShadow>
            <cylinderGeometry args={[0.3, 0.5, 3, 8]} />
            <meshStandardMaterial 
              map={barkTexture}
              color="#5D4037"
              roughness={0.9}
              metalness={0}
            />
          </mesh>
          
          {/* Foliage - Japanese maple style */}
          <group position={[0, 3, 0]}>
            {/* Create multiple layers of leaves */}
            {[...Array(4)].map((_, j) => (
              <mesh 
                key={j} 
                position={[0, j * 0.4, 0]} 
                rotation={[0, (j * Math.PI) / 8, 0]}
                castShadow
              >
                <coneGeometry args={[2 - j * 0.3, 1, 8]} />
                <meshStandardMaterial 
                  map={leafTexture}
                  color={i % 2 === 0 ? "#D32F2F" : "#388E3C"}
                  roughness={0.8}
                  metalness={0.1}
                  side={THREE.DoubleSide}
                />
              </mesh>
            ))}
          </group>
        </group>
      ))}
    </group>
  );
};