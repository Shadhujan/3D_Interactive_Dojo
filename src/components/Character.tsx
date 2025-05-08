import React, { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboardControls } from '../hooks/useKeyboardControls';
import { useCollisionDetection } from '../hooks/useCollisionDetection';

export const Character: React.FC = () => {
  const characterRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  
  // Movement state
  const velocity = useRef(new THREE.Vector3());
  const direction = useRef(new THREE.Vector3());
  const rotation = useRef(new THREE.Euler(0, 0, 0));
  const speed = useRef(0);
  const targetRotation = useRef(0);
  
  // Get keyboard controls
  const { moveForward, moveBackward, moveLeft, moveRight, run } = useKeyboardControls();
  const { checkCollision } = useCollisionDetection();
  
  // Handle movement
  useFrame((state, delta) => {
    if (!characterRef.current) return;
    
    // Calculate movement direction
    direction.current.set(0, 0, 0);
    speed.current = 0;
    
    if (moveForward) {
      direction.current.z -= 1;
      speed.current = run ? 5 : 2;
    } else if (moveBackward) {
      direction.current.z += 1;
      speed.current = run ? 4 : 1.5;
    }
    
    if (moveLeft) {
      direction.current.x -= 1;
      speed.current = run ? 4 : 1.5;
    } else if (moveRight) {
      direction.current.x += 1;
      speed.current = run ? 4 : 1.5;
    }
    
    // Normalize direction and apply speed
    if (direction.current.length() > 0) {
      direction.current.normalize();
      
      // Calculate target rotation based on movement direction
      targetRotation.current = Math.atan2(direction.current.x, direction.current.z);
      
      // Smoothly rotate character
      const rotationSpeed = 10;
      const angleDiff = THREE.MathUtils.euclideanModulo(targetRotation.current - rotation.current.y, 2 * Math.PI);
      rotation.current.y += angleDiff * rotationSpeed * delta;
      
      // Update character rotation
      characterRef.current.rotation.y = rotation.current.y;
    }
    
    // Update velocity and check collisions
    velocity.current.x = direction.current.x * speed.current * delta;
    velocity.current.z = direction.current.z * speed.current * delta;
    
    const newPosition = characterRef.current.position.clone().add(velocity.current);
    
    if (!checkCollision(newPosition)) {
      characterRef.current.position.copy(newPosition);
      
      // Update camera position to follow character
      const cameraOffset = new THREE.Vector3(0, 2, 5);
      const targetCameraPosition = newPosition.clone().add(cameraOffset);
      camera.position.lerp(targetCameraPosition, 0.1);
      camera.lookAt(newPosition);
    }
  });
  
  return (
    <group ref={characterRef}>
      {/* Character body */}
      <mesh castShadow position={[0, 1, 0]}>
        <capsuleGeometry args={[0.3, 1, 8, 16]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      {/* Head */}
      <mesh castShadow position={[0, 1.8, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial color="#4A5568" />
      </mesh>
      
      {/* Eyes */}
      <mesh position={[0.1, 1.85, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
      <mesh position={[-0.1, 1.85, 0.2]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshStandardMaterial color="white" />
      </mesh>
    </group>
  );
};