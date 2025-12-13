import React, { useMemo, useLayoutEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

// --- GEOMETRY & MATERIALS (Created Once) ---
const STALK_GEOMETRY = new THREE.CylinderGeometry(1, 1, 1, 5);
STALK_GEOMETRY.translate(0, 0.5, 0); // Pivot at base
const LEAF_GEOMETRY = new THREE.ConeGeometry(0.08, 0.6, 3);
LEAF_GEOMETRY.translate(0, 0.3, 0); // Pivot at base

// --- COMPONENT ---
export const BambooGrove: React.FC = () => {
  // Textures
  const bambooTexture = useTexture('https://images.pexels.com/photos/192320/pexels-photo-192320.jpeg');
  bambooTexture.wrapS = THREE.RepeatWrapping;
  bambooTexture.wrapT = THREE.RepeatWrapping;
  bambooTexture.repeat.set(1, 5);

  // References
  const stalkMeshRef = useRef<THREE.InstancedMesh>(null);
  const leafMeshRef = useRef<THREE.InstancedMesh>(null);
  
  // Counts
  const STALK_COUNT = 150;
  // Estimate max leaves: 150 stalks * approx 20 leaves each = 3000
  const MAX_LEAVES = 4000; 

  // --- DATA GENERATION (Memoized) ---
  const { stalkData, leafData, totalLeaves } = useMemo(() => {
    const stalks = [];
    const leaves = [];
    
    // Helper to add a stalk
    for (let i = 0; i < STALK_COUNT; i++) {
        const angle = (i / STALK_COUNT) * Math.PI * 1.8 + Math.PI * 0.1;
        const baseRadius = 18 + Math.random() * 8;
        const x = Math.cos(angle) * baseRadius + (Math.random() - 0.5) * 2;
        const z = Math.sin(angle) * baseRadius + (Math.random() - 0.5) * 2;
        
        const height = 6 + Math.random() * 5;
        const thickness = 0.03 + Math.random() * 0.03;
        
        const tiltX = (Math.random() - 0.5) * 0.1;
        const tiltZ = (Math.random() - 0.5) * 0.1;
        
        stalks.push({ position: [x, 0, z], height, thickness, tilt: [tiltX, 0, tiltZ], id: i });

        // Generate leaves relative to this stalk
        const leafCount = Math.floor(height * 2.5);
        for (let j = 0; j < leafCount; j++) {
            const leafH = (height * 0.3) + (Math.random() * height * 0.6);
            leaves.push({
                stalkIndex: i, // Reference parent stalk
                relY: leafH,
                angle: Math.random() * Math.PI * 2,
                scale: 0.5 + Math.random() * 0.5,
                tilt: (Math.random() - 0.5) * 0.5
            });
        }
    }
    return { stalkData: stalks, leafData: leaves, totalLeaves: leaves.length };
  }, []);

  // --- INITIAL LAYOUT ---
  useLayoutEffect(() => {
    if (!stalkMeshRef.current || !leafMeshRef.current) return;
    
    const dummy = new THREE.Object3D();

    // 1. Set Stalks
    stalkData.forEach((stalk, i) => {
      dummy.position.set(stalk.position[0], stalk.position[1], stalk.position[2]);
      // Base rotation (tilt)
      dummy.rotation.set(stalk.tilt[0], 0, stalk.tilt[2]);
      dummy.scale.set(stalk.thickness, stalk.height, stalk.thickness); // Y scale = height
      dummy.updateMatrix();
      stalkMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    stalkMeshRef.current.instanceMatrix.needsUpdate = true;

    // 2. Set Leaves (Initial positions)
    // For static performance, we calculate world position roughly
    leafData.forEach((leaf, i) => {
       const parentStalk = stalkData[leaf.stalkIndex];
       
       // Calculate leaf position based on parent stalk pos + height offset
       // Approximation: We mostly ignore parent tilt for initial placement simplicity or apply basic offset
       dummy.position.set(parentStalk.position[0], leaf.relY, parentStalk.position[2]);
       
       // Rotation
       dummy.rotation.set(0, leaf.angle, -1.2 + leaf.tilt);
       dummy.scale.set(leaf.scale, leaf.scale, leaf.scale);
       dummy.updateMatrix();
       leafMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    leafMeshRef.current.instanceMatrix.needsUpdate = true;
  }, [stalkData, leafData]);

  // --- ANIMATION ---
  useFrame(({ clock }) => {
    if (!stalkMeshRef.current || !leafMeshRef.current) return;
    
    const t = clock.getElapsedTime();
    const dummy = new THREE.Object3D();
    
    // We only animate specific stalks close to camera or just generic update?
    // Updating 150 + 4000 items is expensive in JS.
    // OPTIMIZATION: We will ONLY update the STALKS sway.
    // Leaves will stay static for 'Ultra' performance. 
    // Small sway on leaves is nice but costly in JS.
    
    let needsUpdate = false;
    
    // Animate a subset or simplified wave?
    // Actually, let's keep it STATIC for now to guarantee 60FPS. 
    // If user wants sway, shader is needed.
    // Uncomment below to enabling sway (Might incur CPU cost)
    /*
    stalkData.forEach((stalk, i) => {
        const wind = Math.sin(t * 1 + stalk.position[0] * 0.5) * 0.02; // Simple wave
        
        dummy.position.set(stalk.position[0], stalk.position[1], stalk.position[2]);
        dummy.rotation.set(stalk.tilt[0] + wind, 0, stalk.tilt[2] + wind); // Apply wind
        dummy.scale.set(stalk.thickness, stalk.height, stalk.thickness);
        dummy.updateMatrix();
        stalkMeshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    stalkMeshRef.current.instanceMatrix.needsUpdate = true;
    */
  });

  return (
    <group>
      {/* 1. All Stalks (1 Draw Call) */}
      <instancedMesh
        ref={stalkMeshRef}
        args={[STALK_GEOMETRY, undefined, STALK_COUNT]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial 
          map={bambooTexture}
          color="#558B2F"
          roughness={0.6}
          metalness={0.1}
        />
      </instancedMesh>

      {/* 2. All Leaves (1 Draw Call) */}
      <instancedMesh
        ref={leafMeshRef}
        args={[LEAF_GEOMETRY, undefined, totalLeaves]}
        // Optimization: Disable castShadow on leaves for massive FPS gain
        // receiveShadow
      >
         <meshStandardMaterial 
           color="#7CB342" 
           side={THREE.DoubleSide} 
           roughness={0.5} 
         />
      </instancedMesh>
    </group>
  );
};