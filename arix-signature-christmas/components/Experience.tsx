import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Loader } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { ArixTree } from './Tree';
import { Stage } from './Stage';
import { GoldDust } from './GoldDust';

export const Experience: React.FC = () => {
  return (
    <>
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 12]} fov={50} />
        
        <Suspense fallback={null}>
          <Stage />
          <ArixTree />
          <GoldDust />
          
          <EffectComposer disableNormalPass>
            {/* Cinematic Bloom - Essential for the 'Glow' */}
            <Bloom 
              luminanceThreshold={0.8} 
              mipmapBlur 
              intensity={1.5} 
              radius={0.7} 
            />
            
            {/* Subtle Noise for Film Grain texture */}
            <Noise opacity={0.05} />
            
            {/* Vignette to focus eyes on center */}
            <Vignette eskil={false} offset={0.1} darkness={1.1} />
          </EffectComposer>
        </Suspense>

        <OrbitControls 
          enablePan={false} 
          minPolarAngle={Math.PI / 4} 
          maxPolarAngle={Math.PI / 1.8}
          minDistance={6}
          maxDistance={18}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
      <Loader 
        containerStyles={{ background: '#01150e' }}
        barStyles={{ background: '#C5A059', height: '4px' }}
        dataStyles={{ color: '#C5A059', fontFamily: 'Cinzel', fontSize: '1rem' }}
      />
    </>
  );
};
