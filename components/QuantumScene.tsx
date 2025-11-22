
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Cylinder, Stars, Environment, Box, Icosahedron } from '@react-three/drei';
import * as THREE from 'three';

const FloatingNode = ({ position, color, scale = 1 }: { position: [number, number, number]; color: string; scale?: number }) => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.getElapsedTime();
      ref.current.position.y = position[1] + Math.sin(t * 1.5 + position[0]) * 0.1;
      ref.current.rotation.x = t * 0.2;
      ref.current.rotation.y = t * 0.1;
    }
  });

  return (
    <Icosahedron ref={ref} args={[1, 0]} position={position} scale={scale}>
      <meshStandardMaterial
        color={color}
        roughness={0.3}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </Icosahedron>
  );
};

const ConnectionRing = () => {
  const ref = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ref.current) {
       const t = state.clock.getElapsedTime();
       ref.current.rotation.z = t * 0.05;
       ref.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.2) * 0.1;
    }
  });

  return (
    <Torus ref={ref} args={[3.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
      <meshStandardMaterial color="#0056D2" emissive="#0056D2" emissiveIntensity={0.5} transparent opacity={0.4} />
    </Torus>
  );
}

const RotatingSystem = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Increased rotation speed significantly for a more dynamic "working system" look
      groupRef.current.rotation.y += delta * 0.8; 
      // Add slight wobble
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
        {/* Central Hub - Server */}
        <Sphere args={[0.9, 32, 32]} position={[0, 0, 0]}>
            <meshStandardMaterial color="#0056D2" metalness={0.7} roughness={0.2} emissive="#0056D2" emissiveIntensity={0.2} />
        </Sphere>
        
        {/* Orbital Rings (Visualizing Data Flow) */}
        <Torus args={[2.2, 0.02, 16, 64]} rotation={[Math.PI / 2, 0, 0]}>
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.3} />
        </Torus>
        <Torus args={[1.8, 0.02, 16, 64]} rotation={[Math.PI / 3, Math.PI / 4, 0]}>
            <meshStandardMaterial color="#94a3b8" transparent opacity={0.3} />
        </Torus>


        {/* Satellites representing Tools/Users */}
        {/* Satellite 1 */}
        <group rotation={[0, 0, Math.PI / 4]}>
            <Sphere args={[0.25, 16, 16]} position={[2.2, 0, 0]}>
                <meshStandardMaterial color="#cbd5e1" metalness={0.5} />
            </Sphere>
            <Cylinder args={[0.02, 0.02, 2.2, 8]} position={[1.1, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} />
            </Cylinder>
        </group>

        {/* Satellite 2 */}
        <group rotation={[0, Math.PI / 2, -Math.PI / 6]}>
            <Sphere args={[0.25, 16, 16]} position={[2.2, 0, 0]}>
                <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.4} />
            </Sphere>
            <Cylinder args={[0.02, 0.02, 2.2, 8]} position={[1.1, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} />
            </Cylinder>
        </group>

        {/* Satellite 3 */}
         <group rotation={[Math.PI/3, Math.PI / 4, 0]}>
            <Box args={[0.35, 0.35, 0.35]} position={[2.0, 0, 0]}>
                <meshStandardMaterial color="#1e293b" metalness={0.8} />
            </Box>
             <Cylinder args={[0.02, 0.02, 2.0, 8]} position={[1, 0, 0]} rotation={[0, 0, Math.PI/2]}>
                <meshStandardMaterial color="#38bdf8" transparent opacity={0.6} />
            </Cylinder>
        </group>
    </group>
  );
}

export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 opacity-60 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#38bdf8" />
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          {/* Main Sakai Node */}
          <FloatingNode position={[0, 0, 0]} color="#0056D2" scale={1.2} />
          <ConnectionRing />
        </Float>
        
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
           <FloatingNode position={[-3.5, 1.5, -2]} color="#94a3b8" scale={0.4} />
           <FloatingNode position={[3.5, -1.5, -3]} color="#38bdf8" scale={0.5} />
           <FloatingNode position={[2, 2, -4]} color="#1e293b" scale={0.3} />
        </Float>

        <Environment preset="city" />
        <Stars radius={100} depth={50} count={1000} factor={4} saturation={0} fade speed={1} />
      </Canvas>
    </div>
  );
};

export const NetworkScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <spotLight position={[5, 5, 5]} angle={0.3} penumbra={1} intensity={1} color="#38bdf8" />
        
        <Float rotationIntensity={0.2} floatIntensity={0.1} speed={1}>
          <RotatingSystem />
        </Float>
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
