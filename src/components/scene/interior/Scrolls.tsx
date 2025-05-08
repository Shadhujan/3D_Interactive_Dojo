import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Scrolls: React.FC = () => {
  const scrollsRef = useRef<THREE.Group>(null);
  
  // Create scroll texture
  const scrollTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/235985/pexels-photo-235985.jpeg');
  scrollTexture.wrapS = THREE.RepeatWrapping;
  scrollTexture.wrapT = THREE.RepeatWrapping;
  scrollTexture.repeat.set(1, 1);
  
  // Create calligraphy texture
  const calligraphyTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/6185245/pexels-photo-6185245.jpeg');
  
  useFrame(({ clock }) => {
    // Gentle scroll swaying animation
    if (scrollsRef.current) {
      scrollsRef.current.children.forEach((scroll, i) => {
        const t = clock.getElapsedTime() * 0.5 + i * 0.1;
        scroll.rotation.x = Math.sin(t * 0.3) * 0.02;
        scroll.rotation.z = Math.cos(t * 0.2) * 0.02;
      });
    }
  });
  
  // Scroll positions along the wall
  const scrollPositions = [
    [-5.8, 2, -4],
    [-5.8, 2, -2],
    [-5.8, 2, 0],
    [-5.8, 2, 2],
  ];
  
  return (
    <group ref={scrollsRef}>
      {scrollPositions.map((position, i) => (
        <group key={i} position={position as [number, number, number]}>
          {/* Mounting rod */}
          <mesh position={[0, 0.6, 0]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.03, 0.03, 1.2, 8]} />
            <meshStandardMaterial 
              color="#8B4513"
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
          
          {/* Scroll paper */}
          <mesh position={[0, 0, 0]} rotation={[0.1, 0, 0]} castShadow>
            <planeGeometry args={[1, 2]} />
            <meshStandardMaterial 
              map={scrollTexture}
              color="#F5F5DC"
              roughness={0.5}
              metalness={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Calligraphy */}
          <mesh position={[0, 0, 0.01]} rotation={[0.1, 0, 0]}>
            <planeGeometry args={[0.8, 1.6]} />
            <meshStandardMaterial 
              map={calligraphyTexture}
              transparent
              opacity={0.9}
              side={THREE.DoubleSide}
            />
          </mesh>
          
          {/* Bottom rod */}
          <mesh position={[0, -1.1, 0]} rotation={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.04, 0.04, 1.1, 8]} />
            <meshStandardMaterial 
              color="#8B4513"
              roughness={0.7}
              metalness={0.2}
            />
          </mesh>
          
          {/* Hanging cord */}
          <mesh position={[0, 0.3, 0]} castShadow>
            <cylinderGeometry args={[0.005, 0.005, 0.6, 4]} />
            <meshStandardMaterial 
              color="#4A4A4A"
              roughness={0.5}
              metalness={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};