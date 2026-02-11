import React, { useEffect, useRef, useMemo } from 'react';
import ContactPage from './ContactPage';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Download, Paperclip, Search, Briefcase, Cpu, Code2, Globe, Layers } from 'lucide-react';

// Re-using components from main App for now or importing them if split
const Reveal = ({ children, delay = 0, y = 30 }) => {
    return (
        <div className="relative overflow-hidden">
            <motion.div
                initial={{ y, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay, ease: [0.33, 1, 0.68, 1] }}
            >
                {children}
            </motion.div>
        </div>
    );
};

const MainHero = ({ data }) => {
    return (
        <div className="perspective-2000 py-28 mb-40">
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="relative mx-auto max-w-4xl floating-hero shadow-2xl"
            >
                <div className="relative group perspective-1000">
                    <motion.div
                        whileHover={{ rotateY: 5, rotateX: -5 }}
                        className="relative bg-white p-16 shadow-paper-lg border-2 border-ink -rotate-1 transform transition-all group-hover:shadow-paper-2xl duration-500"
                    >
                        <div className="absolute top-0 right-0 w-40 h-40 overflow-hidden pointer-events-none -translate-x-[2px] translate-y-[2px]">
                            <div className="absolute top-0 right-0 w-full h-full bg-yellow-100 -rotate-45 translate-x-20 -translate-y-20 group-hover:scale-110 transition-transform origin-center"></div>
                        </div>

                        <div className="relative z-10">
                            <Reveal delay={0.2}>
                                <h1 className="text-9xl font-bold hand-drawn-font mb-4 leading-none tracking-tight ink-bleed select-none">
                                    {data.name}
                                </h1>
                            </Reveal>
                            <Reveal delay={0.4}>
                                <p className="text-4xl sketchy-font text-pencil mb-8 uppercase letter-spacing-widest flex items-center gap-4">
                                    <Sparkles size={32} className="text-yellow-500 animate-pulse" />
                                    {data.title}
                                </p>
                            </Reveal>
                            <Reveal delay={0.6}>
                                <div className="max-w-xl text-2xl leading-relaxed italic border-l-8 border-pencil pl-8 py-4 bg-paper-light/50 shadow-inner">
                                    {data.summary}
                                </div>
                            </Reveal>
                        </div>

                        {/* Resume Button - Strictly matching image */}
                        <motion.a
                            href="/resume.pdf"
                            download="Dinesh_Resume.pdf"
                            whileHover={{ y: -5 }}
                            whileTap={{ scale: 0.98 }}
                            className="absolute -bottom-12 right-24 bg-white border-2 border-ink flex items-center z-30 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:bg-slate-50"
                        >
                            {/* Centered Paperclip pinning to the edge */}
                            <div className="absolute -top-7 left-1/2 -translate-x-1/2 text-ink z-40 transform rotate-[15deg] drop-shadow-sm">
                                <Paperclip size={38} />
                            </div>

                            {/* Black icon box */}
                            <div className="bg-ink text-white p-5 border-r-2 border-ink flex items-center justify-center">
                                <Download size={30} />
                            </div>

                            {/* Text content area */}
                            <div className="px-6 py-2 flex flex-col justify-center">
                                <span className="hand-drawn-font text-2xl font-bold leading-tight block uppercase tracking-tight">RESUME.PDF</span>
                                <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-pencil">DOWNLOAD DOSSIER</span>
                            </div>
                        </motion.a>

                        {/* MERN Elite Badge - Strictly matching image */}
                        <div className="absolute top-10 right-10 z-20">
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                className="bg-[#1D4ED8] text-white px-6 py-4 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col items-center justify-center min-w-[115px]"
                            >
                                <span className="hand-drawn-font text-2xl font-bold leading-none tracking-tight text-center">
                                    MERN<br />ELITE
                                </span>
                                <div className="absolute -bottom-1.5 -left-1.5 w-4 h-4 bg-yellow-400 border-2 border-ink rounded-full"></div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    style={{ rotate: "-5deg" }}
                    className="absolute -top-10 -left-10 w-full h-full bg-paper border-2 border-dashed border-pencil -z-10 opacity-50"
                ></motion.div>
            </motion.div >
        </div >
    );
};

