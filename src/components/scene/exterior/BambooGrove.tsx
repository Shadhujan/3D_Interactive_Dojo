import React, { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// Reuse geometry and materials to save memory
const LEAF_GEOMETRY = new THREE.ConeGeometry(0.08, 0.6, 4);
LEAF_GEOMETRY.translate(0, 0.3, 0); // Pivot at base

const LEAF_MATERIAL = new THREE.MeshStandardMaterial({
  color: "#7CB342",
  roughness: 0.5,
  metalness: 0.1,
  side: THREE.DoubleSide
});

// Single Bamboo Stalk Component using InstancedMesh for its leaves
const BambooStalk = React.memo(({ data, texture, windOffset }: { data: any, texture: any, windOffset: number }) => {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  // Update leaf instances
  useLayoutEffect(() => {
    if (!meshRef.current) return;
    
    const tempObject = new THREE.Object3D();
    
    data.leaves.forEach((leaf: any, i: number) => {
      tempObject.position.set(0, leaf.y, 0);
      tempObject.rotation.set(0, leaf.angle, -1.2 + leaf.tilt); // Point outward and tilt
      tempObject.scale.set(leaf.scale, leaf.scale, leaf.scale);
      tempObject.updateMatrix();
      meshRef.current!.setMatrixAt(i, tempObject.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [data.leaves]);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      const t = clock.getElapsedTime();
      // Simple wind sway
      const wind = Math.sin(t * 0.5 + windOffset) * 0.02;
      groupRef.current.rotation.z = (data.tilt[2] ?? 0) + wind;
      groupRef.current.rotation.x = (data.tilt[0] ?? 0) + Math.cos(t * 0.3 + windOffset) * 0.01;
    }
  });

  return (
    <group ref={groupRef} position={data.position}>
      {/* Stalk */}
      <mesh 
        position={[0, data.height / 2, 0]} 
        castShadow 
        receiveShadow
      >
        <cylinderGeometry args={[data.thickness, data.thickness * 1.2, data.height, 5]} />
        <meshStandardMaterial 
          map={texture}
          color="#558B2F"
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>
      
      {/* Instanced Leaves - extremely efficient rendering */}
      <instancedMesh
        ref={meshRef}
        args={[LEAF_GEOMETRY, LEAF_MATERIAL, data.leaves.length]}
        castShadow
      />
    </group>
  );
});

export const BambooGrove: React.FC = () => {
  // Create bamboo texture
  const bambooTexture = useTexture('https://images.pexels.com/photos/192320/pexels-photo-192320.jpeg');
  bambooTexture.wrapS = THREE.RepeatWrapping;
  bambooTexture.wrapT = THREE.RepeatWrapping;
  bambooTexture.repeat.set(1, 5);

  // Constants for generation
  const COUNT = 150;
  
  // Generate data once
  const bambooData = useMemo(() => {
    const data = [];
    
    for (let i = 0; i < COUNT; i++) {
      // Cluster generation logic
      const angle = (i / COUNT) * Math.PI * 1.8 + Math.PI * 0.1;
      const baseRadius = 18 + Math.random() * 8;
      
      const x = Math.cos(angle) * baseRadius + (Math.random() - 0.5) * 2;
      const z = Math.sin(angle) * baseRadius + (Math.random() - 0.5) * 2;
      
      const height = 6 + Math.random() * 5;
      const thickness = 0.03 + Math.random() * 0.03;
      
      const tiltX = (Math.random() - 0.5) * 0.1;
      const tiltZ = (Math.random() - 0.5) * 0.1;
      
      const leaves = [];
      const leafCount = Math.floor(height * 2);
      
      for (let j = 0; j < leafCount; j++) {
        const leafH = (height * 0.4) + (Math.random() * height * 0.6);
        leaves.push({
          y: leafH,
          angle: Math.random() * Math.PI * 2,
          scale: 0.5 + Math.random() * 0.5,
          tilt: (Math.random() - 0.5) * 0.5
        });
      }

      data.push({
        position: [x, 0, z] as [number, number, number],
        height,
        thickness,
        tilt: [tiltX, 0, tiltZ] as [number, number, number],
        leaves
      });
    }
    return data;
  }, []);
  
  return (
    <group>
      {bambooData.map((bamboo, i) => (
        <BambooStalk 
          key={i} 
          data={bamboo} 
          texture={bambooTexture}
          windOffset={i * 0.1}
        />
      ))}
    </group>
  );
};