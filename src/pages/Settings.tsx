import {
    Shield,
    Brain,
    Target,
    UserCircle,
    Camera,
    Save,
    Crown,
    Volume2,
    Eye,
    Layout
} from 'lucide-react';

export default function Settings() {
    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2 italic">Matrix, <span className="text-zinc-500">Config.</span></h1>
                    <p className="text-zinc-400 font-medium tracking-tight">Optimize your neural training environment and personal profile.</p>
                </div>
                <button className="btn-modern btn-primary-modern px-6 py-3 text-[10px] font-black uppercase tracking-[0.2em]">
                    <Save className="w-4 h-4" />
                    Save Configuration
                </button>
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Left Column: Profile & Account */}
                <div className="lg:col-span-8 space-y-8">
                    {/* Profile Section */}
                    <div className="bento-card p-10 bg-zinc-900 border border-white/5 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />

                        <div className="relative z-10 space-y-8">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <UserCircle className="w-6 h-6" />
                                </div>
                                <h2 className="text-xl font-black uppercase tracking-tight italic text-white text-[10px]">Neural Identity Matrix</h2>
                            </div>

                            <div className="flex flex-col md:flex-row gap-10 items-start">
                                <div className="relative">
                                    <div className="w-32 h-32 rounded-[32px] overflow-hidden border-2 border-white/10 group-hover:border-primary/50 transition-all">
                                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Sarah" alt="Avatar" className="w-full h-full" />
                                    </div>
                                    <button className="absolute -bottom-2 -right-2 p-3 bg-zinc-950 border border-white/10 rounded-2xl text-zinc-400 hover:text-white transition-all shadow-2xl">
                                        <Camera className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex-1 grid md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Full Name</label>
                                        <input
                                            type="text"
                                            defaultValue="M Ibrahim"
                                            className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-zinc-200 font-bold tracking-tight transition-all"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Target Band Score</label>
                                        <select className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-zinc-200 font-bold tracking-tight transition-all appearance-none">
                                            <option>Band 7.0</option>
                                            <option selected>Band 7.5</option>
                                            <option>Band 8.0</option>
                                            <option>Band 8.5+</option>
                                        </select>
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest ml-1">Genetic Bio-Summary</label>
                                        <textarea
                                            rows={3}
                                            defaultValue="I am a dedicated practitioner focused on mastering lexical variety and complex grammatical structures."
                                            className="w-full px-5 py-4 rounded-2xl bg-white/5 border border-white/5 focus:border-primary/50 focus:ring-1 focus:ring-primary/20 outline-none text-zinc-200 font-medium tracking-tight transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Neuro-Config Section */}
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bento-card p-8 bg-zinc-900/40 border border-white/5 hover:border-emerald-500/20 transition-all space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-500">
                                    <Brain className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Feedback</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white mb-2">AI Intensity</h3>
                                <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-6">Current: Advanced Diagnostic</p>
                                <div className="space-y-4">
                                    {[
                                        { l: 'Standard', d: 'Basic corrections and scoring.' },
                                        { l: 'Advanced', d: 'Deep lexical and structural analysis.', active: true },
                                        { l: 'Brutal', d: 'Maximum strictness for perfectionists.' },
                                    ].map((opt, i) => (
                                        <div key={i} className={`p-4 rounded-2xl border ${opt.active ? 'border-emerald-500/50 bg-emerald-500/5' : 'border-white/5 hover:bg-white/5'} cursor-pointer transition-all`}>
                                            <p className={`text-xs font-black uppercase tracking-wider mb-1 ${opt.active ? 'text-emerald-500' : 'text-zinc-400'}`}>{opt.l}</p>
                                            <p className="text-[10px] text-zinc-500 font-medium">{opt.d}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="bento-card p-8 bg-zinc-900/40 border border-white/5 hover:border-blue-500/20 transition-all space-y-6">
                            <div className="flex justify-between items-center">
                                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-500">
                                    <Target className="w-5 h-5" />
                                </div>
                                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">Training</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-black text-white mb-2">Timed Mode</h3>
                                <p className="text-zinc-500 text-[11px] font-bold uppercase tracking-widest mb-6">Default Session Lengths</p>
                                <div className="space-y-6">
                                    {['Writing T1: 20M', 'Writing T2: 40M', 'Reading: 60M'].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between">
                                            <span className="text-xs font-bold text-zinc-400">{item}</span>
                                            <div className="w-12 h-6 bg-zinc-800 rounded-full relative p-1 cursor-pointer">
                                                <div className={`w-4 h-4 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)] ${i < 2 ? 'translate-x-6' : 'translate-x-0'} transition-transform`} />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Preferences & Sub */}
                <div className="lg:col-span-4 space-y-8">
                    {/* Access Tier */}
                    <div className="bento-card p-8 bg-primary border-none text-black relative overflow-hidden group">
                        <Crown className="absolute top-4 right-4 w-12 h-12 text-black/20 -rotate-12" />
                        <div className="relative z-10">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] bg-black/10 px-2 py-1 rounded">Current Plan</span>
                            <h3 className="text-3xl font-black tracking-tighter mt-4 mb-2 leading-none">Free Matrix</h3>
                            <p className="text-black/60 text-[11px] font-black uppercase tracking-widest mb-8">3 Tests Available</p>
                            <button className="w-full bg-black text-white py-4 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] shadow-2xl hover:scale-105 transition-transform">
                                Upgrade to Elite
                            </button>
                        </div>
                    </div>

                    {/* Interface Prefs */}
                    <div className="bento-card p-8 bg-zinc-900 border border-white/5 space-y-6">
                        <div className="flex items-center gap-3">
                            <Eye className="w-5 h-5 text-zinc-400" />
                            <h4 className="text-[10px] font-black text-white uppercase tracking-widest">Interface Matrix</h4>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-zinc-500">Dark Navy Mode</span>
                                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                                    <Target className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-zinc-500">Compact Sidebar</span>
                                <div className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-500">
                                    <Layout className="w-4 h-4" />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-zinc-500">Voice Synthesis</span>
                                <div className="w-10 h-10 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-colors flex items-center justify-center text-zinc-500 cursor-pointer">
                                    <Volume2 className="w-4 h-4" />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bento-card p-8 bg-zinc-950 border border-white/5 space-y-6">
                        <div className="flex items-center gap-3">
                            <Shield className="w-5 h-5 text-zinc-600" />
                            <h4 className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Security Matrix</h4>
                        </div>
                        <button className="w-full text-left p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/5 text-[10px] font-black text-zinc-400 uppercase tracking-widest transition-all">
                            Change Neural Passkey
                        </button>
                        <button className="w-full text-left p-4 rounded-2xl bg-red-500/5 hover:bg-red-500/10 border border-red-500/10 text-[10px] font-black text-red-500/50 hover:text-red-500 uppercase tracking-widest transition-all">
                            Deactivate Matrix Identity
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
