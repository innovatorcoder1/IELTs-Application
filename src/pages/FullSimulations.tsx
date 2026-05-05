import { motion } from 'framer-motion';
import { Headphones, BookOpen, PenTool, Mic, Play, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function FullSimulations() {
    const sections = [
        {
            title: "Listening",
            duration: "30 Min",
            desc: "4 Sections • 40 Questions",
            icon: Headphones,
            color: "text-cyan-400"
        },
        {
            title: "Reading",
            duration: "60 Min",
            desc: "3 Passages • 40 Questions",
            icon: BookOpen,
            color: "text-blue-500"
        },
        {
            title: "Writing",
            duration: "60 Min",
            desc: "2 Tasks • AI Evaluated",
            icon: PenTool,
            color: "text-emerald-500"
        },
        {
            title: "Speaking",
            duration: "15 Min",
            desc: "3 Parts • Voice Analysis",
            icon: Mic,
            color: "text-purple-500"
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[80vw] bg-primary/10 rounded-full blur-[120px]" />
            </div>

            <Header />

            <div className="container max-w-6xl pt-40 relative z-10 px-8">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-6"
                    >
                        COMPLETE EXAM ENGINE
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-8xl font-bold tracking-tight mb-8"
                    >
                        Full Exam <br /><span className="text-zinc-500">Simulations.</span>
                    </motion.h1>
                    <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed mb-12">
                        Experience the pressure of the real IELTS test with our end-to-end neural simulation environment.
                    </p>

                    <Link to="/app" className="btn-modern btn-primary-modern text-xl px-12 py-5 shadow-2xl shadow-primary/20">
                        <Play className="w-5 h-5 fill-current" />
                        Start Full Simulation
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-20">
                    {sections.map((s, idx) => (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                            className="bento-card p-8 bg-zinc-900/40 border-white/5 flex flex-col items-center text-center"
                        >
                            <div className={`w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-6 ${s.color}`}>
                                <s.icon className="w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight italic">{s.title}</h3>
                            <p className="text-zinc-500 text-xs font-black tracking-widest uppercase mb-4">{s.duration}</p>
                            <p className="text-zinc-400 text-sm leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bento-card p-10 bg-gradient-to-br from-zinc-900 to-black relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8">
                            <Shield className="w-12 h-12 text-primary/10 group-hover:text-primary/20 transition-colors" />
                        </div>
                        <h3 className="text-3xl font-bold mb-6 italic">Simulation Rules.</h3>
                        <ul className="space-y-4 text-zinc-400 font-medium">
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                2 Hours 45 Minutes continuous session
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                No pausing allowed once timer starts
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Full AI 'Neural Verdict' upon completion
                            </li>
                            <li className="flex items-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                Realistic UI identical to computer-delivered IELTS
                            </li>
                        </ul>
                    </div>

                    <div className="bento-card p-10 border-primary/20 bg-zinc-900/20 relative group overflow-hidden">
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/5 blur-3xl group-hover:bg-primary/10 transition-colors" />
                        <Zap className="w-12 h-12 text-primary mb-8 animate-pulse" />
                        <h3 className="text-3xl font-bold mb-6 italic">Why Simulate?</h3>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                            Research shows that students who complete at least 3 full-length simulations score an average of <strong>1.5 bands higher</strong> than those who only practice modules individually.
                        </p>
                        <div className="h-1 w-20 bg-primary rounded-full" />
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-zinc-500 text-sm italic font-medium">
                        Secure Environment • Powered by Arte Analytics • 99.8% Scoring Accuracy
                    </p>
                </div>
            </div>
        </div>
    );
}
