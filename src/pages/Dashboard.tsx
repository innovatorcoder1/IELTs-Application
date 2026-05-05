import { motion } from 'framer-motion';
import {
    TrendingUp,
    Zap,
    ArrowUpRight,
    Target as Aim,
    Calendar,
    Sparkles,
    ChevronRight,
    Headphones,
    BookOpen,
    PenTool,
    Mic,
    Layout
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { usePerformance } from '../lib/PerformanceContext';

export default function Dashboard() {
    const { data, getAverageScore } = usePerformance();

    const modules = [
        {
            title: "Listening",
            desc: "40 Questions • 30 Min",
            path: "/app/listening",
            icon: Headphones,
            color: "cyan-400",
            status: getAverageScore('listening') || "0.0",
            tasks: "Diagnostic Active"
        },
        {
            title: "Reading",
            desc: "3 Passages • 60 Min",
            path: "/app/reading",
            icon: BookOpen,
            color: "blue-500",
            status: getAverageScore('reading') || "0.0",
            tasks: "3 Tasks Daily"
        },
        {
            title: "Writing",
            desc: "2 Tasks • 60 Min",
            path: "/app/writing",
            icon: PenTool,
            color: "emerald-500",
            status: getAverageScore('writing') || "0.0",
            tasks: "AI Evaluation Live"
        },
        {
            title: "Speaking",
            desc: "3 Parts • 15 Min",
            path: "/app/speaking",
            icon: Mic,
            color: "purple-500",
            status: getAverageScore('speaking') || "0.0",
            tasks: "Voice Matrix Active"
        }
    ];

    const overallBand = getAverageScore();

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Dynamic Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter mb-2 italic">Morning, <span className="text-slate-500">Scholar.</span></h1>
                    <p className="text-slate-400 font-medium tracking-tight text-sm md:text-base">Your current trajectory is <span className="text-emerald-400 font-black">Band {overallBand}</span>. System is optimized.</p>
                </div>
                <div className="flex gap-3">
                    <div className="px-5 py-2.5 rounded-2xl bg-[#0C121D] border border-white/5 flex items-center gap-3 shadow-xl">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                        </div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">DAILY GOAL: 60M</span>
                    </div>
                </div>
            </div>

            <div className="grid lg:grid-cols-12 gap-6">
                {/* Main Performance Matrix */}
                <div className="lg:col-span-8 space-y-6">
                    <div className="bento-card p-8 min-h-[380px] flex flex-col justify-between relative group overflow-hidden border border-white/5">
                        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 blur-[120px] rounded-full -mr-40 -mt-40 group-hover:bg-indigo-500/20 transition-all duration-700 pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-10">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center border border-white/5">
                                        <TrendingUp className="w-5 h-5 text-indigo-400" />
                                    </div>
                                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Performance Index</span>
                                </div>
                                <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">Updated Live</div>
                            </div>

                            <div className="flex items-baseline gap-3 md:gap-6 mb-4 flex-wrap">
                                <span className="text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter text-slate-50">{overallBand}</span>
                                <div className="flex flex-col gap-1">
                                    <div className="flex items-center gap-2 text-emerald-400 font-black bg-emerald-400/10 px-2 py-0.5 rounded-lg text-sm w-fit">
                                        +0.5 <ArrowUpRight className="w-4 h-4" />
                                    </div>
                                    <span className="text-slate-400 text-[10px] font-black uppercase tracking-widest pl-1">Est. Band Score</span>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-10 pt-8 border-t border-white/5">
                            {modules.map(module => (
                                <div key={module.title} className="text-center group/item cursor-pointer">
                                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1.5 group-hover/item:text-indigo-400 transition-colors">{module.title}</p>
                                    <p className="text-xl font-black tracking-tighter text-slate-200 group-hover/item:text-slate-50 transition-colors">{module.status}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        <div className="bento-card p-8 border border-white/5 hover:border-violet-500/30 transition-all group">
                            <div className="flex justify-between items-start mb-8">
                                <Aim className="w-8 h-8 text-violet-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black text-violet-400 uppercase tracking-widest">Progress</span>
                            </div>
                            <h3 className="text-xl font-black mb-1 text-slate-100 uppercase tracking-tight italic">Target Score</h3>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-6">Objective: Band {data.targetScore}</p>
                            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: '65%' }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-violet-500 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                                />
                            </div>
                        </div>
                        <div className="bento-card p-8 border border-white/5 hover:border-cyan-400/30 transition-all group">
                            <div className="flex justify-between items-start mb-8">
                                <Calendar className="w-8 h-8 text-cyan-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black text-cyan-400 uppercase tracking-widest">Momentum</span>
                            </div>
                            <h3 className="text-xl font-black mb-1 text-slate-100 uppercase tracking-tight italic">{data.streak}-Day Streak</h3>
                            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest mb-6">Tier: {data.streak > 10 ? 'Elite Practitioner' : 'Active Learner'}</p>
                            <div className="flex gap-2">
                                {[...Array(7)].map((_, i) => (
                                    <div key={i} className={`flex-1 h-1.5 rounded-full ${i < (data.streak % 7 || 7) ? 'bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.2)]' : 'bg-white/5'}`} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sidebar Contextual Widgets */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bento-card p-10 flex flex-col items-center text-center border border-white/5">
                        <div className="w-24 h-24 rounded-3xl bg-white/5 border border-white/5 flex items-center justify-center mb-8 relative group cursor-pointer">
                            <div className="absolute inset-0 border-2 border-indigo-500 border-t-transparent rounded-3xl animate-spin [animation-duration:3s]" />
                            <Sparkles className="w-10 h-10 text-indigo-400 group-hover:scale-110 transition-transform" />
                        </div>
                        <h3 className="text-xl font-black mb-2 uppercase tracking-tight italic text-slate-100">AI Core Status</h3>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-8 leading-loose">Analyzing voice signatures and lexical weight for Speaking Task 2</p>
                        <Link to="/app/analytics" className="w-full btn-modern btn-outline-modern py-3 text-[10px] font-black uppercase tracking-[0.2em] border-white/10 text-slate-400 hover:bg-white/5">
                            VIEW NEURAL ANALYSIS
                        </Link>
                    </div>

                    <Link to="/pricing" className="bento-card p-10 text-white group cursor-pointer border-none shadow-2xl block relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}>
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div className="flex justify-between items-start mb-10 relative z-10">
                            <Zap className="w-8 h-8" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-white/10 px-2 py-1 rounded">Pro Tier</span>
                        </div>
                        <h3 className="text-2xl font-black tracking-tighter leading-none mb-2 relative z-10 uppercase italic">Upgrade to Elite</h3>
                        <p className="text-white/60 text-[11px] font-black uppercase tracking-widest mb-10 relative z-10">Full diagnostic access</p>
                        <div className="flex items-center justify-between relative z-10">
                            <span className="text-lg font-black">$19.99/mo</span>
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl">
                                <ChevronRight className="w-6 h-6 text-white" />
                            </div>
                        </div>
                    </Link>

                    <div className="p-6 rounded-3xl border border-dashed border-white/10 text-center bg-white/[0.02]">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Next Theoretical Exam: SEP 24 2024</p>
                    </div>
                </div>
            </div>

            {/* Training Arena - Direct Module Access */}
            <section className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-2xl font-black tracking-tight italic flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-primary rounded-full" />
                        Training Arena
                    </h3>
                    <div className="text-[10px] font-black text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                        <Layout className="w-3.5 h-3.5" />
                        CORE MODULES
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {modules.map((m, i) => (
                        <Link key={m.title} to={m.path}>
                            <motion.div
                                whileHover={{ y: -8, scale: 1.02 }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bento-card p-8 border border-white/5 hover:border-white/10 transition-all relative overflow-hidden group h-full flex flex-col"
                            >
                                <div className={`absolute top-0 right-0 w-32 h-32 bg-${m.color}/5 blur-[60px] rounded-full -mr-16 -mt-16 group-hover:bg-${m.color}/10 transition-all`} />

                                <div className="flex justify-between items-start mb-8 relative z-10">
                                    <div className={`p-4 bg-white/5 rounded-2xl border border-white/5 text-${m.color} group-hover:scale-110 transition-transform`}>
                                        <m.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1.5 h-1.5 rounded-full bg-${m.color} animate-pulse`} />
                                        <span className={`text-[10px] font-black text-${m.color} uppercase tracking-widest`}>Active</span>
                                    </div>
                                </div>

                                <div className="relative z-10 mb-8">
                                    <h4 className="text-xl font-black text-slate-100 mb-1 uppercase tracking-tight italic">{m.title}</h4>
                                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{m.desc}</p>
                                </div>

                                <div className="mt-auto space-y-4 relative z-10 pt-6 border-t border-white/5">
                                    <div className="flex items-center justify-between text-[10px] font-black tracking-widest">
                                        <span className="text-slate-600 uppercase">Current Stat</span>
                                        <span className="text-slate-100 bg-white/5 px-2 py-0.5 rounded italic">BAND {m.status}</span>
                                    </div>
                                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest group-hover:text-slate-100 transition-colors flex items-center gap-2">
                                        <Zap className="w-3 h-3 text-indigo-400" />
                                        {m.tasks}
                                    </p>
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Recent Evaluations Section */}
            <section className="space-y-8">
                <div className="flex items-center justify-between px-2">
                    <h3 className="text-2xl font-black tracking-tight italic flex items-center gap-4">
                        <div className="w-1.5 h-8 bg-zinc-800 rounded-full" />
                        Evaluation Matrix
                    </h3>
                    <button className="text-[10px] font-black text-zinc-500 hover:text-white transition-colors uppercase tracking-[0.2em] flex items-center gap-2">
                        ALL HISTORY <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="space-y-4">
                    {data.scores.slice(0, 3).map((item, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ x: 12 }}
                            className="bento-card p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between cursor-pointer group border border-white/5 hover:border-white/10 gap-6"
                        >
                            <div className="flex items-center gap-4 md:gap-8">
                                <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center text-slate-500 group-hover:text-indigo-400 group-hover:border-indigo-500/20 transition-all shadow-inner shrink-0">
                                    {item.module === 'writing' && <PenTool className="w-5 h-5 md:w-6 md:h-6" />}
                                    {item.module === 'speaking' && <Mic className="w-5 h-5 md:w-6 md:h-6" />}
                                    {item.module === 'listening' && <Headphones className="w-5 h-5 md:w-6 md:h-6" />}
                                    {item.module === 'reading' && <BookOpen className="w-5 h-5 md:w-6 md:h-6" />}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 md:gap-4 mb-1 md:mb-2">
                                        <span className="text-[9px] md:text-[10px] font-black text-indigo-400 uppercase tracking-[0.25em]">{item.tag}</span>
                                        <div className="w-1 h-1 rounded-full bg-white/10" />
                                        <span className="text-[9px] md:text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                                            {new Date(item.date).toLocaleDateString() === new Date().toLocaleDateString() ? 'TODAY' : new Date(item.date).toLocaleDateString()}
                                        </span>
                                    </div>
                                    <h4 className="text-base md:text-lg font-black text-slate-200 group-hover:text-white transition-colors tracking-tight italic">{item.title}</h4>
                                </div>
                            </div>
                            <div className="flex items-center justify-between w-full md:w-auto md:gap-12 pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                                <div className="text-left md:text-right">
                                    <p className="text-[9px] md:text-[10px] font-black text-slate-600 uppercase tracking-widest mb-1">SCORE</p>
                                    <p className="text-2xl md:text-3xl font-black italic tracking-tighter text-slate-50">{item.score}</p>
                                </div>
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border border-white/5 flex items-center justify-center bg-white/5 group-hover:scale-110 transition-transform text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]`}>
                                    <ArrowUpRight className={`w-5 h-5 md:w-6 md:h-6`} />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
}
