import React, { useMemo, useRef } from 'react';
import { Group, Vector3, CatmullRomCurve3 } from 'three';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import { TreeMaterial, GoldMaterial, RedOrnamentMaterial, LightMaterial, CookieMaterial, WhiteMaterial, SnowMaterial, RibbonMaterial } from './Materials';

const LAYERS = 8; // Increased layers for height
const BASE_RADIUS = 4.2;
const HEIGHT_STEP = 1.6;

// --- Sub-Components for Decoration Types ---

const GiftBox: React.FC = () => (
  <group>
    <mesh material={RedOrnamentMaterial} castShadow>
      <boxGeometry args={[0.35, 0.35, 0.35]} />
    </mesh>
    <mesh material={GoldMaterial} position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
      <boxGeometry args={[0.35, 0.08, 0.35]} />
    </mesh>
    <mesh material={GoldMaterial} position={[0, 0, 0]} scale={[1.02, 1.02, 1.02]}>
      <boxGeometry args={[0.08, 0.35, 0.35]} />
    </mesh>
  </group>
);

const CandyCane: React.FC = () => (
  <group rotation={[Math.PI, 0, 0]} scale={[0.8, 0.8, 0.8]}>
    {/* Main Stick */}
    <mesh material={WhiteMaterial} position={[0, 0.2, 0]}>
      <cylinderGeometry args={[0.04, 0.04, 0.6, 12]} />
    </mesh>
    {/* Curve */}
    <mesh material={WhiteMaterial} position={[0, 0.5, 0.1]} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.1, 0.04, 12, 16, Math.PI]} />
    </mesh>
    {/* Red Stripes (Simplified as rings) */}
    <mesh material={RedOrnamentMaterial} position={[0, 0.1, 0]}>
       <torusGeometry args={[0.045, 0.01, 8, 16]} />
    </mesh>
    <mesh material={RedOrnamentMaterial} position={[0, 0.3, 0]}>
       <torusGeometry args={[0.045, 0.01, 8, 16]} />
    </mesh>
    <mesh material={RedOrnamentMaterial} position={[0, 0.55, 0.03]} rotation={[Math.PI/4, 0, 0]}>
       <torusGeometry args={[0.045, 0.01, 8, 16]} />
    </mesh>
  </group>
);

const GingerbreadMan: React.FC = () => (
  <group scale={[0.8, 0.8, 0.8]}>
    {/* Head */}
    <mesh material={CookieMaterial} position={[0, 0.25, 0]}>
      <sphereGeometry args={[0.12, 16, 16]} />
    </mesh>
    {/* Body */}
    <mesh material={CookieMaterial} position={[0, 0, 0]} scale={[1, 0.8, 0.5]}>
      <sphereGeometry args={[0.15, 16, 16]} />
    </mesh>
    {/* Arms */}
    <mesh material={CookieMaterial} position={[-0.15, 0.05, 0]} rotation={[0, 0, 0.5]}>
      <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
    </mesh>
    <mesh material={CookieMaterial} position={[0.15, 0.05, 0]} rotation={[0, 0, -0.5]}>
      <capsuleGeometry args={[0.05, 0.2, 4, 8]} />
    </mesh>
    {/* Buttons */}
    <mesh material={WhiteMaterial} position={[0, 0.05, 0.12]}>
      <sphereGeometry args={[0.02]} />
    </mesh>
    <mesh material={WhiteMaterial} position={[0, -0.05, 0.12]}>
      <sphereGeometry args={[0.02]} />
    </mesh>
  </group>
);

const StarShape: React.FC = () => (
  <mesh material={GoldMaterial}>
    <octahedronGeometry args={[0.2, 0]} />
  </mesh>
);

