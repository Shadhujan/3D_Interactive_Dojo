import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// Generate positions for bamboo in a semi-circle around the perimeter
const count = 30;
const radius = 20;
const bambooPositions: [number, number, number][] = [];

for (let i = 0; i < count; i++) {
  const angle = (i / count) * Math.PI * 1.5 + Math.PI / 4;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  bambooPositions.push([x, 0, z]);
}

export const BambooGrove: React.FC = () => {
  const bambooRef = useRef<THREE.Group>(null);
  
  // Create bamboo texture
  const bambooTexture = useTexture('https://images.pexels.com/photos/192320/pexels-photo-192320.jpeg');
  bambooTexture.wrapS = THREE.RepeatWrapping;
  bambooTexture.wrapT = THREE.RepeatWrapping;
  bambooTexture.repeat.set(1, 5);
  
  // Create bamboo leaf texture
  const leafTexture = useTexture('https://images.pexels.com/photos/807598/pexels-photo-807598.jpeg');
  
  interface BambooData {
    position: [number, number, number];
    height: number;
    segments: number;
    leaves: { leafHeight: number; leafAngle: number; leafSize: number; j: number }[];
    i: number;
  }

  const [bambooData] = useState<BambooData[]>(() => 
    bambooPositions.map((position, i) => {
      const height = 4 + Math.random() * 3;
      const segments = Math.floor(height / 0.5);
      const leaves = [...Array(Math.floor(height / 1.5))].map((_, j) => ({
        leafHeight: height * 0.6 + j * 0.5,
        leafAngle: Math.random() * Math.PI * 2,
        leafSize: 0.3 + Math.random() * 0.3,
        j
      }));
      return { position, height, segments, leaves, i };
    })
  );
  
  useFrame(({ clock }) => {
    // Animate bamboo swaying gently
    if (bambooRef.current) {
      bambooRef.current.children.forEach((bamboo, i) => {
        const time = clock.getElapsedTime() * 0.5 + i * 0.1;
        bamboo.rotation.x = Math.sin(time * 0.3) * 0.05;
        bamboo.rotation.z = Math.cos(time * 0.2) * 0.05;
      });
    }
  });
  
  return (
    <group ref={bambooRef}>
      {bambooData.map(({ position, segments, leaves, i }) => (
          <group key={i} position={position}>
            {/* Bamboo stalk with segments */}
            {[...Array(segments)].map((_, j) => (
              <mesh 
                key={`stalk-${j}`} 
                position={[0, j * 0.5 + 0.25, 0]} 
                castShadow
              >
                <cylinderGeometry args={[0.1, 0.1, 0.5, 8]} />
                <meshStandardMaterial 
                  map={bambooTexture}
                  color="#8BC34A"
                  roughness={0.7}
                  metalness={0.1}
                />
              </mesh>
            ))}
            
            {/* Bamboo joints */}
            {[...Array(segments - 1)].map((_, j) => (
              <mesh 
                key={`joint-${j}`} 
                position={[0, (j + 1) * 0.5, 0]} 
                castShadow
              >
                <cylinderGeometry args={[0.12, 0.12, 0.05, 8]} />
                <meshStandardMaterial 
                  color="#689F38"
                  roughness={0.7}
                  metalness={0.1}
                />
              </mesh>
            ))}
            
            {/* Bamboo leaves */}
            {leaves.map(({ leafHeight, leafAngle, leafSize, j }) => (
                <group 
                  key={`leaf-group-${j}`} 
                  position={[0, leafHeight, 0]}
                  rotation={[0, leafAngle, 0]}
                >
                  {[...Array(3)].map((_, k) => (
                    <mesh 
                      key={`leaf-${j}-${k}`} 
                      position={[0.3, k * 0.1, 0]} 
                      rotation={[Math.PI/2 - 0.3, 0, 0]}
                      castShadow
                    >
                      <planeGeometry args={[leafSize, leafSize * 3]} />
                      <meshStandardMaterial 
                        map={leafTexture}
                        color="#7CB342"
                        roughness={0.8}
                        metalness={0.1}
                        side={THREE.DoubleSide}
                      />
                    </mesh>
                  ))}
                </group>
            ))}
          </group>
      ))}
    </group>
  );
};