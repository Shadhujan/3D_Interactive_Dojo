import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const Lanterns: React.FC = () => {
  const lanternsRef = useRef<THREE.Group>(null);
  
  // Create paper texture for lanterns
  const paperTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/7185164/pexels-photo-7185164.jpeg');
  paperTexture.wrapS = THREE.RepeatWrapping;
  paperTexture.wrapT = THREE.RepeatWrapping;
  paperTexture.repeat.set(1, 1);
  
  // Define lantern positions
  const lanternPositions = [
    [-4, 2.5, -4],
    [4, 2.5, -4],
    [-4, 2.5, 4],
    [4, 2.5, 4],
    [0, 3, 0], // Center lantern, hanging slightly higher
  ];
  
  useFrame(({ clock }) => {
    // Gentle swaying animation for lanterns
    if (lanternsRef.current) {
      lanternsRef.current.children.forEach((lantern, i) => {
        const time = clock.getElapsedTime() * 0.5 + i * 0.1;
        lantern.rotation.x = Math.sin(time * 0.3) * 0.05;
        lantern.rotation.z = Math.cos(time * 0.2) * 0.05;
        
        // Pulsing light effect
        const light = lantern.children.find(child => child.type === 'PointLight');
        if (light) {
          light.intensity = 0.5 + Math.sin(time) * 0.1;
        }
      });
    }
  });
  
  return (
    <group ref={lanternsRef}>
      {lanternPositions.map((position, i) => (
        <group key={i} position={position as [number, number, number]}>
          {/* Hanging cord */}
          <mesh position={[0, 0.4, 0]} castShadow>
            <cylinderGeometry args={[0.01, 0.01, 0.8, 8]} />
            <meshStandardMaterial 
              color="#2D3748"
              roughness={0.7}
              metalness={0.3}
            />
          </mesh>
          
          {/* Lantern top cap */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
            <meshStandardMaterial 
              color="#4A5568"
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>
          
          {/* Main lantern body */}
          <mesh position={[0, -0.25, 0]} castShadow>
            <cylinderGeometry args={[0.2, 0.2, 0.5, 16]} />
            <meshStandardMaterial 
              map={paperTexture}
              color="#FFF5E6"
              roughness={0.3}
              metalness={0.1}
              transparent
              opacity={0.8}
              emissive="#FFA726"
              emissiveIntensity={0.2}
            />
          </mesh>
          
          {/* Lantern bottom cap */}
          <mesh position={[0, -0.5, 0]} castShadow>
            <cylinderGeometry args={[0.15, 0.15, 0.05, 16]} />
            <meshStandardMaterial 
              color="#4A5568"
              roughness={0.6}
              metalness={0.4}
            />
          </mesh>
          
          {/* Point light source inside lantern */}
          <pointLight 
            position={[0, -0.25, 0]}
            intensity={0.5}
            distance={5}
            color="#FFA726"
            castShadow
            shadow-mapSize-width={512}
            shadow-mapSize-height={512}
          />
        </group>
      ))}
    </group>
  );
};