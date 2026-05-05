import { motion } from 'framer-motion';
import { Check, ArrowRight, MousePointer2, Zap, Shield, Microscope } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function AcademicReading() {
    const questionTypes = [
        "Multiple Choice",
        "True/False/Not Given",
        "Matching Headings",
        "Sentence Completion",
        "Summary Completion",
        "Labeling Diagrams"
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-0 w-[70vw] h-[70vw] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[120px]" />
            </div>

            <Header />

            <div className="container max-w-6xl pt-40 relative z-10 px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center mb-32">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <div className="inline-flex py-1 px-3 rounded-full border border-blue-500/20 bg-blue-500/5 text-blue-400 text-xs font-bold mb-6 uppercase tracking-widest">
                            READING MODULE
                        </div>
                        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
                            Master <br /><span className="text-zinc-500">Academic Reading.</span>
                        </h1>
                        <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-xl">
                            Our AI-driven reading engine helps you decode complex academic texts, identify "distractor" answers, and manage your time with surgical precision.
                        </p>
                        <Link to="/app/reading" className="btn-modern btn-primary-modern text-lg px-10 py-4">
                            Start Reading Practice
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-blue-500/20 blur-[100px] -z-10 rounded-full" />
                        <div className="bento-card p-8 bg-zinc-900/50 border-white/5 relative overflow-hidden">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="p-3 bg-blue-500/20 rounded-xl">
                                    <Microscope className="w-6 h-6 text-blue-400" />
                                </div>
                                <h3 className="text-xl font-bold italic uppercase tracking-tight">Trap Detection AI</h3>
                            </div>
                            <div className="space-y-4 mb-8">
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Paragraph 2 Analysis</span>
                                        <span className="text-[10px] font-bold text-red-500 bg-red-500/10 px-2 py-0.5 rounded uppercase">Trap Detected</span>
                                    </div>
                                    <p className="text-sm text-zinc-300">"The author's use of 'predominantly' suggests a trend, not an absolute rule. Option B is a distractor."</p>
                                </div>
                                <div className="p-4 rounded-xl bg-white/5 border border-white/5 opacity-50">
                                    <div className="h-2 w-2/3 bg-zinc-800 rounded mb-2" />
                                    <div className="h-2 w-full bg-zinc-800 rounded" />
                                </div>
                            </div>
                            <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: "75%" }}
                                    className="h-full bg-blue-500"
                                />
                            </div>
                            <p className="text-center text-[10px] font-black text-zinc-500 mt-4 uppercase tracking-[0.3em]">Neural Verification Active</p>
                        </div>
                    </motion.div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    <div className="bento-card p-10 bg-zinc-900/20 border-white/5">
                        <Zap className="w-10 h-10 text-blue-400 mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">Skimming Secrets.</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Learn to identify "pivotal keywords" and topic sentences in seconds. Our engine tracks your eye-path (on supported devices) to optimize reading speed.
                        </p>
                    </div>
                    <div className="bento-card p-10 bg-zinc-900/20 border-white/5">
                        <Shield className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">Verified Content.</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            All passages are selected from peer-reviewed journals and academic publications, ensuring 100% alignment with actual IELTS standards.
                        </p>
                    </div>
                    <div className="bento-card p-10 bg-zinc-900/20 border-white/5">
                        <MousePointer2 className="w-10 h-10 text-purple-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">Interact & Input.</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            A seamless interface designed for both highlighting and quick-note taking, just like the real computer-delivered IELTS exam.
                        </p>
                    </div>
                </div>

                <div className="bento-card p-12 bg-gradient-to-r from-zinc-900 to-black border-blue-500/20">
                    <h3 className="text-3xl font-bold mb-10 text-center uppercase tracking-tighter italic">Coverage of All <span className="text-blue-400">Question Types.</span></h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-8 gap-x-12">
                        {questionTypes.map((type) => (
                            <div key={type} className="flex items-center gap-3">
                                <div className="w-5 h-5 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                                    <Check className="w-3 h-3 text-blue-400" />
                                </div>
                                <span className="text-zinc-300 font-medium">{type}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-zinc-500 text-sm font-medium">
                        Optimized for Arte Analytics Neural Core • 300+ Academic Passages Available
                    </p>
                </div>
            </div>
        </div>
    );
}