const Stocking: React.FC = () => (
    <group scale={[0.8, 0.8, 0.8]}>
        {/* Leg */}
        <mesh material={RedOrnamentMaterial} position={[0, 0.1, 0]}>
            <capsuleGeometry args={[0.08, 0.3, 4, 8]} />
        </mesh>
        {/* Foot */}
        <mesh material={RedOrnamentMaterial} position={[0.1, -0.1, 0]} rotation={[0, 0, -Math.PI/3]}>
            <capsuleGeometry args={[0.08, 0.25, 4, 8]} />
        </mesh>
        {/* Fluff */}
        <mesh material={WhiteMaterial} position={[0, 0.25, 0]}>
            <cylinderGeometry args={[0.09, 0.09, 0.1, 12]} />
        </mesh>
    </group>
);

const Snowflake: React.FC = () => (
  <group scale={[0.4, 0.4, 0.4]}>
    <mesh material={SnowMaterial}>
      <boxGeometry args={[1, 0.08, 0.05]} />
    </mesh>
    <mesh material={SnowMaterial} rotation={[0, 0, Math.PI / 3]}>
      <boxGeometry args={[1, 0.08, 0.05]} />
    </mesh>
    <mesh material={SnowMaterial} rotation={[0, 0, -Math.PI / 3]}>
      <boxGeometry args={[1, 0.08, 0.05]} />
    </mesh>
  </group>
);

const Ribbon: React.FC<{ offset?: number }> = ({ offset = 0 }) => {
  const curve = useMemo(() => {
    const points: Vector3[] = [];
    const steps = 100; // points along the ribbon
    const turns = 4.5; // Number of times it wraps around
    const startY = -4.0;
    const endY = 5.0;
    const startRadius = 4.3; // Slightly wider than base radius
    const endRadius = 0.4; // Taper to top

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      // Interpolate height
      const y = startY + t * (endY - startY);
      
      // Interpolate radius (linear taper) with a bit of a curve
      const r = startRadius * (1 - t) + endRadius * t; 
      
      // Angle
      const theta = offset + t * Math.PI * 2 * turns;
      
      const x = r * Math.cos(theta);
      const z = r * Math.sin(theta);
      points.push(new Vector3(x, y, z));
    }
    return new CatmullRomCurve3(points);
  }, [offset]);

  return (
    <mesh>
      <tubeGeometry args={[curve, 128, 0.11, 8, false]} />
      <primitive object={RibbonMaterial} />
    </mesh>
  );
};

// --- Main Tree Component ---

export const ArixTree: React.FC = () => {
  const groupRef = useRef<Group>(null);
  
  // Create layers of the tree
  const treeLayers = useMemo(() => {
    return new Array(LAYERS).fill(0).map((_, i) => {
      const scale = 1 - i * 0.12;
      const y = i * (HEIGHT_STEP * 0.85) - 4.5; // Adjusted height distribution
      const radius = BASE_RADIUS * (1 - i * 0.11);
      return { scale, y, radius, id: i };
    });
  }, []);

  // Animate the tree slightly breathing
  useFrame((state) => {
    if (groupRef.current) {
      const t = state.clock.getElapsedTime();
      groupRef.current.rotation.y = Math.sin(t * 0.03) * 0.03; // Very subtle sway
    }
  });

  return (
    <group ref={groupRef}>
      {/* Ribbons Wrapping Around */}
      <Ribbon offset={0} />
      <Ribbon offset={Math.PI} />

      {/* Tree Body - Stacked Cones for stylized look */}
      {treeLayers.map((layer) => (
        <group key={layer.id} position={[0, layer.y, 0]}>
          <mesh 
            castShadow 
            receiveShadow 
            material={TreeMaterial}
            scale={[layer.scale, 1, layer.scale]}
          >
            <coneGeometry args={[4.0, 2.6, 11, 1]} />
          </mesh>
          <mesh 
            castShadow 
            receiveShadow 
            material={TreeMaterial}
            position={[0, -0.5, 0]}
            rotation={[0, Math.PI / 8, 0]}
            scale={[layer.scale * 1.15, 1, layer.scale * 1.15]}
          >
             <coneGeometry args={[4.0, 2.6, 11, 1]} />
          </mesh>
          
          {/* Ornaments per layer */}
          <LayerOrnaments radius={layer.radius * 0.9} yOffset={-0.8} count={Math.floor(45 + (8 - layer.id) * 8)} />
        </group>
      ))}

      {/* Tree Top Star */}
      <group position={[0, LAYERS * (HEIGHT_STEP * 0.85) - 4.0, 0]}>
          <mesh material={LightMaterial}>
            <dodecahedronGeometry args={[0.8, 0]} />
          </mesh>
          <mesh material={GoldMaterial} scale={[0.5, 0.5, 0.5]} rotation={[0,0,Math.PI/4]}>
            <dodecahedronGeometry args={[2.2, 0]} />
          </mesh>
          <pointLight intensity={3.0} color="#fffce8" distance={10} decay={2} />
          {/* Top light bloom */}
           <mesh material={LightMaterial} scale={[0.2, 0.2, 0.2]}>
              <sphereGeometry args={[1, 16, 16]} />
           </mesh>
      </group>
    </group>
  );
};

