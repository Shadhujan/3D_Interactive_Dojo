import React from 'react';
import { DoubleSide } from 'three';

interface BoundaryVisualizerProps {
  visible: boolean;
}

export const BoundaryVisualizer: React.FC<BoundaryVisualizerProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <group position={[0, 0, 0]}>
      {/* Boundary Cylinder - Transparent Red Wall */}
      <mesh rotation={[0, 0, 0]} position={[0, 1.5, 0]}>
        {/* Radius 25, height 3, 32 segments, open-ended */}
        <cylinderGeometry args={[25, 25, 3, 64, 1, true]} />
        <meshBasicMaterial 
          color="#ff0000" 
          transparent 
          opacity={0.2} 
          side={DoubleSide} 
          wireframe={false}
        />
      </mesh>
      
      {/* Wireframe Outline for better visibility */}
      <mesh rotation={[0, 0, 0]} position={[0, 1.5, 0]}>
        <cylinderGeometry args={[25, 25, 3, 64, 1, true]} />
        <meshBasicMaterial 
          color="#ff0000" 
          wireframe 
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
  );
};
