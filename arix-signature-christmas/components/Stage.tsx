import React from 'react';
import { Environment, ContactShadows, MeshReflectorMaterial } from '@react-three/drei';

export const Stage: React.FC = () => {
  return (
    <group>
      {/* Cinematic Lighting */}
      <ambientLight intensity={0.2} color="#001a10" />
      <spotLight 
        position={[10, 20, 10]} 
        angle={0.25} 
        penumbra={1} 
        intensity={2} 
        color="#ffecd1" 
        castShadow 
        shadow-bias={-0.0001}
      />
      <spotLight 
        position={[-10, 5, -10]} 
        angle={0.4} 
        penumbra={1} 
        intensity={2} 
        color="#C5A059" 
      />
      
      {/* Backlight for Rim Effect */}
      <spotLight
        position={[0, 10, -15]}
        angle={0.5}
        intensity={1.5}
        color="#00ff9d"
      />

      {/* Reflective Floor - High Luxury */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4.1, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={15} // Strong reflections for gold look
          depthScale={1}
          minDepthThreshold={0.85}
          color="#010a06"
          metalness={0.8}
          roughness={0.4} 
          mirror={0} // Fixed: Provide required prop
        />
      </mesh>
      
      {/* Environment Map for reflections on ornaments */}
      <Environment preset="city" /> 

      {/* Dynamic Background Fog */}
      <color attach="background" args={['#000503']} />
      <fog attach="fog" args={['#000503', 10, 40]} />
    </group>
  );
};
