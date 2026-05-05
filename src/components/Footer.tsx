import { Link } from 'react-router-dom';
import {
    Twitter,
    Linkedin,
    Instagram,
    Github,
    Globe,
    Shield
} from 'lucide-react';
import logo from '../assets/logo.png';

export default function Footer() {
    return (
        <footer className="py-20 border-t border-white/5 bg-black relative z-10">
            <div className="container mx-auto px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-24 mb-20">
                    {/* Brand Section */}
                    <div className="md:col-span-4 lg:col-span-5">
                        <Link to="/" className="flex items-center gap-3 mb-8 no-underline group w-fit">
                            <img src={logo} alt="IELTS AI" className="w-8 h-8 object-contain transition-transform group-hover:scale-110" />
                            <span className="font-black text-xl tracking-tighter uppercase text-white">IELTS AI</span>
                        </Link>
                        <p className="text-zinc-500 text-sm max-w-sm leading-relaxed mb-10 italic">
                            Advancing human intelligence through state-of-the-art neural coaching systems. Built for the high-achievers who refuse to settle.
                        </p>
                        <div className="flex gap-4">
                            {[
                                { Icon: Twitter, href: "#", color: "hover:text-sky-400 hover:bg-sky-400/10 hover:border-sky-400/20" },
                                { Icon: Linkedin, href: "#", color: "hover:text-blue-500 hover:bg-blue-500/10 hover:border-blue-500/20" },
                                { Icon: Instagram, href: "#", color: "hover:text-pink-500 hover:bg-pink-500/10 hover:border-pink-500/20" },
                                { Icon: Github, href: "#", color: "hover:text-white hover:bg-white/10 hover:border-white/20" }
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    className={`w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center transition-all group ${social.color}`}
                                >
                                    <social.Icon className="w-5 h-5 text-zinc-400 group-hover:scale-110 transition-transform" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links Sections */}
                    <div className="md:col-span-8 lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-12">
                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-300 mb-8">Solutions</h4>
                            <div className="flex flex-col gap-4 text-sm text-zinc-500 font-medium">
                                <Link to="/app/writing" className="hover:text-white transition-colors no-underline">Writing Evaluator</Link>
                                <Link to="/app/speaking" className="hover:text-white transition-colors no-underline">Speaking Coach</Link>
                                <Link to="/academic-reading" className="hover:text-white transition-colors no-underline">Academic Reading</Link>
                                <Link to="/full-simulation" className="hover:text-white transition-colors no-underline">Mock Exam Arena</Link>
                            </div>
                        </div>

                        <div>
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-300 mb-8">Ecosystem</h4>
                            <div className="flex flex-col gap-4 text-sm text-zinc-500 font-medium">
                                <Link to="/pricing" className="hover:text-white transition-colors no-underline">Premium Plans</Link>
                                <Link to="/research" className="hover:text-white transition-colors no-underline">Neural Research</Link>
                                <Link to="/rules" className="hover:text-white transition-colors no-underline">Official Rules</Link>
                                <Link to="/help" className="hover:text-white transition-colors no-underline">Support Center</Link>
                            </div>
                        </div>

                        <div className="col-span-2 sm:col-span-1">
                            <h4 className="font-black text-[10px] uppercase tracking-[0.2em] text-zinc-300 mb-8">Legal</h4>
                            <div className="flex flex-col gap-4 text-sm text-zinc-500 font-medium">
                                <Link to="/terms" className="hover:text-white transition-colors no-underline">Terms of Service</Link>
                                <Link to="/privacy" className="hover:text-white transition-colors no-underline">Privacy Policy</Link>
                                <Link to="/rules" className="hover:text-white transition-colors no-underline">Cookie Policy</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-6">
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                            © 2026 IELTS AI. All Rights Reserved.
                        </p>
                        <div className="hidden lg:flex items-center gap-2">
                            <Shield className="w-3 h-3 text-emerald-500" />
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-700">PCI DSS COMPLIANT</span>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="flex items-center gap-2 text-zinc-700">
                            <Globe className="w-3 h-3" />
                            <span className="text-[10px] font-black uppercase tracking-widest">Global English (International)</span>
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-800">
                            v2.1.0-STABLE
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
