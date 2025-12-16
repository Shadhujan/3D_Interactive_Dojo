import React, { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

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
        Single Instance for Verification 
        Positioned at [25, 0, 5] to be clearly visible 
        Scaled to 0.01 as requested
      */}
      <primitive 
        object={scene} 
        position={[25, 0, 5]} 
        scale={[0.01, 0.01, 0.01]}
        rotation={[0, -Math.PI / 2, 0]} 
      />
    </group>
  );
};