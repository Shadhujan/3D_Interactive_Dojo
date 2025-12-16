import React, { useEffect } from 'react';
import { useGLTF, Clone } from '@react-three/drei';

export const BambooGrove: React.FC = () => {
  // Load the glTF model
  const { scene } = useGLTF('/models/bamboo.glb');

  useEffect(() => {
    // Log scene structure for debugging purposes
    console.log('Bamboo GLB Structure:', scene);
  }, [scene]);

  return (
    <group>
      {/* 
        --- BAMBOO 1 (The original one) ---
        Position: x=25, y=0, z=5
      */}
      <Clone 
        object={scene} 
        position={[25, 0, 5]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} // rotated 90 degrees
      />

      {/* 
        --- BAMBOO 2 (New Example) ---
        
        HOW TO CUSTOMIZE:
        
        1. object={scene} -> This keeps the model the same.
        
        2. position={[x, y, z]} 
           - x: Left/Right (Red axis)
           - y: Up/Down (Green axis) -> Keep 0 for ground level
           - z: Forward/Backward (Blue axis)
           Example: position={[28, 0, 5]} moves it 3 units to the right of the first one.

        3. rotation={[x, y, z]}
           - We use "Math.PI" for rotations.
           - Math.PI = 180 degrees
           - Math.PI / 2 = 90 degrees
           Example: rotation={[0, 0, 0]} is default.
           
        4. scale={[x, y, z]}
           - 0.01 is the size we found works best.
           - [0.02, 0.02, 0.02] would be double size.
      */}
      <Clone 
        object={scene} 
        position={[25, 0, 6]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      {/* <Clone 
        object={scene} 
        position={[25, 0, 7]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      <Clone 
        object={scene} 
        position={[25, 0, 8]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      <Clone 
        object={scene} 
        position={[25, 0, 9]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      <Clone 
        object={scene} 
        position={[25, 0, 10]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      <Clone 
        object={scene} 
        position={[25, 0, 11]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      <Clone 
        object={scene} 
        position={[25, 0, 12]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />
      <Clone 
        object={scene} 
        position={[25, 0, 13]} 
        scale={[0.01, 0.01, 0.01]} 
        rotation={[0, -Math.PI / 2, 0]} 
      />   */}
      
      {/* COPY & PASTE the block above to add more trees! Change position numbers. */}
    </group>
  );
};