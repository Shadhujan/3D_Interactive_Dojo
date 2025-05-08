import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface KamidanaProps {
  position?: [number, number, number];
}

export const Kamidana: React.FC<KamidanaProps> = ({ position = [0, 0, 0] }) => {
  const shrineRef = useRef<THREE.Group>(null);
  
  // Create wood texture for the shrine
  const woodTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg');
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);
  
  useFrame(({ clock }) => {
    // Subtle shrine animation (gentle floating effect)
    if (shrineRef.current) {
      const t = clock.getElapsedTime();
      shrineRef.current.position.y = position[1] + Math.sin(t * 0.5) * 0.002;
    }
  });
  
  return (
    <group ref={shrineRef} position={position}>
      {/* Main shrine structure */}
      <group>
        {/* Base platform */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[2, 0.1, 1]} />
          <meshStandardMaterial 
            map={woodTexture}
            color="#8B4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Back wall */}
        <mesh position={[0, 0.6, -0.4]} castShadow>
          <boxGeometry args={[2, 1, 0.1]} />
          <meshStandardMaterial 
            map={woodTexture}
            color="#A0522D"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        {/* Roof */}
        <group position={[0, 1.1, -0.2]}>
          <mesh castShadow>
            <boxGeometry args={[2.2, 0.1, 1.2]} />
            <meshStandardMaterial 
              color="#8B4513"
              roughness={0.8}
              metalness={0.1}
            />
          </mesh>
          
          {/* Decorative roof peak */}
          <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI/4]} castShadow>
            <boxGeometry args={[0.4, 0.4, 1.2]} />
            <meshStandardMaterial 
              color="#A0522D"
              roughness={0.7}
              metalness={0.1}
            />
          </mesh>
        </group>
        
        {/* Offering platform */}
        <mesh position={[0, 0.3, 0]} castShadow>
          <boxGeometry args={[1.5, 0.05, 0.6]} />
          <meshStandardMaterial 
            map={woodTexture}
            color="#DEB887"
            roughness={0.6}
            metalness={0.2}
          />
        </mesh>
        
        {/* Decorative elements */}
        {[-0.6, 0, 0.6].map((x, i) => (
          <group key={i} position={[x, 0.35, 0]}>
            {/* Offering bowls */}
            <mesh castShadow>
              <cylinderGeometry args={[0.1, 0.08, 0.1, 16]} />
              <meshStandardMaterial 
                color="#FFD700"
                roughness={0.3}
                metalness={0.8}
              />
            </mesh>
            
            {/* Candle flames */}
            <mesh position={[0, 0.15, 0]}>
              <sphereGeometry args={[0.02, 8, 8]} />
              <meshStandardMaterial 
                emissive="#FFA500"
                emissiveIntensity={2}
                toneMapped={false}
              />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
};