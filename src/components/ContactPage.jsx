import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MapPin, Mail, Phone, Coffee, User, MessageSquare } from 'lucide-react';

const ContactPage = () => {
    const [formState, setFormState] = useState({ name: '', email: '', message: '' });

    return (
        <div className="min-h-screen pt-40 pb-20 px-8 relative overflow-hidden">
            {/* Background elements (subtle) */}
            <div className="absolute top-20 right-20 w-64 h-64 border-4 border-dashed border-pencil opacity-10 rotate-12 -z-10"></div>
            <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-100/10 blur-3xl rounded-full -z-10"></div>

            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ y: 50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    className="bg-white/40 backdrop-blur-md p-12 shadow-paper-lg border-2 border-pencil relative"
                >
                    {/* Paperclip decoration */}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-pencil rotate-90">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                        </svg>
                    </div>

                    <h1 className="text-7xl font-bold hand-drawn-font mb-4 ink-bleed">Let's Talk Business</h1>
                    <p className="sketchy-font text-2xl text-pencil mb-12 uppercase tracking-widest italic">"Send over the briefing..."</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {/* Contact Info */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-6 group">
                                <div className="p-4 bg-yellow-50 border-2 border-pencil rotate-3 group-hover:rotate-0 transition-transform">
                                    <Mail className="text-ink" size={24} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-pencil font-bold">Encrypted Mail</p>
                                    <p className="hand-drawn-font text-2xl">2002dineshmurugan@gmail.com</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-6 group">
                                <div className="p-4 bg-blue-50 border-2 border-pencil -rotate-3 group-hover:rotate-0 transition-transform">
                                    <MapPin className="text-ink" size={24} />
                                </div>
                                <div>
                                    <p className="text-xs uppercase tracking-[0.2em] text-pencil font-bold">Base of Ops</p>
                                    <p className="hand-drawn-font text-2xl">Chennai, India</p>
                                </div>
                            </div>

                            <div className="mt-12 p-8 bg-paper-light border-2 border-dashed border-pencil rotate-1">
                                <Coffee className="mb-4 text-pencil" size={32} />
                                <p className="sketchy-font text-xl italic leading-relaxed">
                                    "I'm always open to new projects, collaborations, or just a virtual coffee chat about AI and tech."
                                </p>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form className="space-y-6">
                            <div className="relative">
                                <div className="absolute top-4 left-4 text-pencil"><User size={20} /></div>
                                <input
                                    type="text"
                                    placeholder="YOUR NAME"
                                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-pencil focus:border-ink outline-none transition-colors font-bold tracking-widest text-xs"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute top-4 left-4 text-pencil"><Mail size={20} /></div>
                                <input
                                    type="email"
                                    placeholder="YOUR EMAIL"
                                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-pencil focus:border-ink outline-none transition-colors font-bold tracking-widest text-xs"
                                />
                            </div>
                            <div className="relative">
                                <div className="absolute top-4 left-4 text-pencil"><MessageSquare size={20} /></div>
                                <textarea
                                    rows="4"
                                    placeholder="TRANSMISSION DATA"
                                    className="w-full pl-12 pr-4 py-4 bg-white border-2 border-pencil focus:border-ink outline-none transition-colors font-bold tracking-widest text-xs resize-none"
                                ></textarea>
                            </div>

                            <motion.button
                                whileHover={{ scale: 1.02, rotate: -1 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full bg-ink text-white py-6 flex items-center justify-center gap-4 group"
                            >
                                <span className="hand-drawn-font text-3xl font-bold tracking-widest">SEND TRANSMISSION</span>
                                <Send size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                            </motion.button>
                        </form>
                    </div>
                </motion.div>

                {/* Footer Signature */}
                <div className="mt-20 text-center">
                    <div className="inline-block p-6 bg-white border-2 border-ink -rotate-2 shadow-sketch">
                        <span className="hand-drawn-font font-bold text-4xl italic tracking-tighter uppercase">STAMPED & VERIFIED — D.M</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
