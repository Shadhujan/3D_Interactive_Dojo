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
    // WORLD BOUNDARY: The player is confined to a circular area with a radius of 25 units.
    // If the distance from the center (0,0,0) exceeds this radius, a collision is detected.
    const boundaryRadius = 25;
    if (Math.sqrt(position.x * position.x + position.z * position.z) > boundaryRadius) {
      return true; // Out of bounds
    }
    
    return false; // No collision
  };
  
  return { checkCollision };
};