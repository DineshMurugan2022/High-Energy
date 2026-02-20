import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, useTexture, Float } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// 3D Project Card
const ProjectCard3D = ({ position, project, index }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;

            // Rotate on hover
            const targetRotationY = hovered ? Math.PI * 0.1 : 0;
            meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
        }
    });

    // Color based on project type
    const getColor = (type) => {
        const colors = {
            crm: '#3b82f6',
            ai: '#8b5cf6',
            lab: '#ec4899',
            tool: '#f59e0b',
            retail: '#10b981',
        };
        return colors[type] || '#6b7280';
    };

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
            <group
                position={position}
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                {/* Card base */}
                <mesh>
                    <boxGeometry args={[2, 2.5, 0.1]} />
                    <meshStandardMaterial
                        color="#ffffff"
                        transparent
                        opacity={0.1}
                        roughness={0.2}
                        metalness={0.1}
                    />
                </mesh>

                {/* Image area */}
                <mesh position={[0, 0.3, 0.06]}>
                    <planeGeometry args={[1.8, 1.5]} />
                    <meshStandardMaterial color={getColor(project.type)} />
                </mesh>

                {/* Title bar */}
                <mesh position={[0, -0.8, 0.06]}>
                    <planeGeometry args={[1.8, 0.6]} />
                    <meshBasicMaterial color="#2d2d2d" />
                </mesh>

                {/* Glow effect on hover */}
                {hovered && (
                    <mesh position={[0, 0, -0.05]}>
                        <boxGeometry args={[2.2, 2.7, 0.1]} />
                        <meshBasicMaterial
                            color={getColor(project.type)}
                            transparent
                            opacity={0.3}
                        />
                    </mesh>
                )}

                {/* Shadow/depth */}
                <mesh position={[0.1, -0.1, -0.1]}>
                    <boxGeometry args={[2, 2.5, 0.1]} />
                    <meshBasicMaterial color="#000000" transparent opacity={0.3} />
                </mesh>
            </group>
        </Float>
    );
};

// Carousel Scene
const CarouselScene = ({ projects }) => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation
            groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.3;
        }
    });

    // Arrange projects in a circle
    const radius = 5;
    const angleStep = (Math.PI * 2) / projects.length;

    return (
        <group ref={groupRef}>
            {projects.map((project, i) => {
                const angle = angleStep * i;
                const x = Math.sin(angle) * radius;
                const z = Math.cos(angle) * radius;

                return (
                    <ProjectCard3D
                        key={i}
                        position={[x, 0, z]}
                        project={project}
                        index={i}
                    />
                );
            })}
        </group>
    );
};

// Main Component
const ProjectsCarousel3D = ({ projects }) => {
    return (
        <div className="w-full h-screen relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={60} />

                {/* Lighting */}
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#ffffff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />
                <spotLight
                    position={[0, 10, 0]}
                    angle={0.5}
                    penumbra={1}
                    intensity={1}
                />

                {/* Carousel */}
                <CarouselScene projects={projects} />

                {/* Background */}
                <mesh position={[0, 0, -10]}>
                    <planeGeometry args={[100, 100]} />
                    <meshBasicMaterial color="#0a0a0a" />
                </mesh>
            </Canvas>

            {/* Overlay UI */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white text-center z-10">
                <p className="text-sm opacity-60">Scroll to rotate • Hover to interact</p>
            </div>
        </div>
    );
};

export default ProjectsCarousel3D;
