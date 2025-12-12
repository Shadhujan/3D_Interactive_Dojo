import React from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { Sky, Environment } from '@react-three/drei';
import { Scene } from './Scene';
import { Character } from './Character';
import { Lighting } from './Lighting';

export const DojoExperience: React.FC = () => {
  const [contextLost, setContextLost] = React.useState(false);

  // Helper component to listen for context loss
  const ContextLossListener = () => {
    const { gl } = useThree();
    React.useEffect(() => {
      const handleContextLost = (event: Event) => {
        event.preventDefault();
        console.error("WebGL Context Lost!");
        setContextLost(true);
      };
      
      const canvas = gl.domElement;
      canvas.addEventListener('webglcontextlost', handleContextLost, false);
      
      return () => {
        canvas.removeEventListener('webglcontextlost', handleContextLost);
      };
    }, [gl]);
    return null;
  };

  return (
    <>
      {contextLost && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0,0,0,0.85)',
          color: 'red',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          fontSize: '2rem',
          fontWeight: 'bold'
        }}>
          <div>CRITICIAL ERROR: WebGL CONTEXT LOST</div>
          <div style={{fontSize: '1rem', color: 'white', marginTop: '1rem'}}>
            The GPU crashed or ran out of memory.
          </div>
        </div>
      )}
      <Canvas
        shadows
        camera={{ position: [0, 2, 5], fov: 60 }}
        className="w-full h-full"
      >
        <ContextLossListener />
        {/* Environment */}
        <Sky sunPosition={[100, 20, 100]} />
        <Environment preset="sunset" />
        
        {/* Scene */}
        <Scene />
        
        {/* Lighting */}
        <Lighting />
        
        {/* Character */}
        <Character />
         
      </Canvas>
    </>
  );
};