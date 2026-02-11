import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { PerspectiveCamera, Text, Line } from '@react-three/drei';
import * as THREE from 'three';

// Individual Skill Node
const SkillNode = ({ position, label, color, index }) => {
    const meshRef = useRef();
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            // Gentle floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + index) * 0.1;

            // Pulse on hover
            const targetScale = hovered ? 1.3 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <group position={position}>
            <mesh
                ref={meshRef}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <sphereGeometry args={[0.2, 32, 32]} />
                <meshStandardMaterial
                    color={color}
                    emissive={color}
                    emissiveIntensity={hovered ? 0.5 : 0.2}
                    roughness={0.3}
                    metalness={0.7}
                />
            </mesh>

            {/* Glow ring */}
            <mesh position={[0, 0, 0]}>
                <ringGeometry args={[0.25, 0.3, 32]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={hovered ? 0.6 : 0.3}
                    side={THREE.DoubleSide}
                />
            </mesh>

            {/* Label */}
            {hovered && (
                <Text
                    position={[0, 0.5, 0]}
                    fontSize={0.15}
                    color="white"
                    anchorX="center"
                    anchorY="middle"
                >
                    {label}
                </Text>
            )}
        </group>
    );
};

// Connection Lines between nodes
const ConnectionLine = ({ start, end, color }) => {
    const points = useMemo(() => [
        new THREE.Vector3(...start),
        new THREE.Vector3(...end)
    ], [start, end]);

    return (
        <Line
            points={points}
            color={color}
            lineWidth={1}
            transparent
            opacity={0.3}
        />
    );
};

// Main Constellation Component
const ConstellationScene = ({ skills }) => {
    const groupRef = useRef();

    // Generate positions for skills in a sphere formation
    const skillPositions = useMemo(() => {
        const positions = [];
        const radius = 3;
        const goldenAngle = Math.PI * (3 - Math.sqrt(5));

        skills.forEach((skill, i) => {
            const y = 1 - (i / (skills.length - 1)) * 2;
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = goldenAngle * i;

            const x = Math.cos(theta) * radiusAtY * radius;
            const z = Math.sin(theta) * radiusAtY * radius;

            positions.push([x, y * radius, z]);
        });

        return positions;
    }, [skills]);

    // Generate connections (connect nearby nodes)
    const connections = useMemo(() => {
        const conns = [];
        const maxDistance = 2.5;

        for (let i = 0; i < skillPositions.length; i++) {
            for (let j = i + 1; j < skillPositions.length; j++) {
                const dist = Math.sqrt(
                    Math.pow(skillPositions[i][0] - skillPositions[j][0], 2) +
                    Math.pow(skillPositions[i][1] - skillPositions[j][1], 2) +
                    Math.pow(skillPositions[i][2] - skillPositions[j][2], 2)
                );

                if (dist < maxDistance) {
                    conns.push({
                        start: skillPositions[i],
                        end: skillPositions[j],
                    });
                }
            }
        }

        return conns;
    }, [skillPositions]);

    useFrame((state) => {
        if (groupRef.current) {
            // Slow rotation of the entire constellation
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
        }
    });

    const colors = ['#3b82f6', '#8b5cf6', '#ec4899', '#f59e0b', '#10b981'];

    return (
        <group ref={groupRef}>
            {/* Draw connections first (behind nodes) */}
            {connections.map((conn, i) => (
                <ConnectionLine
                    key={`conn-${i}`}
                    start={conn.start}
                    end={conn.end}
                    color="#3b82f6"
                />
            ))}

            {/* Draw skill nodes */}
            {skills.map((skill, i) => (
                <SkillNode
                    key={i}
                    position={skillPositions[i]}
                    label={skill.name}
                    color={colors[i % colors.length]}
                    index={i}
                />
            ))}
        </group>
    );
};

// Wrapper Component
const SkillsConstellation = ({ skills }) => {
    return (
        <div className="w-full h-screen relative">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={60} />

                {/* Lighting */}
                <ambientLight intensity={0.4} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#3b82f6" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#8b5cf6" />

                {/* Constellation */}
                <ConstellationScene skills={skills} />

                {/* Background stars */}
                <mesh>
                    <sphereGeometry args={[50, 32, 32]} />
                    <meshBasicMaterial color="#000000" side={THREE.BackSide} />
                </mesh>
            </Canvas>

            {/* Overlay text */}
            <div className="absolute top-10 left-10 text-white z-10">
                <h2 className="text-4xl font-bold hand-drawn-font mb-2">Skill Constellation</h2>
                <p className="text-sm opacity-60">Hover over nodes to reveal skills</p>
            </div>
        </div>
    );
};

export default SkillsConstellation;
