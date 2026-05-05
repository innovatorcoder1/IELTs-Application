import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, Github, Chrome, ArrowRight, ChevronLeft } from 'lucide-react';
import logo from '../assets/logo.png';

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#04070D] flex flex-col relative overflow-hidden">
            {/* Background Orbs */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

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
                <div className="w-10" /> {/* Spacer */}
            </header>

            <main className="flex-1 flex items-center justify-center p-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="w-full max-w-md"
                >
                    <div className="bento-card p-8 md:p-10 bg-zinc-900/50 border border-white/5 backdrop-blur-xl relative overflow-hidden">
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-purple-500/5 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="mb-10 text-center">
                                <h1 className="text-3xl font-black text-white mb-2">Welcome Back.</h1>
                                <p className="text-zinc-500 font-medium">Continue your journey to a higher band score.</p>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-6">
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
                                    <div className="flex justify-between items-center ml-1">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Password</label>
                                        <button type="button" className="text-[10px] font-black uppercase tracking-widest text-blue-500 hover:text-blue-400 transition-colors">Forgot?</button>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-1.5 rounded-lg bg-white/5 border border-white/10 group-focus-within:border-blue-500/50 transition-all">
                                            <Lock className="w-4 h-4 text-zinc-500 group-focus-within:text-blue-500" />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            required
                                            placeholder="••••••••"
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

                                <div className="flex items-center gap-2 py-2">
                                    <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/10 bg-white/5 text-blue-600 focus:ring-blue-500/20" />
                                    <label htmlFor="remember" className="text-xs font-bold text-zinc-500 select-none">Remember this device</label>
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
                                            Sign In
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
                                    <span className="px-3 bg-[#111] text-zinc-600 font-black uppercase tracking-[0.2em]">Social Access</span>
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
                                First time?{' '}
                                <Link to="/register" className="text-blue-500 hover:text-blue-400 transition-colors no-underline">Create an account</Link>
                            </p>
                        </div>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="p-8 text-center relative z-10">
                <p className="text-[10px] font-black uppercase tracking-widest text-zinc-700">Powered by IELTS AI Architecture v2.0</p>
            </footer>
        </div>
    );
}
