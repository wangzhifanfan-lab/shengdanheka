import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Color, AdditiveBlending, ShaderMaterial, Vector3 } from 'three';

const ParticleShaderMaterial = new ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColor: { value: new Color('#FFD700') },
  },
  vertexShader: `
    uniform float uTime;
    attribute float aScale;
    attribute vec3 aVelocity;
    varying vec2 vUv;
    
    void main() {
      vUv = uv;
      vec3 pos = position;
      
      // Floating movement
      pos.y = position.y - mod(uTime * aVelocity.y, 20.0) + 10.0;
      pos.x += sin(uTime * aVelocity.x) * 0.2;
      pos.z += cos(uTime * aVelocity.z) * 0.2;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = aScale * (300.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
  fragmentShader: `
    uniform vec3 uColor;
    void main() {
      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 3.0);
      
      gl_FragColor = vec4(uColor, strength);
    }
  `,
  transparent: true,
  blending: AdditiveBlending,
  depthWrite: false,
});

export const GoldDust: React.FC = () => {
  const count = 300;
  const geomRef = useRef<any>(null);
  const materialRef = useRef<ShaderMaterial>(null);

  const [positions, scales, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sc = new Float32Array(count);
    const vel = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Cylinder distribution
      const r = 5 + Math.random() * 10;
      const theta = Math.random() * Math.PI * 2;
      
      pos[i * 3] = r * Math.cos(theta);
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = r * Math.sin(theta);

      sc[i] = Math.random();
      
      vel[i * 3] = (Math.random() - 0.5) * 0.5; // X wobble
      vel[i * 3 + 1] = 0.5 + Math.random() * 1.5; // Fall speed
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.5; // Z wobble
    }
    return [pos, sc, vel];
  }, []);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <points>
      <bufferGeometry ref={geomRef}>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
        <bufferAttribute attach="attributes-aScale" count={count} array={scales} itemSize={1} />
        <bufferAttribute attach="attributes-aVelocity" count={count} array={velocities} itemSize={3} />
      </bufferGeometry>
      <primitive object={ParticleShaderMaterial} ref={materialRef} attach="material" />
    </points>
  );
};
