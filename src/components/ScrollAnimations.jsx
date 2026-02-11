import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

const HorizontalScrollSection = ({ children, id }) => {
    const sectionRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        const container = containerRef.current;

        if (!section || !container) return;

        // Calculate scroll distance
        const scrollWidth = container.scrollWidth - window.innerWidth;

        // Create horizontal scroll animation
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: () => `+=${scrollWidth}`,
                scrub: 1,
                pin: true,
                anticipatePin: 1,
                invalidateOnRefresh: true,
            }
        });

        tl.to(container, {
            x: -scrollWidth,
            ease: 'none',
        });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <section ref={sectionRef} className="h-screen overflow-hidden relative">
            <div ref={containerRef} className="flex h-full w-max">
                {children}
            </div>
        </section>
    );
};

const ParallaxText = ({ children, speed = 0.5, direction = 'up' }) => {
    const textRef = useRef(null);

    useEffect(() => {
        const element = textRef.current;
        if (!element) return;

        const yMovement = direction === 'up' ? -100 * speed : 100 * speed;

        gsap.to(element, {
            y: yMovement,
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            }
        });
    }, [speed, direction]);

    return (
        <div ref={textRef} className="will-change-transform">
            {children}
        </div>
    );
};

const PinnedSection = ({ children, duration = 1 }) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const section = sectionRef.current;
        if (!section) return;

        ScrollTrigger.create({
            trigger: section,
            start: 'top top',
            end: `+=${window.innerHeight * duration}`,
            pin: true,
            pinSpacing: true,
        });
    }, [duration]);

    return (
        <section ref={sectionRef} className="relative">
            {children}
        </section>
    );
};

const FadeInOnScroll = ({ children, delay = 0 }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        gsap.fromTo(element,
            {
                opacity: 0,
                y: 100,
            },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                delay,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse',
                }
            }
        );
    }, [delay]);

    return <div ref={elementRef}>{children}</div>;
};

const ScaleOnScroll = ({ children, maxScale = 1.5 }) => {
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        gsap.fromTo(element,
            {
                scale: 0.8,
                opacity: 0,
            },
            {
                scale: maxScale,
                opacity: 1,
                scrollTrigger: {
                    trigger: element,
                    start: 'top 80%',
                    end: 'top 20%',
                    scrub: true,
                }
            }
        );
    }, [maxScale]);

    return <div ref={elementRef} className="will-change-transform">{children}</div>;
};

const CameraDolly = ({ children, distance = 200 }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        gsap.fromTo(container,
            {
                z: -distance,
                opacity: 0,
            },
            {
                z: 0,
                opacity: 1,
                scrollTrigger: {
                    trigger: container,
                    start: 'top bottom',
                    end: 'top center',
                    scrub: 1,
                }
            }
        );
    }, [distance]);

    return (
        <div
            ref={containerRef}
            className="will-change-transform"
            style={{ transform: 'translateZ(0)' }}
        >
            {children}
        </div>
    );
};

export {
    HorizontalScrollSection,
    ParallaxText,
    PinnedSection,
    FadeInOnScroll,
    ScaleOnScroll,
    CameraDolly,
};
