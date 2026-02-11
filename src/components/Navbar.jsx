import React from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const Magnetic = ({ children }) => {
    const ref = React.useRef(null);
    const [position, setPosition] = React.useState({ x: 0, y: 0 });

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;
        const deltaX = clientX - centerX;
        const deltaY = clientY - centerY;
        setPosition({ x: deltaX * 0.4, y: deltaY * 0.4 });
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    const { x, y } = position;

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x, y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
        >
            {children}
        </motion.div>
    );
};

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className="fixed top-0 w-full z-50 p-10 flex justify-between items-center pointer-events-none">
            <Magnetic>
                <Link to="/" className="pointer-events-auto relative group/logo">
                    {/* Energy Core background blast */}
                    <div className="absolute top-1/2 left-1/2 w-[140%] h-[140%] energy-core opacity-0 group-hover/logo:opacity-100 transition-opacity duration-500 z-0"></div>

                    <motion.div
                        initial={{ y: -100, scale: 0.5, rotate: -15 }}
                        animate={{ y: 0, scale: 1, rotate: -1 }}
                        transition={{
                            type: "spring",
                            stiffness: 260,
                            damping: 20,
                            delay: 0.2
                        }}
                        className="relative bg-white p-5 shadow-sketch border-2 border-ink stamped cursor-pointer z-10 jitter-hover glitch-text overflow-hidden"
                    >
                        <div className="relative">
                            {/* Chromatic Aberration Layers */}
                            <span className="hand-drawn-font font-bold text-4xl tracking-tighter uppercase italic chromatic-text block select-none text-blue-800">
                                DINESH.M
                            </span>

                            {/* Hidden base layer to maintain layout */}
                            <span className="absolute inset-0 hand-drawn-font font-bold text-4xl tracking-tighter uppercase italic opacity-0 pointer-events-none text-blue-800">
                                DINESH.M
                            </span>
                        </div>

                        {/* Interactive scanline effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent -translate-y-full group-hover/logo:translate-y-full transition-transform duration-1000"></div>
                    </motion.div>
                </Link>
            </Magnetic>

            <div className="flex gap-8 items-center pointer-events-auto">
                <div className="flex gap-4">
                    {[
                        { icon: Github, href: "https://github.com" },
                        { icon: Linkedin, href: "https://linkedin.com" },
                    ].map((btn, i) => (
                        <Magnetic key={i}>
                            <motion.a
                                href={btn.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white p-4 shadow-paper border-2 border-ink hover:bg-yellow-50 transition-colors block social-button"
                            >
                                <btn.icon size={24} />
                            </motion.a>
                        </Magnetic>
                    ))}
                </div>

                <motion.button
                    onClick={() => {
                        const contactSection = document.getElementById('contact');
                        if (contactSection) {
                            contactSection.scrollIntoView({ behavior: 'smooth' });
                        }
                    }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 bg-ink text-white border-2 border-ink shadow-paper font-bold hand-drawn-font text-2xl tracking-widest transition-colors hover:bg-yellow-400 hover:text-ink cursor-pointer pointer-events-auto"
                >
                    HIRE ME
                </motion.button>
            </div>
        </nav>
    );
};

export default Navbar;
export { Magnetic };
