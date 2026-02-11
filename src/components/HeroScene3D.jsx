import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// 3D Dossier/Folder Component
const DossierFolder = () => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle rotation
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.3;
            meshRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.2) * 0.1;
            // Floating effect
            meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={meshRef}>
                {/* Main folder body */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3, 2, 0.1]} />
                    <meshStandardMaterial
                        color="#f5f5dc"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>

                {/* Folder tab */}
                <mesh position={[0.5, 1.1, 0]}>
                    <boxGeometry args={[1.5, 0.3, 0.1]} />
                    <meshStandardMaterial
                        color="#e8e8c8"
                        roughness={0.7}
                        metalness={0.1}
                    />
                </mesh>

                {/* "CLASSIFIED" stamp */}
                <mesh position={[0, 0, 0.06]} rotation={[0, 0, -0.2]}>
                    <planeGeometry args={[1.5, 0.5]} />
                    <meshBasicMaterial color="#dc2626" opacity={0.8} transparent />
                </mesh>

                {/* Glowing edges */}
                <mesh position={[0, 0, 0]}>
                    <boxGeometry args={[3.1, 2.1, 0.11]} />
                    <meshBasicMaterial
                        color="#3b82f6"
                        opacity={0.2}
                        transparent
                        wireframe
                    />
                </mesh>
            </group>
        </Float>
    );
};

// Particle System
const ParticleField = () => {
    const particlesRef = useRef();

    const particleCount = 1000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particleCount * 3);
        for (let i = 0; i < particleCount; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 20;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (particlesRef.current) {
            particlesRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <points ref={particlesRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particleCount}
                    array={positions}
                    itemSize={3}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.05}
                color="#3b82f6"
                transparent
                opacity={0.6}
                sizeAttenuation
            />
        </points>
    );
};

// Glowing Orbs
const GlowingOrb = ({ position, color }) => {
    return (
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1}>
            <Sphere args={[0.3, 32, 32]} position={position}>
                <MeshDistortMaterial
                    color={color}
                    attach="material"
                    distort={0.4}
                    speed={2}
                    roughness={0}
                    metalness={0.5}
                />
            </Sphere>
            {/* Glow effect */}
            <Sphere args={[0.35, 32, 32]} position={position}>
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.3}
                />
            </Sphere>
        </Float>
    );
};

// Main Hero Scene Component
const HeroScene3D = () => {
    return (
        <div className="absolute inset-0 -z-10">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />
                <spotLight
                    position={[0, 5, 0]}
                    angle={0.3}
                    penumbra={1}
                    intensity={1}
                    castShadow
                />

                {/* 3D Elements */}
                <DossierFolder />
                <ParticleField />

                {/* Glowing orbs */}
                <GlowingOrb position={[-3, 2, -2]} color="#3b82f6" />
                <GlowingOrb position={[3, -2, -3]} color="#8b5cf6" />
                <GlowingOrb position={[2, 3, -1]} color="#fbbf24" />

                {/* Optional: Enable user interaction */}
                {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
            </Canvas>
        </div>
    );
};

export default HeroScene3D;
