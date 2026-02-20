import React, { useEffect, useRef, useMemo, useState, lazy, Suspense } from 'react';
import ContactPage from './ContactPage';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Download, Paperclip, Search, Briefcase, Cpu, Code2, Globe, Layers, Github, ExternalLink } from 'lucide-react';

const HeroScene3D = lazy(() => import('./HeroScene3D'));

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
        <div className="perspective-2000 py-28 mb-40 relative">
            {/* 3D Background Scene (Lowered opacity to complement background) */}
            <div className="opacity-30">
                <Suspense fallback={null}>
                    <HeroScene3D />
                </Suspense>
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1.2, ease: "circOut" }}
                className="relative mx-auto max-w-4xl floating-hero shadow-2xl"
            >
                <div className="relative group perspective-1000">
                    <motion.div
                        whileHover={{ rotateY: 5, rotateX: -5 }}
                        className="relative bg-transparent p-16 shadow-paper-lg border-2 border-ink -rotate-1 transform transition-all group-hover:shadow-paper-2xl duration-500"
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
                                <div className="max-w-xl text-2xl leading-relaxed italic border-l-8 border-pencil pl-8 py-4 bg-transparent shadow-inner">
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
                            className="absolute -bottom-12 right-24 bg-transparent border-2 border-ink flex items-center z-30 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
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

