import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Shield, Activity, Target } from 'lucide-react';

const StoryHUD = () => {
    const [metadata, setMetadata] = useState({
        phase: "Authorization",
        clearance: "MERN ELITE",
        status: "Active Search",
        coordinates: "40.7128° N, 74.0060° W"
    });

    const [logs, setLogs] = useState([
        "System initialized...",
        "Scanning for subject: Dinesh M...",
        "Case file 01-A ready."
    ]);

    useEffect(() => {
        const interval = setInterval(() => {
            const coordX = (Math.random() * 100).toFixed(4);
            const coordY = (Math.random() * 100).toFixed(4);
            setMetadata(prev => ({
                ...prev,
                coordinates: `${coordX}° N, ${coordY}° W`
            }));

            // Random log updates
            if (Math.random() > 0.7) {
                const newLogs = [
                    "Analyzing frontend stack...",
                    "Deciphering backend logic...",
                    "Evidence detected...",
                    "Cross-referencing mission data...",
                    "Syncing with cloud archives..."
                ];
                const randomLog = newLogs[Math.floor(Math.random() * newLogs.length)];
                setLogs(prev => [...prev.slice(-2), randomLog]);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] hand-drawn-font uppercase tracking-widest text-[10px] text-ink/40">
            {/* Top Right: Status Window */}
            <div className="absolute top-28 right-10 w-48 bg-white/10 backdrop-blur-sm border border-ink/10 p-4 shadow-sketch">
                <div className="flex items-center gap-2 mb-2 border-b border-ink/10 pb-2">
                    <Activity size={12} className="text-blue-500 animate-pulse" />
                    <span className="font-bold text-ink/60">Investigative HUD</span>
                </div>
                <div className="space-y-2">
                    <div className="flex justify-between">
                        <span>Phase:</span>
                        <span className="text-ink/80 font-bold">{metadata.phase}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Clearance:</span>
                        <span className="text-blue-700 font-bold">{metadata.clearance}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Status:</span>
                        <span className="text-ink/60">{metadata.status}</span>
                    </div>
                </div>
            </div>

            {/* Bottom Left: Terminal Logs */}
            <div className="absolute bottom-10 left-10 w-64">
                <div className="flex items-center gap-2 mb-2 text-ink/60 border-l-2 border-pencil pl-2">
                    <Terminal size={12} />
                    <span>Real-time Extraction Log</span>
                </div>
                <div className="space-y-1 opacity-60">
                    <AnimatePresence mode="popLayout">
                        {logs.map((log, i) => (
                            <motion.div
                                key={log + i}
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="whitespace-nowrap overflow-hidden text-ellipsis"
                            >
                                {">"} {log}
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            </div>

            {/* Scanning Lines / Overlays */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-[0.03]">
                <div className="absolute top-0 left-0 w-full h-1 bg-ink animate-scanline"></div>
                <div className="absolute top-0 left-0 w-1 h-full bg-ink animate-scanline-v"></div>
            </div>

            {/* Coordinates Corner */}
            <div className="absolute bottom-10 right-10 text-right opacity-40">
                <div className="flex items-center justify-end gap-2 mb-1">
                    <Target size={12} />
                    <span>Locating...</span>
                </div>
                <p className="font-mono text-[9px]">{metadata.coordinates}</p>
            </div>
        </div>
    );
};

export default StoryHUD;
