import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KoiPondProps {
  position?: [number, number, number];
}

export const KoiPond: React.FC<KoiPondProps> = ({ position = [0, 0, 0] }) => {
  const waterRef = useRef<THREE.Mesh>(null);
  const koiFishRef = useRef<THREE.Group>(null);
  
  // Create water texture
  const waterTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/1426718/pexels-photo-1426718.jpeg');
  waterTexture.wrapS = THREE.RepeatWrapping;
  waterTexture.wrapT = THREE.RepeatWrapping;
  waterTexture.repeat.set(3, 3);
  
  useFrame(({ clock }) => {
    // Animate water ripples
    if (waterRef.current) {
      const time = clock.getElapsedTime();
      (waterRef.current.material as THREE.MeshStandardMaterial).displacementScale = 0.05 + Math.sin(time) * 0.01;
      waterTexture.offset.set(Math.sin(time * 0.05) * 0.01, Math.cos(time * 0.05) * 0.01);
    }
    
    // Animate koi fish
    if (koiFishRef.current) {
      koiFishRef.current.children.forEach((fish, i) => {
        const time = clock.getElapsedTime() * 0.5 + i;
        const radius = 1 + i * 0.3;
        fish.position.x = Math.sin(time) * radius;
        fish.position.z = Math.cos(time) * radius;
        fish.rotation.y = Math.atan2(Math.cos(time), -Math.sin(time));
      });
    }
  });
  
  return (
    <group position={position}>
      {/* Pond edge */}
      <mesh position={[0, 0.1, 0]} receiveShadow>
        <cylinderGeometry args={[5, 5, 0.2, 32]} />
        <meshStandardMaterial 
          color="#7D7D7D"
          roughness={0.9}
          metalness={0}
        />
      </mesh>
      
      {/* Water surface */}
      <mesh ref={waterRef} position={[0, 0.15, 0]} rotation={[-Math.PI/2, 0, 0]}>
        <circleGeometry args={[4.8, 32]} />
        <meshStandardMaterial 
          color="#0288D1"
          transparent
          opacity={0.8}
          roughness={0.2}
          metalness={0.3}
          map={waterTexture}
          displacementMap={waterTexture}
          displacementScale={0.05}
        />
      </mesh>
      
      {/* Koi fish */}
      <group ref={koiFishRef} position={[0, 0.2, 0]}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, 0, 0]} castShadow>
            <coneGeometry args={[0.2, 0.6, 8]} />
            <meshStandardMaterial 
              color={i % 2 === 0 ? "#FF5722" : "#FFFFFF"}
              roughness={0.8}
              metalness={0.2}
            />
          </mesh>
        ))}
      </group>
      
      {/* Decorative rocks */}
      {[...Array(7)].map((_, i) => {
        const angle = (i / 7) * Math.PI * 2;
        const radius = 4.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const scale = 0.2 + Math.random() * 0.3;
        
        return (
          <mesh 
            key={i} 
            position={[x, 0.2, z]} 
            rotation={[Math.random(), Math.random(), Math.random()]}
            scale={[scale, scale, scale]}
            castShadow
            receiveShadow
          >
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial 
              color="#616161"
              roughness={0.9}
              metalness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};