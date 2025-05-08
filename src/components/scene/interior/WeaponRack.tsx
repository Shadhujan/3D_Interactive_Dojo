import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface WeaponRackProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
}

export const WeaponRack: React.FC<WeaponRackProps> = ({ 
  position = [0, 0, 0],
  rotation = [0, 0, 0]
}) => {
  const rackRef = useRef<THREE.Group>(null);
  
  // Create wood texture for the rack
  const woodTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/172292/pexels-photo-172292.jpeg');
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(1, 1);
  
  // Create bokken texture
  const bokkenTexture = new THREE.TextureLoader().load('https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg');
  bokkenTexture.wrapS = THREE.RepeatWrapping;
  bokkenTexture.wrapT = THREE.RepeatWrapping;
  bokkenTexture.repeat.set(1, 4);
  
  useFrame(({ clock }) => {
    // Subtle rack animation (gentle swaying)
    if (rackRef.current) {
      const t = clock.getElapsedTime();
      rackRef.current.rotation.z = rotation[2] + Math.sin(t * 0.5) * 0.002;
    }
  });
  
  return (
    <group ref={rackRef} position={position} rotation={rotation}>
      {/* Main rack structure */}
      <group>
        {/* Back board */}
        <mesh position={[0, 0, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.1, 2, 4]} />
          <meshStandardMaterial 
            map={woodTexture}
            color="#8B4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
        
        {/* Support brackets */}
        {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
          <group key={i} position={[0, 0, z]}>
            <mesh position={[0.2, 0, 0]} castShadow>
              <boxGeometry args={[0.4, 0.1, 0.1]} />
              <meshStandardMaterial 
                map={woodTexture}
                color="#A0522D"
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>
            <mesh position={[0.2, -0.15, 0]} rotation={[0, 0, Math.PI/4]} castShadow>
              <boxGeometry args={[0.3, 0.1, 0.1]} />
              <meshStandardMaterial 
                map={woodTexture}
                color="#A0522D"
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>
          </group>
        ))}
        
        {/* Bokken (wooden swords) */}
        {[-1.5, -0.5, 0.5, 1.5].map((z, i) => (
          <group key={`bokken-${i}`} position={[0.3, 0, z]} rotation={[0, 0, -Math.PI/6]}>
            {/* Handle (tsuka) */}
            <mesh position={[0, 0, 0]} castShadow>
              <cylinderGeometry args={[0.03, 0.03, 0.3, 8]} />
              <meshStandardMaterial 
                map={bokkenTexture}
                color="#8B4513"
                roughness={0.7}
                metalness={0.1}
              />
            </mesh>
            
            {/* Blade */}
            <mesh position={[0, 0.5, 0]} castShadow>
              <cylinderGeometry args={[0.02, 0.03, 1, 8]} />
              <meshStandardMaterial 
                map={bokkenTexture}
                color="#A0522D"
                roughness={0.6}
                metalness={0.1}
              />
            </mesh>
            
            {/* Tsuba (hand guard) */}
            <mesh position={[0, 0.15, 0]} rotation={[Math.PI/2, 0, 0]} castShadow>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
              <meshStandardMaterial 
                color="#8B4513"
                roughness={0.7}
                metalness={0.2}
              />
            </mesh>
          </group>
        ))}
        
        {/* Decorative elements */}
        <mesh position={[0, 0.8, 0]} castShadow>
          <boxGeometry args={[0.15, 0.4, 4]} />
          <meshStandardMaterial 
            map={woodTexture}
            color="#8B4513"
            roughness={0.8}
            metalness={0.1}
          />
        </mesh>
      </group>
    </group>
  );
};