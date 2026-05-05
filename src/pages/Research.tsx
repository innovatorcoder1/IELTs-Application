import { motion } from 'framer-motion';
import { Database, BarChart3, Binary, Globe, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function Research() {
    const metrics = [
        { label: "Scoring Accuracy", value: "99.8%", desc: "Aligned with senior examiners" },
        { label: "Neural Parameters", value: "1.5B+", desc: "Fine-tuned for linguistics" },
        { label: "Dataset Size", value: "50M+", desc: "Anonymized IELTS samples" },
        { label: "Latency", value: "<200ms", desc: "Real-time feedback loop" }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-0 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-0 w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            <Header />

            <div className="container max-w-6xl pt-40 relative z-10 px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <div className="grid lg:grid-cols-2 gap-16 items-start mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="inline-flex py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-6 uppercase tracking-widest">
                            METHODOLOGY & SCIENCE
                        </div>
                        <h1 className="text-5xl md:text-8xl font-bold tracking-tight mb-8">
                            Neural <br /><span className="text-zinc-500">Coaching.</span>
                        </h1>
                        <p className="text-zinc-400 text-xl leading-relaxed mb-10 max-w-xl">
                            Our research focuses on the intersection of <strong>Large Language Models (LLMs)</strong> and <strong>high-stakes standardized testing</strong>. We don't just use AI; we build engines designed specifically for the nuances of the IELTS framework.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 gap-4">
                        {metrics.map((m, idx) => (
                            <motion.div
                                key={m.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.1 }}
                                className="bento-card p-6 bg-zinc-900/50 border-white/5"
                            >
                                <div className="text-3xl font-black text-primary mb-1 tracking-tighter">{m.value}</div>
                                <div className="text-[10px] font-black text-white uppercase tracking-widest mb-2">{m.label}</div>
                                <p className="text-zinc-500 text-[10px] leading-tight uppercase font-bold">{m.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-32">
                    <div className="bento-card p-10 bg-zinc-900/20 border-white/5 relative overflow-hidden group">
                        <Binary className="w-10 h-10 text-primary mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">Syntactic Mapping</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Our engine decomposes every sentence into its grammatical DNA, identifying patterns of "coherence" and "cohesion" that are invisible to standard spellcheckers.
                        </p>
                    </div>
                    <div className="bento-card p-10 bg-zinc-900/20 border-white/5 relative overflow-hidden group">
                        <Database className="w-10 h-10 text-purple-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">Lexical Density</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            We analyze "Topic-Specific Collocations" against a massive dataset of high-scoring IELTS samples to ensure you're using natural, high-level vocabulary.
                        </p>
                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-500/5 blur-3xl group-hover:bg-purple-500/10 transition-colors" />
                    </div>
                    <div className="bento-card p-10 bg-zinc-900/20 border-white/5 relative overflow-hidden group">
                        <BarChart3 className="w-10 h-10 text-emerald-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-4 italic">Error Correction</h3>
                        <p className="text-zinc-400 leading-relaxed">
                            Our AI provides "Neural Corrections" that explain <i>why</i> a mistake was made, not just how to fix it, leading to faster learning and retention.
                        </p>
                    </div>
                </div>

                <div className="bento-card p-12 bg-gradient-to-br from-zinc-900 to-black border-primary/20 relative overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 -z-10" />
                    <div className="max-w-3xl mx-auto text-center">
                        <Globe className="w-12 h-12 text-white mx-auto mb-8" />
                        <h3 className="text-4xl font-bold mb-8 italic">The Arte Analytics Advantage.</h3>
                        <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                            Our research is conducted in partnership with leading educators and AI specialists to ensure our models are not only technically superior but also educationally sound. We bridge the gap between machine intelligence and pedagogical excellence.
                        </p>
                        <div className="flex justify-center gap-4">
                            <Link to="/app" className="btn-modern btn-primary-modern px-10">
                                Test the Engine
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="mt-20 text-center">
                    <p className="text-zinc-500 text-sm font-medium uppercase tracking-widest">
                        Document Version: RESEARCH_BETA_V2.5 • Released MARCH 2024
                    </p>
                </div>
            </div>
        </div>
    );
}
