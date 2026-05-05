import { motion } from 'framer-motion';
import { Target, TrendingUp, Volume2, Languages, MessageSquare, Search } from 'lucide-react';

interface SpeakingResultProps {
    data: {
        fluency: number;
        lexical: number;
        grammar: number;
        pronunciation: number;
        overall_band: number;
        transcript: string;
        feedback: string;
    }
}

export default function SpeakingResultPanel({ data }: SpeakingResultProps) {
    const scores = [
        { label: 'Fluency & Coherence', value: data.fluency, icon: TrendingUp, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { label: 'Lexical Resource', value: data.lexical, icon: Languages, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Grammar', value: data.grammar, icon: Target, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Pronunciation', value: data.pronunciation, icon: Volume2, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    ];

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8"
        >
            {/* Overall Band Score */}
            <div className="bento-card p-10 bg-white border-none flex flex-col md:flex-row items-center justify-between gap-8 text-black">
                <div>
                    <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-400 mb-2 italic">IELTS Speaking Report</h2>
                    <h3 className="text-4xl font-extrabold tracking-tighter">AI Diagnostic <span className="text-zinc-500">Analysis.</span></h3>
                </div>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-1">Overall Band</span>
                    <div className="text-8xl font-black tracking-tighter leading-none">
                        {(Number(data.overall_band) || 0).toFixed(1)}
                    </div>
                </div>
            </div>

            {/* Sub-scores */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {scores.map((s, i) => (
                    <div key={i} className="bento-card p-6 bg-zinc-900/50 border-white/5 space-y-4">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${s.bg}`}>
                                <s.icon className={`w-4 h-4 ${s.color}`} />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500">{s.label}</span>
                        </div>
                        <div className="text-3xl font-black">
                            {(Number(s.value) || 0).toFixed(1)}
                        </div>
                    </div>
                ))}
            </div>

            {/* Transcript & Feedback */}
            <div className="grid lg:grid-cols-2 gap-8">
                {/* Transcript */}
                <div className="bento-card p-8 bg-zinc-900/50 border-white/5 space-y-6">
                    <div className="flex items-center gap-3 text-zinc-400">
                        <MessageSquare className="w-5 h-5 text-blue-500" />
                        <h3 className="text-xs font-black uppercase tracking-widest">Transcript</h3>
                    </div>
                    <p className="text-zinc-300 leading-relaxed font-medium bg-zinc-950/50 p-6 rounded-2xl border border-white/5 italic">
                        "{data.transcript}"
                    </p>
                </div>

                {/* Feedback */}
                <div className="bento-card p-8 bg-zinc-900/50 border-white/5 space-y-6">
                    <div className="flex items-center gap-3 text-zinc-400">
                        <Search className="w-5 h-5 text-purple-500" />
                        <h3 className="text-xs font-black uppercase tracking-widest">AI Feedback</h3>
                    </div>
                    <p className="text-zinc-200 leading-relaxed font-semibold">
                        {data.feedback}
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
