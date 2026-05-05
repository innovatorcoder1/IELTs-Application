import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import productPreview from '../assets/product-preview.png';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import {
    ArrowRight,
    Zap,
    Shield,
    Layers,
    BarChart3,
    Globe,
    Star,
    Activity,
    Fingerprint,
    Microscope,
    Binary
} from 'lucide-react';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-primary/20 rounded-full blur-[120px]" />
                <div className="absolute -bottom-[20%] -right-[10%] w-[60vw] h-[60vw] bg-purple-600/10 rounded-full blur-[120px]" />
            </div>

            <Header />

            {/* Hero Section */}
            <section className="relative pt-32 md:pt-40 pb-16 md:pb-20 overflow-hidden">
                <div className="container relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-semibold mb-8">
                            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                            v2.0 is now live with Voice Analytics
                        </div>
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-extrabold tracking-tight leading-[1.1] md:leading-[0.9] mb-8">
                            Intelligence <br /> for <span className="text-zinc-500">Excellence.</span>
                        </h1>
                        <p className="text-zinc-400 text-xl max-w-2xl mx-auto mb-12 font-medium">
                            The world's most advanced AI coaching engine for IELTS candidates. Get personalized feedback, instant scores, and deep analytics.
                        </p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4 px-4 sm:px-0">
                            <Link to="/app" className="btn-modern btn-primary-modern text-base md:text-lg px-8 md:px-10 border-2 border-white w-full sm:w-auto">
                                Start for Free
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                            <button
                                onClick={() => document.getElementById('methodology')?.scrollIntoView({ behavior: 'smooth' })}
                                className="btn-modern btn-outline-modern text-base md:text-lg px-8 md:px-10 w-full sm:w-auto"
                            >
                                View Methodology
                            </button>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-24 relative max-w-6xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[100px] -z-10 rounded-full" />
                        <div className="bento-card p-2 bg-zinc-900 shadow-2xl">
                            <img
                                src={productPreview}
                                className="w-full rounded-xl shadow-2xl"
                                alt="IELTS AI Dashboard Preview"
                            />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Methodology Section */}
            <section id="methodology" className="py-20 md:py-40 bg-zinc-950/50 border-y border-white/5">
                <div className="container">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-7xl font-bold mb-8">Neural Methodology.</h2>
                        <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
                            Our proprietary <strong>IELTS Neural Engine (INE)</strong> decomposes human language into measurable data points, using three core pillars of artificial intelligence.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        <div className="group">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-primary/50 transition-colors">
                                <Binary className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Syntactic Profiling</h3>
                            <p className="text-zinc-500 leading-relaxed mb-6">
                                The engine maps your grammatical structures against a 100M+ sentence dataset to identify "Native Coherence" patterns.
                            </p>
                            <div className="h-1 w-12 bg-primary rounded-full" />
                        </div>

                        <div className="group">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-purple-500/50 transition-colors">
                                <Fingerprint className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Lexical Mapping</h3>
                            <p className="text-zinc-500 leading-relaxed mb-6">
                                Beyond simple spellcheck, we evaluate "Topic-Specific Collocations" and academic vocabulary density in real-time.
                            </p>
                            <div className="h-1 w-12 bg-purple-500 rounded-full" />
                        </div>

                        <div className="group">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 group-hover:border-emerald-500/50 transition-colors">
                                <Activity className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Acoustic Analysis</h3>
                            <p className="text-zinc-500 leading-relaxed mb-6">
                                For Speaking, our neural network detects subtle rhythmics, intonation variance, and phonetic accuracy for Band 9 precision.
                            </p>
                            <div className="h-1 w-12 bg-emerald-500 rounded-full" />
                        </div>
                    </div>

                    <div className="mt-32 p-12 bento-card border-primary/20 bg-gradient-to-r from-zinc-900 to-black overflow-hidden relative">
                        <div className="absolute right-0 top-0 w-64 h-64 bg-primary/20 blur-[100px] -z-10" />
                        <div className="max-w-2xl">
                            <Microscope className="w-12 h-12 text-white mb-8" />
                            <h3 className="text-3xl font-bold mb-6 italic">Built for High Stakes.</h3>
                            <p className="text-zinc-400 text-lg leading-relaxed">
                                Our models are fine-tuned on anonymized high-scoring scripts from the top 1% of IELTS candidates globally. We don't just find mistakes; we predict how an examiner would perceive your nuanced proficiency.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section id="features" className="py-40 container">
                <div className="mb-20">
                    <h2 className="text-4xl font-bold mb-4">Engineered for <span className="text-zinc-500">Precision.</span></h2>
                    <p className="text-zinc-400 max-w-lg">Our multi-model AI architecture analyzes your skills at a level previously only available to human examiners.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 h-[800px]">
                    <div className="md:col-span-8 bento-card p-10 flex flex-col justify-end bg-gradient-to-t from-zinc-900 to-transparent">
                        <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center mb-6">
                            <Zap className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-3xl font-bold mb-4">Neural Writing Evaluator</h3>
                        <p className="text-zinc-400 max-w-md">Real-time lexical density mapping and semantic coherence analysis of your IELTS essays.</p>
                    </div>
                    <div className="md:col-span-4 bento-card p-10 flex flex-col justify-between border-primary/20">
                        <Globe className="w-8 h-8 text-primary" />
                        <div>
                            <h3 className="text-2xl font-bold mb-2">Global Benchmarking</h3>
                            <p className="text-sm text-zinc-500">Compare your progress against 50k+ daily users worldwide.</p>
                        </div>
                    </div>
                    <div className="md:col-span-4 bento-card p-10 bg-zinc-900/50">
                        <Shield className="w-8 h-8 text-purple-500 mb-6" />
                        <h3 className="text-2xl font-bold mb-2">Verified Content</h3>
                        <p className="text-sm text-zinc-500">All practice material is vetted by ex-British Council examiners.</p>
                    </div>
                    <div className="md:col-span-8 bento-card p-10 flex items-center justify-between overflow-hidden group">
                        <div>
                            <Layers className="w-8 h-8 text-cyan-400 mb-6" />
                            <h3 className="text-3xl font-bold mb-4">Infinite Practice Arena</h3>
                            <p className="text-zinc-400 max-w-sm">Never run out of tasks. Our AI generates unique prompts tailored to your current band level.</p>
                        </div>
                        <div className="translate-x-10 group-hover:translate-x-0 transition-transform duration-500">
                            <BarChart3 className="w-40 h-40 text-white/5" />
                        </div>
                    </div>
                </div>
            </section>

            {/* Social Proof Marks */}
            <section className="py-20 border-y border-white/5 bg-zinc-950/30">
                <div className="container flex flex-wrap justify-center gap-16 md:gap-32 items-center grayscale opacity-30">
                    <div className="text-xl font-black italic tracking-tighter">THE GUARDIAN</div>
                    <div className="text-xl font-black italic tracking-tighter">EDTECH INSIDER</div>
                    <div className="text-xl font-black italic tracking-tighter">FORBES</div>
                    <div className="text-xl font-black italic tracking-tighter">TECHCRUNCH</div>
                </div>
            </section>

            {/* Success Stories */}
            <section id="results" className="py-40 container">
                <div className="text-center mb-20">
                    <h2 className="text-4xl md:text-6xl font-bold mb-6">Real Results. <span className="text-zinc-500">Real Impact.</span></h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto">Join thousands of students who achieved their target band score with our AI-powered preparation platform.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bento-card p-8 bg-zinc-900/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xl">S</div>
                            <div>
                                <h4 className="font-bold">Siddharth M.</h4>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                </div>
                            </div>
                        </div>
                        <p className="text-zinc-400 italic mb-6">"The AI Speaking Coach is mind-blowing. It caught my hesitation patterns that my human tutor missed. Went from Band 6.5 to 8.0 in just 3 weeks."</p>
                        <div className="text-xs font-bold text-zinc-600 tracking-widest uppercase">Target: 7.5 | Achieved: 8.0</div>
                    </div>

                    <div className="bento-card p-8 border-primary/20 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4">
                            <Zap className="w-5 h-5 text-primary opacity-20" />
                        </div>
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-500 font-bold text-xl">E</div>
                            <div>
                                <h4 className="font-bold">Elena R.</h4>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                </div>
                            </div>
                        </div>
                        <p className="text-zinc-400 italic mb-6">"Writing was my biggest hurdle. The instant grammar and coherence feedback helped me restructure my essays. Finally hit my Band 7.5 for Canada PR!"</p>
                        <div className="text-xs font-bold text-zinc-600 tracking-widest uppercase">Target: 7.0 | Achieved: 7.5</div>
                    </div>

                    <div className="bento-card p-8 bg-zinc-900/50">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500 font-bold text-xl">A</div>
                            <div>
                                <h4 className="font-bold">Ahmed K.</h4>
                                <div className="flex gap-1">
                                    {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                </div>
                            </div>
                        </div>
                        <p className="text-zinc-400 italic mb-6">"The Reading and Listening simulations are exactly like the real test. The 'Trap Detection' feature is a game-changer for avoiding common mistakes."</p>
                        <div className="text-xs font-bold text-zinc-600 tracking-widest uppercase">Target: 8.0 | Achieved: 8.5</div>
                    </div>

                    <div className="md:col-span-2 bento-card p-10 flex flex-col md:flex-row gap-10 items-center justify-between bg-gradient-to-br from-zinc-900 to-black">
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-500 font-bold text-xl">L</div>
                                <div>
                                    <h4 className="font-bold">Liu W.</h4>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-zinc-400 italic text-lg leading-relaxed mb-6">"I struggled with the computer-delivered format. This platform's interface is identical to the real exam. It removed all my anxiety before the test day. Highly recommend for serious candidates."</p>
                            <div className="text-xs font-bold text-zinc-600 tracking-widest uppercase">Achieved Band 8.5 (Overall)</div>
                        </div>
                        <div className="w-40 h-40 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-center justify-center">
                            <div className="text-5xl font-black text-white">8.5</div>
                            <div className="text-[10px] font-bold text-zinc-500 mt-2 tracking-widest">OVERALL BAND</div>
                        </div>
                    </div>

                    <div className="bento-card p-8 bg-zinc-900/50 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-500 font-bold text-xl">P</div>
                                <div>
                                    <h4 className="font-bold">Priya D.</h4>
                                    <div className="flex gap-1">
                                        {[...Array(5)].map((_, i) => <Star key={i} className="w-3 h-3 fill-primary text-primary" />)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-zinc-400 italic mb-6">"The personalized study plan kept me on track. I knew exactly which areas to focus on every day. No more wasted time!"</p>
                        </div>
                        <div className="text-xs font-bold text-zinc-600 tracking-widest uppercase">Target: 7.5 | Achieved: 7.5</div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-40 container text-center relative overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] bg-primary/20 blur-[150px] -z-10 rounded-full" />
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <div className="inline-flex py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-10">
                        LIMITED TIME OFFER
                    </div>
                    <h2 className="text-5xl md:text-7xl font-bold mb-10">Don't just prepare. <br /> Predict your future.</h2>
                    <div className="flex justify-center gap-6">
                        <Link to="/app" className="btn-modern btn-primary-modern text-xl px-12 py-5">
                            Start Free Trial
                        </Link>
                    </div>
                    <p className="mt-8 text-zinc-500 font-medium">Join 500+ successful students this month.</p>
                </motion.div>
            </section>

            <Footer />
            <FloatingWhatsApp />
        </div>
    );
}
