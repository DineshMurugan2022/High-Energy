import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Modular Components
import HomePage from './components/HomePage';
import Navbar from './components/Navbar';

// CSS
import './index.css';

// Lucide Icons (passed to resumeData)
import {
    Globe, Database, Code2, Palette, Cpu, Zap, Layers, Github, ExternalLink, Sparkles, Search, Briefcase
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Custom Components ---

const CustomCursor = () => {
    const cursorRef = useRef(null);
    const [trails, setTrails] = useState([]);

    useEffect(() => {
        const moveCursor = (e) => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
            }
            const jitterX = (Math.random() - 0.5) * 4;
            const jitterY = (Math.random() - 0.5) * 4;
            setTrails(prev => [...prev.slice(-15), { x: e.clientX + jitterX, y: e.clientY + jitterY, id: Date.now() }]);
        };
        window.addEventListener('mousemove', moveCursor);
        return () => window.removeEventListener('mousemove', moveCursor);
    }, []);

    return (
        <>
            <div ref={cursorRef} className="custom-cursor fixed top-0 left-0 -ml-2 -mt-8 flex items-center justify-center pointer-events-none z-[9999]" style={{ filter: "drop-shadow(2px 4px 2px rgba(0,0,0,0.2))" }}>
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.5 10L14 9.5L13.5 10ZM13.5 10L14.5 11L13.5 10ZM15 6L18 9L7 20H4V17L15 6Z" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M15 6L18 9" stroke="#2d2d2d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M4 20L6 18" stroke="#2d2d2d" strokeWidth="3" strokeLinecap="round" />
                </svg>
            </div>
            <AnimatePresence>
                {trails.map((t, i) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0.3, scale: 1 }}
                        animate={{ opacity: 0, scale: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed w-[2px] h-[2px] bg-pencil/40 rounded-full pointer-events-none z-[9998]"
                        style={{ left: t.x, top: t.y, filter: "blur(0.5px)" }}
                    />
                ))}
            </AnimatePresence>
        </>
    );
};

// --- Main App ---

const App = () => {
    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });

        function raf(time) {
            lenisInstance.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenisInstance.destroy();
        };
    }, []);

    const resumeData = {
        name: "Dinesh M",
        title: "Full Stack Developer (MERN)",
        summary: "Results-driven Full Stack Developer specialized in local AI Integration (Llama). I merge high-performance code with creative depth to build world-class digital experiences.",
        skills: {
            frontend: [
                { name: "React.js", icon: Globe },
                { name: "Next.js", icon: Globe },
                { name: "Redux Toolkit", icon: Database },
                { name: "TypeScript", icon: Code2 },
                { name: "JavaScript", icon: Code2 },
                { name: "Tailwind CSS", icon: Palette }
            ],
            backend: [
                { name: "Node.js", icon: Cpu },
                { name: "Express.js", icon: Cpu },
                { name: "REST APIs", icon: Globe },
                { name: "JWT", icon: Zap },
                { name: "Socket.IO", icon: Zap }
            ],
            database: [
                { name: "MongoDB", icon: Database },
                { name: "MySQL", icon: Database },
                { name: "Firebase", icon: Database },
                { name: "Mongoose", icon: Database }
            ],
            devops: [
                { name: "Docker", icon: Layers },
                { name: "Kubernetes", icon: Layers },
                { name: "CI/CD", icon: Zap },
                { name: "Git", icon: Github },
                { name: "Vercel", icon: ExternalLink }
            ],
            ai_methods: [
                { name: "Local LLMs", icon: Sparkles },
                { name: "RAG", icon: Search },
                { name: "VectorDB", icon: Database },
                { name: "Agile", icon: Briefcase }
            ],
            ui_ux: [
                { name: "GSAP", icon: Palette },
                { name: "Framer Motion", icon: Palette },
                { name: "Three.js", icon: Code2 },
                { name: "Spline", icon: Code2 }
            ]
        },
        projects: [
            { id: 1, title: "ProjectCRM", desc: "A full-scale Enterprise CRM with lead tracking and real-time Socket.IO collaboration.", tech: "MERN Stack", type: "crm" },
            { id: 2, title: "Cart-Crafts-Creator", desc: "A high-performance e-commerce engine for building and managing creative storefronts.", tech: "React / Node", type: "retail" },
            { id: 3, title: "Mini AI Chatbot", desc: "Local LLM-powered chatbot utilizing RAG and VectorDB for private, high-performance AI.", tech: "AI/LLM", type: "ai" },
            { id: 4, title: "Vyce Labs", desc: "An experimental laboratory for high-performance React components and design systems.", tech: "Frontend", type: "lab" },
            { id: 5, title: "ID Card Creator", desc: "Automated credential generation tool for large-scale institutional distribution.", tech: "Tooling", type: "tool" },
            { id: 6, title: "PawnShop Pro", desc: "Advanced retail management system for pawnshops with inventory and loan tracking.", tech: "Management", type: "retail" }
        ]
    };

    return (
        <Router>
            <div className="min-h-screen paper-texture paper-grain text-ink selection:bg-yellow-200 selection:text-ink pb-32">
                <CustomCursor />
                <Navbar />

                {/* Global Parallax Background */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50">
                    <motion.div
                        animate={{ y: [-20, 20, -20], rotate: [0, 10, 0] }}
                        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-1/4 left-10 w-64 h-64 bg-yellow-200/10 blur-3xl rounded-full"
                    ></motion.div>
                    <motion.div
                        animate={{ y: [20, -20, 20], rotate: [0, -15, 0] }}
                        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute top-3/4 right-20 w-96 h-96 bg-blue-200/10 blur-[100px] rounded-full"
                    ></motion.div>
                </div>

                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={<HomePage data={resumeData} />} />
                    </Routes>
                </AnimatePresence>

                {/* Ink Bleed SVG Filter */}
                <svg style={{ position: 'absolute', width: 0, height: 0, pointerEvents: 'none' }}>
                    <defs>
                        <filter id="bleed" x="-20%" y="-20%" width="140%" height="140%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.01" numOctaves="5" result="noise" />
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="5" />
                        </filter>
                    </defs>
                </svg>
            </div>
        </Router>
    );
};

export default App;
