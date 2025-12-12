import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

export const Zabuton: React.FC = () => {
  const zabutonRef = useRef<THREE.Group>(null);
  
  // Create fabric texture
  const fabricTexture = useTexture('https://images.pexels.com/photos/1939485/pexels-photo-1939485.jpeg');
  fabricTexture.wrapS = THREE.RepeatWrapping;
  fabricTexture.wrapT = THREE.RepeatWrapping;
  fabricTexture.repeat.set(1, 1);
  
  // Define zabuton positions in a meditation arrangement
  const positions = [
    [-2, 0, -3],
    [2, 0, -3],
    [-2, 0, -1],
    [2, 0, -1],
    [-2, 0, 1],
    [2, 0, 1]
  ];
  
  useFrame(({ clock }) => {
    // Subtle cushion animation (breathing effect)
    if (zabutonRef.current) {
      zabutonRef.current.children.forEach((cushion, i) => {
        const time = clock.getElapsedTime() * 0.5 + i * 0.1;
        cushion.scale.y = 1 + Math.sin(time) * 0.02;
      });
    }
  });
  
  return (
    <group ref={zabutonRef}>
      {positions.map((position, i) => (
        <group key={i} position={position as [number, number, number]}>
          {/* Main cushion body */}
          <mesh position={[0, 0.1, 0]} castShadow receiveShadow>
            <boxGeometry args={[0.8, 0.2, 0.8]} />
            <meshStandardMaterial 
              map={fabricTexture}
              color="#4A5568"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          
          {/* Top surface with slight indentation */}
          <mesh position={[0, 0.2, 0]} castShadow>
            <boxGeometry args={[0.75, 0.05, 0.75]} />
            <meshStandardMaterial 
              map={fabricTexture}
              color="#4A5568"
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
          
          {/* Decorative border */}
          {[0, Math.PI/2, Math.PI, Math.PI * 1.5].map((rotation, j) => (
            <mesh 
              key={j}
              position={[0, 0.125, 0]}
              rotation={[0, rotation, 0]}
              castShadow
            >
              <boxGeometry args={[0.82, 0.22, 0.02]} />
              <meshStandardMaterial 
                color="#2D3748"
                roughness={0.8}
                metalness={0.1}
              />
            </mesh>
          ))}
        </group>
      ))}
    </group>
  );
};