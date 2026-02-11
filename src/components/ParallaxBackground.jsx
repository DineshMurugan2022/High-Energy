import React, { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    // Create multiple parallax layers with different speeds
    const layer1Y = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const layer2Y = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const layer3Y = useTransform(scrollYProgress, [0, 1], [0, -600]);
    const layer4Y = useTransform(scrollYProgress, [0, 1], [0, -800]);
    const layer5Y = useTransform(scrollYProgress, [0, 1], [0, -1000]);

    const layer1Opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 0.8, 0.5, 0.2]);
    const layer2Opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.9, 0.7, 0.4, 0.1]);

    return (
        <div ref={containerRef} className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            {/* Layer 5 - Deepest (Slowest) - Gradient Base */}
            <motion.div
                style={{ y: layer5Y }}
                className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900"
            />

            {/* Layer 4 - Deep geometric shapes */}
            <motion.div
                style={{ y: layer4Y, opacity: layer2Opacity }}
                className="absolute inset-0"
            >
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-3xl" />
            </motion.div>

            {/* Layer 3 - Grid pattern */}
            <motion.div
                style={{ y: layer3Y, opacity: layer1Opacity }}
                className="absolute inset-0"
            >
                <svg className="w-full h-full opacity-10" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
                            <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-blue-400" />
                        </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>
            </motion.div>

            {/* Layer 2 - Floating particles/dots */}
            <motion.div
                style={{ y: layer2Y, opacity: layer1Opacity }}
                className="absolute inset-0"
            >
                {[...Array(30)].map((_, i) => (
                    <motion.div
                        key={i}
                        initial={{
                            x: Math.random() * window.innerWidth,
                            y: Math.random() * window.innerHeight,
                        }}
                        animate={{
                            y: [
                                Math.random() * window.innerHeight,
                                Math.random() * window.innerHeight,
                            ],
                            opacity: [0.2, 0.5, 0.2],
                        }}
                        transition={{
                            duration: 10 + Math.random() * 20,
                            repeat: Infinity,
                            ease: "linear",
                        }}
                        className="absolute w-1 h-1 bg-blue-400 rounded-full"
                        style={{
                            boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)',
                        }}
                    />
                ))}
            </motion.div>

            {/* Layer 1 - Closest (Fastest) - Geometric shapes */}
            <motion.div
                style={{ y: layer1Y, opacity: layer1Opacity }}
                className="absolute inset-0"
            >
                {/* Floating hexagons */}
                <motion.div
                    animate={{
                        rotate: [0, 360],
                        scale: [1, 1.1, 1],
                    }}
                    transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute top-20 right-20 w-32 h-32 border-2 border-blue-400/20"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                />

                <motion.div
                    animate={{
                        rotate: [360, 0],
                        scale: [1, 1.2, 1],
                    }}
                    transition={{
                        duration: 40,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute bottom-40 left-40 w-40 h-40 border-2 border-purple-400/20"
                    style={{
                        clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                    }}
                />

                {/* Scan lines */}
                <motion.div
                    animate={{
                        y: ['-100%', '200%'],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                    className="absolute left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"
                />
            </motion.div>

            {/* Vignette overlay */}
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-transparent to-black/50" />
        </div>
    );
};

export default ParallaxBackground;