const CategoryDossierCard = ({ category, skills, index }) => {
    const containerRef = useRef(null);
    const cardRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const icons = gsap.utils.toArray(`.skill-item-${category}`);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=1500",
                scrub: true,
                pin: true,
                anticipatePin: 1,
            }
        });

        // 1. Randomized Card Entry Direction
        let cardStartPos = { x: 0, y: 0, rotate: 0 };
        const side = index % 4;
        if (side === 0) cardStartPos = { x: -1500, y: 500, rotate: -45 }; // Bottom Left
        else if (side === 1) cardStartPos = { x: 1500, y: -500, rotate: 45 }; // Top Right
        else if (side === 2) cardStartPos = { x: 1500, y: 500, rotate: 45 }; // Bottom Right
        else cardStartPos = { x: -1500, y: -500, rotate: -45 }; // Top Left

        tl.fromTo(cardRef.current,
            {
                x: cardStartPos.x,
                y: cardStartPos.y,
                rotate: cardStartPos.rotate,
                opacity: 0,
                scale: 0.5,
                rotateX: 30
            },
            {
                x: 0,
                y: 0,
                rotate: 0,
                opacity: 1,
                scale: 1,
                rotateX: 0,
                duration: 1.5,
                ease: "power4.out"
            }
        );

        // 2. Assemble the icons from random directions
        icons.forEach((icon, i) => {
            const angle = Math.random() * Math.PI * 2;
            const distance = 1000 + Math.random() * 500;
            const startX = Math.cos(angle) * distance;
            const startY = Math.sin(angle) * distance;

            tl.fromTo(icon,
                {
                    x: startX,
                    y: startY,
                    opacity: 0,
                    rotate: Math.random() * 1080 - 540,
                    scale: 0.1
                },
                {
                    x: 0,
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 2,
                    ease: "expo.out"
                },
                0.5 + (i * 0.08) // Stagger relative to card appearance
            );
        });

        return () => {
            if (tl.scrollTrigger) tl.scrollTrigger.kill();
            tl.kill();
        };
    }, [category, index]);

    return (
        <section ref={containerRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-white/5 border-b border-pencil/10 perspective-3000">
            <div className="absolute top-10 w-full text-center z-20">
                <Reveal>
                    <h2 className="text-6xl font-bold hand-drawn-font ink-bleed uppercase tracking-[0.2em]">{category} Document</h2>
                </Reveal>
            </div>

            <motion.div
                ref={cardRef}
                className="relative w-full max-w-4xl bg-white p-12 md:p-16 shadow-paper-2xl border-2 border-pencil rounded-sm flex flex-col"
                style={{ transformStyle: "preserve-3d" }}
            >
                {/* Dossier Header */}
                <div className="flex justify-between items-start mb-12 border-b-2 border-pencil pb-6 border-dashed">
                    <div>
                        <div className="text-[10px] font-bold text-pencil uppercase tracking-[0.4em] mb-2">Subject Classification</div>
                        <h3 className="text-4xl hand-drawn-font font-bold uppercase">{category} Skills</h3>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] font-bold text-pencil uppercase tracking-[0.4em] mb-2">File No.</div>
                        <p className="sketchy-font font-bold text-xl uppercase tracking-widest">{category.substring(0, 3)}-MOD-SPEC</p>
                    </div>
                </div>

                {/* Skills Grid */}
                <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-x-12 gap-y-10">
                    {skills.map((skill, i) => (
                        <div key={i} className={`skill-item-${category} flex items-center gap-5 group cursor-pointer p-2 hover:bg-yellow-50/50 transition-colors rounded-lg overflow-visible`}>
                            <div className="w-16 h-16 bg-paper-light border-2 border-pencil rounded-md flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform shadow-paper group-hover:shadow-pencil-lg shrink-0">
                                <skill.icon className="text-ink transition-colors group-hover:text-blue-600" size={32} />
                            </div>
                            <div className="overflow-hidden">
                                <h4 className="font-bold uppercase tracking-widest text-[11px] mb-1.5 truncate text-ink">{skill.name}</h4>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(dot => (
                                        <div key={dot} className={`w-2.5 h-2.5 rounded-full border border-pencil ${dot <= 4 ? 'bg-ink' : 'bg-transparent'}`}></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Stamped Certification */}
                <div className="mt-16 self-end -rotate-6">
                    <div className="px-6 py-3 border-4 border-double border-ink/80 text-ink/80 hand-drawn-font text-3xl font-bold rounded-sm uppercase tracking-tighter shadow-sketch bg-white/40">
                        Vetted & Validated
                    </div>
                </div>

                {/* Paperclip Aesthetic */}
                <div className="absolute -top-10 left-1/4 text-pencil -rotate-12 opacity-30 pointer-events-none">
                    <Paperclip size={60} />
                </div>
            </motion.div>
        </section>
    );
};

const PolaroidProject = ({ project, index }) => {
    const ProjectIcon = useMemo(() => {
        switch (project.type) {
            case 'crm': return Briefcase;
            case 'ai': return Sparkles;
            case 'lab': return Cpu;
            case 'tool': return Code2;
            case 'retail': return Globe;
            default: return Layers;
        }
    }, [project.type]);

    return (
        <motion.div
            className="polaroid relative overflow-hidden project-card"
        >
            <div className="bg-paper-light aspect-[4/3] mb-4 border-b-2 border-pencil overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-transparent to-ink/10"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <ProjectIcon size={120} className="text-pencil p-6 border-4 border-dashed border-pencil rounded-full opacity-30" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-6 bg-white/90 backdrop-blur-sm transform translate-y-full group-hover/card:translate-y-0 transition-transform">
                    <p className="text-sm font-bold leading-tight uppercase">{project.desc}</p>
                    <div className="mt-4 text-xs font-bold text-ink bg-yellow-200 inline-block px-3 py-2 rotate-2 italic">#{project.tech}</div>
                </div>
            </div>
            <div className="px-4">
                <h3 className="sketchy-font text-4xl font-bold leading-none ink-bleed">{project.title}</h3>
                <p className="text-xs text-pencil uppercase mt-2 tracking-widest">{project.subtitle || "Case File #0" + project.id}</p>
            </div>
        </motion.div>
    );
};

const HomePage = ({ data }) => {
    const projectsRef = useRef(null);

    useEffect(() => {
        const projectCards = gsap.utils.toArray('.project-card');

        projectCards.forEach((card, i) => {
            gsap.fromTo(card,
                { y: 200, opacity: 0, rotate: 10 },
                {
                    y: 0,
                    opacity: 1,
                    rotate: Math.random() * 8 - 4,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top bottom-=100",
                        end: "top top",
                        toggleActions: "play none none reverse"
                    }
                }
            );
        });

        return () => {
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <main className="max-w-6xl mx-auto px-8 relative z-10">
            <MainHero data={data} />

            {Object.entries(data.skills).map(([category, items], i) => (
                <CategoryDossierCard key={category} category={category} skills={items} index={i} />
            ))}

            <section className="py-60" ref={projectsRef}>
                <div className="flex justify-between items-end mb-32">
                    <Reveal>
                        <h2 className="text-9xl font-bold hand-drawn-font ink-bleed">Dossier #01</h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="sketchy-font text-4xl text-pencil italic">"Classified Operations"</p>
                    </Reveal>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                    {data.projects.map((p, i) => (
                        <PolaroidProject key={i} project={p} index={i} />
                    ))}
                    <div className="polaroid aspect-[4/5] bg-paper-light border-2 border-dashed border-pencil flex flex-col items-center justify-center -rotate-2 group cursor-pointer hover:border-ink transition-colors">
                        <Search size={60} className="text-pencil opacity-20 group-hover:opacity-100 transition-opacity mb-6" />
                        <span className="hand-drawn-font text-3xl font-bold opacity-20 group-hover:opacity-100 tracking-[0.2em]">VIEW ARCHIVES</span>
                    </div>
                </div>
            </section>
            <section id="contact">
                <ContactPage />
            </section>
        </main>
    );
};

export default HomePage;
