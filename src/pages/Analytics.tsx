import { useState } from 'react';
import {
    LineChart as LineChartIcon,
    Target,
    Clock,
    Sparkles,
    Calendar,
    Layers,
    Zap,
    ArrowUpRight,
    Loader2
} from 'lucide-react';
import { motion } from 'framer-motion';
import ExamReportModal from '../components/analytics/ExamReportModal';
import { usePerformance } from '../lib/PerformanceContext';

export default function Analytics() {
    const { data, getAverageScore } = usePerformance();
    const [isGenerating, setIsGenerating] = useState(false);
    const [reportData, setReportData] = useState<any>(null);
    const [showReport, setShowReport] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const overallBand = getAverageScore();

    const handleGenerateReport = async () => {
        setIsGenerating(true);
        setError(null);

        try {
            const response = await fetch("https://n8n.srv1196219.hstgr.cloud/webhook/ielts-exam-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: "demo_user",
                    request_date: new Date().toISOString(),
                    current_stats: {
                        band_score: overallBand,
                        listening: getAverageScore('listening'),
                        reading: getAverageScore('reading'),
                        writing: getAverageScore('writing'),
                        speaking: getAverageScore('speaking')
                    }
                })
            });

            if (!response.ok) throw new Error("Failed to generate report");

            const data = await response.json();
            const raw = Array.isArray(data) ? data[0] : data;

            setReportData(raw);
            setShowReport(true);
        } catch (err: any) {
            console.error("Report Generation Error:", err);
            setError("Unable to generate your neural matrix report. Please try again.");
            // Fallback for demo if needed
            /*
            setReportData({
                band_score: "7.5",
                competency_level: "ADVANCED",
                insights: "High linguistic control observed. Strategic response needs optimization.",
                strengths: ["Phonetic Accuracy", "Lexical Range"],
                weaknesses: ["Reading Velocity", "Task Coherence"],
                roadmap: [{title: "Phase 1", desc: "Lexical expansion"}]
            });
            setShowReport(true);
            */
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-12 pb-20">
            {/* Report Modal */}
            <ExamReportModal
                isOpen={showReport}
                onClose={() => setShowReport(false)}
                data={reportData}
            />

            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.3em]">Neural Matrix</span>
                    </div>
                    <h1 className="text-5xl font-black tracking-tighter mb-2 italic text-slate-50">Matrix, <span className="text-slate-500">Config.</span></h1>
                    <p className="text-slate-400 font-medium tracking-tight">Optimize your neural training environment and personal profile.</p>
                </div>
                <div className="flex gap-3">
                    <button className="btn-modern btn-outline-modern px-5 py-2 text-xs font-bold">
                        <Calendar className="w-4 h-4" />
                        Q3 PERFORMANCE
                    </button>
                    <button
                        onClick={handleGenerateReport}
                        disabled={isGenerating}
                        className="btn-modern btn-primary-modern px-5 py-2 text-xs font-bold shadow-[0_0_20px_rgba(99,102,241,0.2)] flex items-center gap-2"
                        style={{ background: 'linear-gradient(135deg, #6366F1, #8B5CF6)' }}
                    >
                        {isGenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                        {isGenerating ? 'ANALYZING MATRIX...' : 'GENERATE FULL EXAM REPORT'}
                    </button>
                </div>
            </div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold text-center"
                >
                    {error}
                </motion.div>
            )}

            <div className="grid lg:grid-cols-4 gap-6">
                {[
                    { label: 'Core Band score', value: overallBand.toString(), trend: '↑ 0.5', icon: Target, color: 'primary' },
                    { label: 'Voice Fluency', value: (getAverageScore('speaking') || 0).toString(), trend: '↑ 1.2', icon: Zap, color: 'purple-500' },
                    { label: 'Lexical Density', value: (getAverageScore('writing') || 0).toString(), trend: '↓ 0.2', icon: Layers, color: 'cyan-400' },
                    { label: 'Session Velocity', value: '54m', trend: '↑ 12m', icon: Clock, color: 'zinc-400' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="bento-card p-10 group bg-zinc-900/40"
                    >
                        <div className="relative z-10 flex flex-col justify-between h-full">
                            <div className={`w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center mb-10 group-hover:bg-white/10 transition-colors`}>
                                <stat.icon className={`w-4 h-4 text-${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-zinc-600 uppercase tracking-widest mb-2">{stat.label}</p>
                                <div className="flex items-baseline gap-3">
                                    <span className="text-5xl font-black tracking-tighter">{stat.value}</span>
                                    <span className={`text-[10px] font-black tracking-tighter ${stat.trend.startsWith('↑') ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {stat.trend}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="grid lg:grid-cols-12 gap-8">
                {/* Evolution Matrix */}
                <div className="lg:col-span-8 bento-card p-12 bg-zinc-900 overflow-hidden relative">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-purple-600" />
                    <div className="flex items-center justify-between mb-16 relative z-10">
                        <h3 className="text-2xl font-black tracking-tight italic flex items-center gap-3">
                            <LineChartIcon className="w-5 h-5 text-zinc-500" />
                            Band Score Evolution
                        </h3>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase">
                                <div className="w-2 h-2 rounded-full bg-white/10" />
                                Regional Avg
                            </div>
                            <div className="flex items-center gap-2 text-[10px] font-black text-zinc-600 uppercase">
                                <div className="w-2 h-2 rounded-full bg-primary" />
                                Unified Progress
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] flex items-end gap-2 relative z-10">
                        {data.scores.slice(0, 9).reverse().map((s, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center gap-6">
                                <motion.div
                                    initial={{ height: 0 }}
                                    animate={{ height: `${(s.score / 9) * 100}%` }}
                                    transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                                    className="w-full max-w-[48px] bg-white group relative rounded-t-lg transition-all hover:bg-primary"
                                >
                                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md text-[10px] font-black opacity-0 group-hover:opacity-100 transition-all bg-white text-black translate-y-2 group-hover:translate-y-0">
                                        {s.score}
                                    </div>
                                </motion.div>
                                <span className="text-[10px] font-black text-zinc-700 uppercase tracking-widest">{s.module.substring(0, 1)}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Skill Matrix Breakdown */}
                <div className="lg:col-span-4 bento-card p-12 space-y-12 bg-zinc-900/50">
                    <h4 className="text-sm font-black text-zinc-500 uppercase tracking-[0.3em]">Competency mapping</h4>
                    <div className="space-y-10">
                        {[
                            { label: 'Linguistic Control', score: 85, color: 'primary' },
                            { label: 'Phonetic Accuracy', score: 92, color: 'purple-500' },
                            { label: 'Strategic Response', score: 65, color: 'cyan-400' },
                            { label: 'Listening precision', score: 78, color: 'zinc-400' },
                        ].map((skill, i) => (
                            <div key={i} className="space-y-4">
                                <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                    <span>{skill.label}</span>
                                    <span className="text-white">{skill.score}%</span>
                                </div>
                                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${skill.score}%` }}
                                        transition={{ duration: 2, delay: 0.5 }}
                                        className={`h-full bg-${skill.color} shadow-[0_0_15px_rgba(255,255,255,0.1)]`}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="pt-10 border-t border-white/5">
                        <div className="p-6 rounded-2xl bg-white/5 flex items-center justify-between border border-white/5 hover:border-primary/30 transition-all cursor-pointer group">
                            <div className="flex gap-4 items-center">
                                <div className="w-10 h-10 bg-zinc-950 rounded-xl flex items-center justify-center border border-white/5 text-primary">
                                    <Sparkles className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="text-sm font-bold text-zinc-300">AI Priority Vector</h4>
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest mt-1">Focus: Lexical Resource</p>
                                </div>
                            </div>
                            <ArrowUpRight className="w-5 h-5 text-zinc-700 group-hover:text-primary transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