const SKILL_ACCENTS = {
    frontend: {
        rgb: '37,99,235',
        itemBg: 'bg-blue-50/25',
        itemBorder: 'border-blue-400/35',
        chipBg: 'bg-blue-100/75',
        chipBorder: 'border-blue-400/35',
        text: 'text-blue-800',
        icon: 'group-hover:text-blue-700'
    },
    backend: {
        rgb: '22,163,74',
        itemBg: 'bg-emerald-50/25',
        itemBorder: 'border-emerald-400/35',
        chipBg: 'bg-emerald-100/75',
        chipBorder: 'border-emerald-400/35',
        text: 'text-emerald-800',
        icon: 'group-hover:text-emerald-700'
    },
    database: {
        rgb: '217,119,6',
        itemBg: 'bg-amber-50/25',
        itemBorder: 'border-amber-400/35',
        chipBg: 'bg-amber-100/75',
        chipBorder: 'border-amber-400/35',
        text: 'text-amber-800',
        icon: 'group-hover:text-amber-700'
    },
    devops: {
        rgb: '79,70,229',
        itemBg: 'bg-indigo-50/25',
        itemBorder: 'border-indigo-400/35',
        chipBg: 'bg-indigo-100/75',
        chipBorder: 'border-indigo-400/35',
        text: 'text-indigo-800',
        icon: 'group-hover:text-indigo-700'
    },
    ai_methods: {
        rgb: '225,29,72',
        itemBg: 'bg-rose-50/25',
        itemBorder: 'border-rose-400/35',
        chipBg: 'bg-rose-100/75',
        chipBorder: 'border-rose-400/35',
        text: 'text-rose-800',
        icon: 'group-hover:text-rose-700'
    },
    ui_ux: {
        rgb: '8,145,178',
        itemBg: 'bg-cyan-50/25',
        itemBorder: 'border-cyan-400/35',
        chipBg: 'bg-cyan-100/75',
        chipBorder: 'border-cyan-400/35',
        text: 'text-cyan-800',
        icon: 'group-hover:text-cyan-700'
    }
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
        <section ref={containerRef} className="h-screen flex flex-col items-center justify-center relative overflow-hidden border-b border-pencil/5 perspective-3000">
            <div className="absolute top-10 w-full text-center z-20">
                <Reveal>
                    <h2 className="text-6xl font-bold hand-drawn-font ink-bleed uppercase tracking-[0.2em]">{category} Document</h2>
                </Reveal>
            </div>

            <motion.div
                ref={cardRef}
                className="relative w-full max-w-4xl bg-transparent p-12 md:p-16 shadow-paper-2xl border-2 border-pencil rounded-sm flex flex-col"
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
                        <motion.div
                            key={i}
                            whileHover={{
                                y: -3,
                                boxShadow: `0 12px 30px rgba(${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).rgb},0.24), 0 0 22px rgba(${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).rgb},0.22)`
                            }}
                            className={`skill-item-${category} flex items-center gap-5 group cursor-pointer p-3 rounded-lg overflow-visible border transition-all ${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).itemBg} ${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).itemBorder}`}
                            style={{
                                boxShadow: `0 8px 24px rgba(${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).rgb},0.16), 0 0 14px rgba(${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).rgb},0.12)`
                            }}
                        >
                            <div className="w-16 h-16 bg-transparent border-2 border-pencil rounded-md flex items-center justify-center group-hover:rotate-6 group-hover:scale-110 transition-transform shadow-paper shrink-0">
                                <skill.icon className={`text-ink transition-colors ${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).icon}`} size={32} />
                            </div>
                            <div className="overflow-hidden">
                                <h4 className={`font-bold uppercase tracking-widest text-[11px] mb-1.5 truncate inline-block px-2 py-0.5 rounded-sm border ${ (SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).chipBg } ${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).chipBorder} ${(SKILL_ACCENTS[category] || SKILL_ACCENTS.frontend).text}`}>
                                    {skill.name}
                                </h4>
                                <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map(dot => (
                                        <div key={dot} className="w-2.5 h-2.5 rounded-full border border-pencil bg-ink"></div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Stamped Certification */}
                <div className="mt-16 self-end -rotate-6">
                    <div className="px-6 py-3 border-4 border-double border-ink/80 text-ink/80 hand-drawn-font text-3xl font-bold rounded-sm uppercase tracking-tighter shadow-sketch bg-transparent">
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

    const cardRef = useRef(null);
    const [previewFailed, setPreviewFailed] = useState(false);

    const handlePointerMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        const rotateY = (x - 0.5) * 10;
        const rotateX = (0.5 - y) * 8;
        cardRef.current.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    };

    const resetPointer = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transform = 'perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0px)';
    };

    const glowByType = {
        crm: 'rgba(37, 99, 235, 0.28)',
        ai: 'rgba(225, 29, 72, 0.28)',
        lab: 'rgba(8, 145, 178, 0.28)',
        tool: 'rgba(217, 119, 6, 0.28)',
        retail: 'rgba(22, 163, 74, 0.28)'
    };
    const glowColor = glowByType[project.type] || 'rgba(45,45,45,0.2)';
    const techLabel = Array.isArray(project.tech) ? project.tech.join(' | ') : project.tech;
    const projectDesc = project.description || project.desc;
    const previewImage = project.preview || project.image || null;

    return (
        <motion.article
            ref={cardRef}
            onPointerMove={handlePointerMove}
            onPointerLeave={resetPointer}
            initial={{ opacity: 0, y: 90, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: index * 0.06 }}
            className="polaroid relative overflow-hidden project-card group bg-paper/95 border-2 border-pencil/35 [transform-style:preserve-3d] transition-transform duration-300 rounded-2xl"
            style={{ willChange: 'transform' }}
        >
            <motion.div
                className="absolute -inset-8 -z-10 blur-3xl"
                animate={{ opacity: [0.22, 0.36, 0.22], scale: [0.98, 1.02, 0.98] }}
                transition={{ duration: 5 + index, repeat: Infinity, ease: 'easeInOut' }}
                style={{ background: `radial-gradient(circle, ${glowColor} 0%, rgba(255,255,255,0) 70%)` }}
            />

            <div className="relative rounded-xl border border-pencil/30 overflow-hidden bg-white">
                <div className="relative aspect-[16/10] border-b border-pencil/25">
                    {previewImage && !previewFailed ? (
                        <img
                            src={previewImage}
                            alt={project.title}
                            className="absolute inset-0 h-full w-full object-cover"
                            loading="lazy"
                            onError={() => setPreviewFailed(true)}
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-300">
                            <ProjectIcon size={88} className="text-slate-500" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/0 to-black/0"></div>
                    <div className="absolute left-3 top-3 rounded bg-white/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-slate-700 border border-slate-300">
                        {project.category || 'Project'}
                    </div>
                    {project.featured && (
                        <div className="absolute right-3 top-3 rounded bg-blue-600 px-2 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                            Featured
                        </div>
                    )}
                </div>

                <div className="p-5">
                    <h3 className="text-xl font-semibold text-slate-900 leading-tight">{project.title}</h3>
                    <p className="mt-2 text-sm text-slate-700 leading-relaxed line-clamp-2">{projectDesc}</p>
                    <p className="mt-3 text-[11px] font-medium text-slate-600">{techLabel}</p>
                    <div className="mt-3 space-y-1.5">
                        <p className="text-[11px] text-slate-700"><span className="font-semibold text-slate-900">Role:</span> {project.role}</p>
                        <p className="text-[11px] text-slate-700"><span className="font-semibold text-slate-900">Outcome:</span> {project.outcome}</p>
                        <p className="text-[11px] text-slate-700"><span className="font-semibold text-slate-900">Impact:</span> {project.impact}</p>
                    </div>

                    <div className="mt-4 flex items-center gap-2">
                        <a
                            href={project.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-slate-500 bg-slate-900 px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-slate-800"
                        >
                            Live <ExternalLink size={12} />
                        </a>
                        <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors hover:bg-slate-100"
                        >
                            Code <Github size={12} />
                        </a>
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

const HomePage = ({ data }) => {
    const projectsRef = useRef(null);

    useEffect(() => {
        const projectCards = gsap.utils.toArray('.project-card');

        projectCards.forEach((card, i) => {
            const drift = i % 2 === 0 ? -18 : 18;
            gsap.fromTo(
                card,
                { y: 180, opacity: 0, rotate: drift, scale: 0.88 },
                {
                    y: 0,
                    opacity: 1,
                    rotate: 0,
                    scale: 1,
                    duration: 1.1,
                    ease: "power4.out",
                    scrollTrigger: {
                        trigger: card,
                        start: "top 85%",
                        end: "top 35%",
                        scrub: 0.2,
                    }
                }
            );

            gsap.to(card, {
                yPercent: i % 2 === 0 ? -4 : -7,
                ease: "none",
                scrollTrigger: {
                    trigger: card,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            });
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

            <section className="py-60 relative" ref={projectsRef}>
                <div className="pointer-events-none absolute -top-24 left-0 w-64 h-64 rounded-full bg-blue-300/15 blur-3xl" />
                <div className="pointer-events-none absolute bottom-10 right-10 w-72 h-72 rounded-full bg-rose-300/15 blur-3xl" />
                <div className="flex justify-between items-end mb-32">
                    <Reveal>
                        <h2 className="text-7xl md:text-8xl font-bold hand-drawn-font ink-bleed tracking-tight">Projects</h2>
                    </Reveal>
                    <Reveal delay={0.2}>
                        <p className="sketchy-font text-2xl md:text-3xl text-pencil italic">Selected Work</p>
                    </Reveal>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                    {data.projects.map((p, i) => (
                        <PolaroidProject key={i} project={p} index={i} />
                    ))}
                    <div className="polaroid project-card aspect-[4/5] bg-paper-light/85 border-2 border-dashed border-pencil/60 flex flex-col items-center justify-center -rotate-2 group cursor-pointer hover:border-ink transition-all hover:-translate-y-1">
                        <Search size={60} className="text-pencil opacity-50 group-hover:opacity-100 transition-opacity mb-6" />
                        <span className="hand-drawn-font text-3xl font-bold opacity-60 group-hover:opacity-100 tracking-[0.2em]">VIEW ARCHIVES</span>
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




