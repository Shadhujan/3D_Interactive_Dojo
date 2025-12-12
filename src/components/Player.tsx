import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Vector3, Euler } from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useMouseControls } from '../hooks/useMouseControls';
import { useCollisionDetection } from '../hooks/useCollisionDetection';

interface PlayerProps {
  isFirstPerson: boolean;
}

export const Player: React.FC<PlayerProps> = ({ isFirstPerson }) => {
  const { camera } = useThree();
  const playerRef = useRef<THREE.Mesh>(null);
  const velocity = useRef(new Vector3());
  const position = useRef(new Vector3(0, 1.7, 5));
  const direction = useRef(new Vector3());
  const isMoving = useRef(false);
  
  // Set up controls
  const { moveForward, moveBackward, moveLeft, moveRight, run } = useKeyboardControls();
  useMouseControls(); // Hook maintains camera rotation internally
  const { checkCollision } = useCollisionDetection();
  
  // Debug log removed

  
  // Update player position based on controls
  useFrame((_, delta) => {
    if (!isFirstPerson) return;
    
    const speed = run ? 5 : 2;
    direction.current.set(0, 0, 0);
    
    // Log input state
    const inputState = {
      forward: moveForward,
      backward: moveBackward,
      left: moveLeft,
      right: moveRight,
      run: run
    };
    
    if (Object.values(inputState).some(Boolean) !== isMoving.current) {
      isMoving.current = !isMoving.current;
      console.log('Movement input state:', inputState);
    }
    
    // Calculate movement direction based on keys pressed
    if (moveForward) direction.current.z -= 1;
    if (moveBackward) direction.current.z += 1;
    if (moveLeft) direction.current.x -= 1;
    if (moveRight) direction.current.x += 1;
    
    // Log movement calculation
    if (direction.current.length() > 0) {
      console.log('Movement calculation:', {
        rawDirection: direction.current.clone(),
        speed,
        delta
      });
      
      direction.current.normalize();
    }
    
    // Create a rotation based on camera's Y rotation only
    const rotationEuler = new Euler(0, camera.rotation.y, 0);
    
    // Apply camera rotation to movement direction
    direction.current.applyEuler(rotationEuler);
    
    // Update velocity based on input direction
    velocity.current.x = direction.current.x * speed * delta;
    velocity.current.z = direction.current.z * speed * delta;
    
    // Check for collisions before applying movement
    const newPosition = position.current.clone().add(velocity.current);
    const hasCollision = checkCollision(newPosition);
    
    if (hasCollision) {
      console.log('Collision detected:', {
        currentPos: position.current.clone(),
        attemptedPos: newPosition,
        velocity: velocity.current.clone()
      });
    }
    
    if (!hasCollision) {
      position.current.copy(newPosition);
      
      // Log successful movement
      if (isMoving.current) {
        console.log('Position updated:', {
          position: position.current.clone(),
          velocity: velocity.current.clone()
        });
      }
    }
    
    // Update player and camera position
    if (playerRef.current) {
      playerRef.current.position.copy(position.current);
    }
    
    camera.position.copy(position.current);
  });
  
  return (
    <mesh ref={playerRef} position={[0, 1.7, 5]}>
      {/* Only render player body if not in first person */}
      {!isFirstPerson && (
        <>
          <capsuleGeometry args={[0.3, 1.4, 4, 8]} />
          <meshStandardMaterial color="#3B82F6" opacity={0.7} transparent />
        </>
      )}
    </mesh>
  );
};