// Ornaments distributed around a layer
const LayerOrnaments: React.FC<{ radius: number; yOffset: number; count: number }> = ({ radius, yOffset, count }) => {
  const ornaments = useMemo(() => {
    const items = [];
    // Increase density loop
    for (let i = 0; i < count; i++) {
      // More even angular distribution
      const baseAngle = (i / count) * Math.PI * 2;
      const angleJitter = (Math.random() - 0.5) * 0.2; // Slight random jitter, but keeping order
      const angle = baseAngle + angleJitter;
      
      // Depth variation: ornaments sit at different depths to "cover" the tree body
      const depthVariance = 0.85 + Math.random() * 0.45; 
      const r = radius * depthVariance; 
      
      const x = Math.cos(angle) * r;
      const z = Math.sin(angle) * r;
      
      // Vertical spread within the layer
      const y = yOffset + (Math.random() - 0.5) * 1.5;
      
      const rand = Math.random();
      let type: 'sphere' | 'light' | 'gift' | 'cane' | 'star' | 'ginger' | 'stocking' | 'snowflake';
      
      // Adjusted probability for a mix of everything
      if (rand > 0.92) type = 'light';
      else if (rand > 0.82) type = 'gift';
      else if (rand > 0.72) type = 'snowflake';
      else if (rand > 0.62) type = 'star';
      else if (rand > 0.52) type = 'cane';
      else if (rand > 0.42) type = 'ginger';
      else if (rand > 0.32) type = 'stocking';
      else type = 'sphere'; // Spheres fill the gaps

      const scaleVar = 0.7 + Math.random() * 0.5;
      const rotationY = Math.random() * Math.PI * 2;
      const rotationZ = (Math.random() - 0.5) * 0.5; // Slight tilt

      items.push({ x, y, z, type, scaleVar, rotationY, rotationZ });
    }
    return items;
  }, [radius, yOffset, count]);

  return (
    <group>
      {ornaments.map((o, i) => (
        <group 
            key={i} 
            position={[o.x, o.y, o.z]} 
            rotation={[0, -Math.atan2(o.z, o.x) - Math.PI/2 + o.rotationY * 0.2, o.rotationZ]} 
            scale={[o.scaleVar, o.scaleVar, o.scaleVar]}
        >
            {o.type === 'light' && (
                 <>
                    <mesh material={LightMaterial} scale={[0.15, 0.15, 0.15]}>
                        <sphereGeometry args={[1, 16, 16]} />
                    </mesh>
                    <pointLight distance={1.2} intensity={0.8} color="#ffaa00" decay={2} />
                 </>
            )}
            {o.type === 'sphere' && (
                <mesh 
                  material={Math.random() > 0.6 ? RedOrnamentMaterial : GoldMaterial}
                  castShadow
                >
                  <sphereGeometry args={[0.22, 16, 16]} />
                </mesh>
            )}
            {o.type === 'gift' && <GiftBox />}
            {o.type === 'cane' && <CandyCane />}
            {o.type === 'star' && <StarShape />}
            {o.type === 'ginger' && <GingerbreadMan />}
            {o.type === 'stocking' && <Stocking />}
            {o.type === 'snowflake' && <Snowflake />}
        </group>
      ))}
    </group>
  );
};