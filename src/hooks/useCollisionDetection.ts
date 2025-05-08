import { useRef } from 'react';
import { Vector3 } from 'three';

// Simple collision detection for the demo
export const useCollisionDetection = () => {
  // Define obstacles as simple bounding boxes
  const obstacles = useRef([
    // Main dojo building
    {
      min: new Vector3(-6, 0, -6),
      max: new Vector3(6, 3, 6)
    },
    // Pond area
    {
      min: new Vector3(-13, 0, -10),
      max: new Vector3(-3, 0.5, 0)
    }
  ]);
  
  // Check if a position collides with any obstacle
  const checkCollision = (position: Vector3): boolean => {
    for (const obstacle of obstacles.current) {
      if (
        position.x > obstacle.min.x && position.x < obstacle.max.x &&
        position.y > obstacle.min.y && position.y < obstacle.max.y &&
        position.z > obstacle.min.z && position.z < obstacle.max.z
      ) {
        return true; // Collision detected
      }
    }
    
    // Check boundaries of the environment
    const boundaryRadius = 25;
    if (Math.sqrt(position.x * position.x + position.z * position.z) > boundaryRadius) {
      return true; // Out of bounds
    }
    
    return false; // No collision
  };
  
  return { checkCollision };
};