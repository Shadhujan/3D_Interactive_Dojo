import { useRef } from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

interface DojoBuildingProps {
  position?: [number, number, number];
}

export const DojoBuilding: React.FC<DojoBuildingProps> = ({ position = [0, 0, 0] }) => {
  const buildingRef = useRef<THREE.Group>(null);
  
  // Create wood texture
  // Create wood texture
  const woodTexture = useTexture('https://images.pexels.com/photos/129733/pexels-photo-129733.jpeg');
  woodTexture.wrapS = THREE.RepeatWrapping;
  woodTexture.wrapT = THREE.RepeatWrapping;
  woodTexture.repeat.set(4, 4);
  
  // Create roof texture
  const roofTexture = useTexture('https://images.pexels.com/photos/220182/pexels-photo-220182.jpeg');
  roofTexture.wrapS = THREE.RepeatWrapping;
  roofTexture.wrapT = THREE.RepeatWrapping;
  roofTexture.repeat.set(8, 8);
  
  return (
    <group ref={buildingRef} position={position}>
      {/* Main structure */}
      <mesh position={[0, 1.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[12, 3, 12]} />
        <meshStandardMaterial 
          map={woodTexture}
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Roof */}
      <group position={[0, 3, 0]}>
        {/* Roof base */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[14, 1, 14]} />
          <meshStandardMaterial 
            map={roofTexture}
            color="#5D4037"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        {/* Roof top (sloped) */}
        <mesh position={[0, 2, 0]} rotation={[0, Math.PI/4, 0]} castShadow>
          <coneGeometry args={[10, 3, 4]} />
          <meshStandardMaterial 
            map={roofTexture}
            color="#4E342E"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
      </group>
      
      {/* Front entrance */}
      <mesh position={[0, 1.5, 6.01]} receiveShadow>
        <boxGeometry args={[4, 2.5, 0.1]} />
        <meshStandardMaterial 
          color="#2D2522"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
      
      {/* Steps */}
      <mesh position={[0, 0.1, 7]} receiveShadow>
        <boxGeometry args={[4, 0.2, 2]} />
        <meshStandardMaterial 
          color="#8D6E63"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
};