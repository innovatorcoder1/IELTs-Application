import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Eye, EyeOff, Github, Chrome, ArrowRight, ChevronLeft, CheckCircle2 } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate registration
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#04070D] flex flex-col relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

            {/* Header */}
            <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-sm">
                <Link to="/" className="flex items-center gap-2 group no-underline">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                        <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-blue-500" />
                    </div>
                </Link>
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <img src={logo} alt="IELTS AI" className="w-8 h-8 object-contain" />
                    <span className="font-black text-lg tracking-tight text-white">IELTS AI</span>
                </Link>
                <div className="w-10" />
            </header>

            <main className="flex-1 flex items-center justify-center p-6 relative z-10 py-24">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="bento-card p-8 md:p-10 bg-zinc-900/50 border border-white/5 backdrop-blur-xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-black text-white mb-2">Join the Elite.</h1>
                                <p className="text-zinc-500 font-medium">Create your AI-powered study account today.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Full Name</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 border border-white/10 group-focus-within:border-blue-500/50 transition-all">
                                            <User className="w-4 h-4 text-zinc-500 group-focus-within:text-blue-500" />
                                        </div>
                                        <input
                                            type="text"
                                            required
                                            placeholder="Sarah Jenkins"
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Email Address</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 border border-white/10 group-focus-within:border-blue-500/50 transition-all">
                                            <Mail className="w-4 h-4 text-zinc-500 group-focus-within:text-blue-500" />
                                        </div>
                                        <input
                                            type="email"
                                            required
                                            placeholder="sarah@example.com"
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-4 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Password</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 border border-white/10 group-focus-within:border-blue-500/50 transition-all">
                                            <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-blue-500" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="Min. 8 characters"
                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-14 pr-12 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 py-2">
                                    <div className="flex items-start gap-3">
                                        <input type="checkbox" id="terms" required className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/20" />
                                        <label htmlFor="terms" className="text-xs font-bold text-zinc-500 select-none leading-relaxed">
                                            I agree to the <Link to="/terms" className="text-blue-500 no-underline">Terms of Service</Link> and <Link to="/privacy" className="text-blue-500 no-underline">Privacy Policy</Link>
                                        </label>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-black uppercase tracking-widest py-4 rounded-2xl transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-2 group"
                                >
                                    {isLoading ? (
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Create Account
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </>
                                    )}
                                </button>
                            </form>

                            <div className="mt-10 relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/5"></div>
                                </div>
                                <div className="relative flex justify-center text-[10px]">
                                    <span className="px-3 bg-[#111] text-zinc-600 font-black uppercase tracking-[0.2em]">One-Tap Signup</span>
                                </div>
                            </div>

                            <div className="mt-8 grid grid-cols-2 gap-4">
                                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 py-4 rounded-2xl hover:bg-white/10 transition-all group">
                                    <Chrome className="w-5 h-5 text-zinc-400 group-hover:text-blue-400 transition-colors" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Google</span>
                                </button>
                                <button className="flex items-center justify-center gap-3 bg-white/5 border border-white/5 py-4 rounded-2xl hover:bg-white/10 transition-all group">
                                    <Github className="w-5 h-5 text-zinc-400 group-hover:text-white transition-colors" />
                                    <span className="text-xs font-black text-white uppercase tracking-widest">Github</span>
                                </button>
                            </div>

                            <p className="mt-10 text-center text-sm font-bold text-zinc-500">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 hover:text-blue-400 transition-colors no-underline">Sign In</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Features Overlay (Desktop Only) */}
            <div className="hidden lg:block absolute right-10 bottom-10 p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md max-w-sm">
                <div className="flex items-center gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 text-blue-500" />
                    <h4 className="text-xs font-black uppercase tracking-widest text-white">Why join IELTS AI?</h4>
                </div>
                <ul className="space-y-3 text-[10px] font-bold text-zinc-500 uppercase tracking-widest leading-relaxed">
                    <li>• Instant AI Feedback on Writing</li>
                    <li>• Real-time Speaking Analysis</li>
                    <li>• Full Academic/General Mock Tests</li>
                    <li>• Detailed Progress Analytics</li>
                </ul>
            </div>

            <footer className="p-8 text-center relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">Powered by Arte Analytics</p>
            </footer>
        </div>
    );
}
