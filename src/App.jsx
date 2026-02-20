import React, { useEffect, useRef, useState, lazy, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

// Modular Components
const HomePage = lazy(() => import('./components/HomePage'));
const Navbar = lazy(() => import('./components/Navbar'));
const ImageSequence = lazy(() => import('./components/ImageSequence'));

// CSS
import './index.css';

// Lucide Icons (passed to resumeData)
import {
    Database, Sparkles, Atom, Rocket, Boxes, FileCode2, Braces, Wind, Server, Waypoints, ShieldCheck,
    Radio, Cloud, GitBranch, Blocks, Bot, SearchCode, ChartNetwork, Workflow, WandSparkles, Box, Spline,
    Cpu
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
            <div
                ref={cursorRef}
                className="custom-cursor fixed top-0 left-0 -ml-5 -mt-5 w-10 h-10 lens-cursor fixed flex items-center justify-center pointer-events-none z-[9999]"
            >
                {/* Center dot */}
                <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                {/* Crosshair lines */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20"></div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-2 bg-white/20"></div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white/20"></div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 h-[1px] w-2 bg-white/20"></div>
            </div>
            <AnimatePresence>
                {trails.map((t, i) => (
                    <motion.div
                        key={t.id}
                        initial={{ opacity: 0.3, scale: 1 }}
                        animate={{ opacity: 0, scale: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="fixed w-[2px] h-[2px] bg-blue-400/40 rounded-full pointer-events-none z-[9998]"
                        style={{ left: t.x, top: t.y, filter: "blur(0.5px)" }}
                    />
                ))}
            </AnimatePresence>
        </>
    );
};

// --- Main App ---

const App = () => {
    const appRef = useRef(null);

    useEffect(() => {
        const lenisInstance = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
        });
        let rafId = 0;

        function raf(time) {
            lenisInstance.raf(time);
            rafId = requestAnimationFrame(raf);
        }

        rafId = requestAnimationFrame(raf);

        return () => {
            cancelAnimationFrame(rafId);
            lenisInstance.destroy();
        };
    }, []);

    const resumeData = {
        name: "Dinesh M",
        title: "Full Stack Developer (MERN)",
        summary: "Results-driven Full Stack Developer specialized in local AI Integration (Llama). I merge high-performance code with creative depth to build world-class digital experiences.",
        skills: {
            frontend: [
                { name: "React.js", icon: Atom },
                { name: "Next.js", icon: Rocket },
                { name: "Redux Toolkit", icon: Boxes },
                { name: "TypeScript", icon: FileCode2 },
                { name: "JavaScript", icon: Braces },
                { name: "Tailwind CSS", icon: Wind }
            ],
            backend: [
                { name: "Node.js", icon: Server },
                { name: "Express.js", icon: Cpu },
                { name: "REST APIs", icon: Waypoints },
                { name: "JWT", icon: ShieldCheck },
                { name: "Socket.IO", icon: Radio }
            ],
            database: [
                { name: "MongoDB", icon: Database },
                { name: "MySQL", icon: Database },
                { name: "Firebase", icon: Cloud },
                { name: "Mongoose", icon: Database }
            ],
            devops: [
                { name: "Docker", icon: Boxes },
                { name: "Kubernetes", icon: Blocks },
                { name: "CI/CD", icon: Workflow },
                { name: "Git", icon: GitBranch },
                { name: "Vercel", icon: Rocket }
            ],
            ai_methods: [
                { name: "Local LLMs", icon: Bot },
                { name: "RAG", icon: SearchCode },
                { name: "VectorDB", icon: ChartNetwork },
                { name: "Agile", icon: Workflow }
            ],
            ui_ux: [
                { name: "GSAP", icon: WandSparkles },
                { name: "Framer Motion", icon: Sparkles },
                { name: "Three.js", icon: Box },
                { name: "Spline", icon: Spline }
            ]
        },
        projects: [
            {
                id: 2,
                title: "BNY CRM System",
                description: "Advanced Customer Relationship Management system with secure authentication, user roles, and data visualization.",
                tech: ["React", "Authentication", "Dashboard", "Charts"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://bnycrm1.vercel.app",
                preview: "/project-previews/bny-crm-system.svg",
                category: "Business",
                featured: true,
                role: "Full Stack Developer",
                outcome: "Delivered a role-based CRM workflow used for lead lifecycle tracking.",
                impact: "Reduced manual follow-up friction with centralized pipeline visibility.",
                type: "crm"
            },
            {
                id: 3,
                title: "All In One Genie",
                description: "A versatile platform offering multiple services in one place. Designed for scalability and ease of use.",
                tech: ["Next.js", "Tailwind", "API Integration"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://allinonegenie.vercel.app/",
                preview: "/project-previews/all-in-one-genie.svg",
                category: "SaaS",
                featured: false,
                role: "Frontend Engineer",
                outcome: "Built a multi-service unified interface with modular sections.",
                impact: "Improved discoverability of services in a single product flow.",
                type: "tool"
            },
            {
                id: 1,
                title: "PawnShop Admin Panel",
                description: "A comprehensive admin dashboard for managing pawn shop operations, including loan management and inventory tracking, with admin page management",
                tech: ["React", "Node.js", "MongoDB", "Admin UI"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://pawnshop-git-main-dineshmurugan2022s-projects.vercel.app",
                preview: "/project-previews/pawnshop-admin-panel.svg",
                category: "Management",
                featured: true,
                embeddable: false,
                role: "Full Stack Developer",
                outcome: "Implemented admin controls for inventory, pledges, and repayments.",
                impact: "Enabled faster daily operations with structured management dashboards.",
                type: "retail"
            },
            {
                id: 4,
                title: "Vyce Labs",
                description: "Innovative web application for a tech lab, showcasing cutting-edge design and interactive elements.",
                tech: ["React", "Framer Motion", "GSAP"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://vyce-labs.vercel.app/",
                preview: "/project-previews/vyce-labs.svg",
                category: "Creative",
                featured: true,
                role: "Frontend Developer",
                outcome: "Shipped an animation-heavy brand showcase with reusable UI ideas.",
                impact: "Raised portfolio engagement through interactive visual storytelling.",
                type: "lab"
            },
            {
                id: 5,
                title: "Content Management System",
                description: "A robust CMS built for flexibility, allowing users to manage content dynamically with a modern interface.",
                tech: ["MERN Stack", "Content API", "Secure"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://cms-z296.onrender.com/",
                preview: "/project-previews/content-management-system.svg",
                category: "CMS",
                featured: false,
                role: "MERN Developer",
                outcome: "Built dynamic content CRUD workflows with secure admin access.",
                impact: "Reduced publishing dependency by enabling self-service content updates.",
                type: "tool"
            },
            {
                id: 7,
                title: "Gym Management System",
                description: "Comprehensive gym management application with admin and user portals for managing memberships and schedules.",
                tech: ["React", "Node.js", "MongoDB", "Express"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://gymsite-2nfa.vercel.app/",
                preview: "/project-previews/gym-management-system.svg",
                category: "Management",
                featured: false,
                role: "Full Stack Developer",
                outcome: "Created membership and schedule management features for gym staff.",
                impact: "Streamlined day-to-day member administration and follow-up.",
                type: "tool"
            },
            {
                id: 8,
                title: "AI Chatbot Application",
                description: "Interactive chatbot powered by Gemini API, providing intelligent responses and enhanced user engagement.",
                tech: ["React", "Gemini API", "AI Integration"],
                github: "https://github.com/DineshMurugan2022",
                live: "http://chatbot-cyan-iota.vercel.app",
                preview: "/project-previews/ai-chatbot-application.svg",
                category: "AI/ML",
                featured: false,
                role: "AI Integration Developer",
                outcome: "Integrated LLM response flows into a production-ready chat UI.",
                impact: "Improved response quality and user engagement in query sessions.",
                type: "ai"
            },
            {
                id: 10,
                title: "Personal Portfolio (V1)",
                description: "Previous iteration of responsive portfolio showcasing web development skills and projects.",
                tech: ["React", "CSS", "Responsive Design"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://dinesh2002portfolio.vercel.app",
                preview: "/project-previews/personal-portfolio-v1.svg",
                category: "Portfolio",
                featured: false,
                embeddable: false,
                role: "Frontend Developer",
                outcome: "Published first complete personal portfolio with project showcases.",
                impact: "Created a strong baseline for personal brand and recruiter visibility.",
                type: "lab"
            },
            {
                id: 11,
                title: "Payment Gateway",
                description: "E-commerce payment system integrated with Razorpay API for secure online transactions.",
                tech: ["React", "Node.js", "Razorpay"],
                github: "https://github.com/DineshMurugan2022",
                live: "https://payment-liart-zeta.vercel.app/",
                preview: "/project-previews/payment-gateway.svg",
                category: "Fintech",
                featured: false,
                role: "Full Stack Developer",
                outcome: "Implemented secure payment flow integration with Razorpay.",
                impact: "Enabled reliable checkout completion for transaction-based workflows.",
                type: "tool"
            }
        ]
    };

    return (
        <Router>
            <div ref={appRef} className="min-h-screen paper-texture paper-grain text-ink selection:bg-yellow-200 selection:text-ink pb-32">
                <Suspense fallback={null}>
                    <ImageSequence frameCount={270} containerRef={appRef} />
                </Suspense>
                <CustomCursor />
                <Suspense fallback={null}>
                    <Navbar />
                </Suspense>


                <AnimatePresence mode="wait">
                    <Routes>
                        <Route path="/" element={<Suspense fallback={null}><HomePage data={resumeData} /></Suspense>} />
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
