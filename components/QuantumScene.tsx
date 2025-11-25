
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Icosahedron, Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Fix for missing JSX type definitions for R3F elements
// Explicitly define the Three.js elements used in JSX
declare global {
  namespace JSX {
    interface IntrinsicElements {
      ambientLight: any;
      pointLight: any;
      group: any;
      mesh: any;
      sphereGeometry: any;
      cylinderGeometry: any;
      torusGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      [elemName: string]: any;
    }
  }
}

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

// Helper to create a satellite connected to center with flowing data
const ConnectedSatellite = ({ rotation, distance, color, speedOffset = 0 }: { rotation: [number, number, number], distance: number, color: string, speedOffset?: number }) => {
    const groupRef = useRef<THREE.Group>(null);
    const packetOutRef = useRef<THREE.Mesh>(null);
    const packetInRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        
        // Packet Out (Center -> Satellite)
        if (packetOutRef.current) {
           const pos = (t * 1.5 + speedOffset) % 1; 
           const startX = 0.6;
           const endX = distance - 0.3;
           packetOutRef.current.position.x = startX + pos * (endX - startX);
           
           // Scale effect: fade in out at ends
           const scale = Math.sin(pos * Math.PI); 
           packetOutRef.current.scale.setScalar(0.8 + scale * 0.5);
           if(packetOutRef.current.material instanceof THREE.MeshBasicMaterial) {
             packetOutRef.current.material.opacity = scale;
           }
        }

        // Packet In (Satellite -> Center)
        if (packetInRef.current) {
           const pos = ((t * 1.5 + speedOffset + 0.5) % 1);
           const startX = distance - 0.3;
           const endX = 0.6;
           packetInRef.current.position.x = startX + pos * (endX - startX);
           
           const scale = Math.sin(pos * Math.PI);
           packetInRef.current.scale.setScalar(0.8 + scale * 0.5);
        }
    });

    return (
        <group rotation={rotation} ref={groupRef}>
             {/* Connection Line - Glowing */}
             <mesh rotation={[0, 0, -Math.PI / 2]} position={[distance / 2, 0, 0]}>
                <cylinderGeometry args={[0.03, 0.03, distance, 8]} />
                <meshStandardMaterial color={color} transparent opacity={0.15} emissive={color} emissiveIntensity={0.2} />
             </mesh>

             {/* Moving Data Packet OUT */}
             <mesh ref={packetOutRef} position={[1, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color={color} toneMapped={false} transparent opacity={0.8} />
             </mesh>
             
             {/* Moving Data Packet IN */}
             <mesh ref={packetInRef} position={[1, 0, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.8} />
             </mesh>

             {/* The Satellite Node */}
             <mesh position={[distance, 0, 0]}>
                <sphereGeometry args={[0.25, 32, 32]} />
                <meshStandardMaterial color={color} metalness={0.7} roughness={0.2} emissive={color} emissiveIntensity={0.2} />
             </mesh>
             
             {/* Satellite Halo Ring */}
             <mesh position={[distance, 0, 0]} rotation={[Math.PI/2, 0, 0]}>
                 <torusGeometry args={[0.4, 0.01, 16, 32]} />
                 <meshBasicMaterial color={color} transparent opacity={0.3} />
             </mesh>
        </group>
    )
}

const RotatingSystem = () => {
  const groupRef = useRef<THREE.Group>(null);
  const hubRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      // Slow rotation of the entire system
      groupRef.current.rotation.y += delta * 0.15; 
      groupRef.current.rotation.z = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.05;
    }
    if (hubRef.current) {
        // Pulse effect for central hub
        const s = 1 + Math.sin(state.clock.getElapsedTime() * 3) * 0.02;
        hubRef.current.scale.setScalar(s);
    }
  });

  return (
    <group ref={groupRef}>
        {/* Central Hub - Server */}
        <mesh ref={hubRef}>
            <sphereGeometry args={[0.7, 32, 32]} />
            <meshStandardMaterial color="#0056D2" metalness={0.9} roughness={0.1} emissive="#0056D2" emissiveIntensity={0.5} />
        </mesh>
        
        {/* Outer Network Sphere (Visual Boundary) */}
        <mesh>
            <sphereGeometry args={[4, 32, 32]} />
            <meshBasicMaterial color="#0056D2" wireframe transparent opacity={0.03} />
        </mesh>

        {/* Connected Satellites */}
        <ConnectedSatellite rotation={[0, 0, Math.PI / 6]} distance={2.2} color="#38bdf8" speedOffset={0} />
        <ConnectedSatellite rotation={[0, Math.PI * 2/3, -Math.PI / 8]} distance={2.6} color="#a855f7" speedOffset={0.3} />
        <ConnectedSatellite rotation={[Math.PI / 6, Math.PI * 4/3, 0]} distance={2.0} color="#22c55e" speedOffset={0.6} />
        <ConnectedSatellite rotation={[-Math.PI / 4, Math.PI / 2, 0]} distance={2.8} color="#f59e0b" speedOffset={0.9} />
        <ConnectedSatellite rotation={[Math.PI / 3, 0, Math.PI / 4]} distance={3.0} color="#ef4444" speedOffset={0.1} />
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
      <Canvas camera={{ position: [0, 0, 6], fov: 40 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#38bdf8" />
        
        <Float rotationIntensity={0.1} floatIntensity={0.1} speed={0.5}>
          <RotatingSystem />
        </Float>
        
        <Environment preset="studio" />
      </Canvas>
    </div>
  );
}
