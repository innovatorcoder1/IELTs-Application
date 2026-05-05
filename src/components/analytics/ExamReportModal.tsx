import {
    X,
    Share2,
    CheckCircle2,
    AlertCircle,
    TrendingUp,
    Award,
    FileText,
    Printer
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ExamReportModalProps {
    isOpen: boolean;
    onClose: () => void;
    data: any;
}

export default function ExamReportModal({ isOpen, onClose, data }: ExamReportModalProps) {
    if (!data) return null;

    const handlePrint = () => {
        window.print();
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'IELTS Exam Report',
                    text: `My IELTS Predicted Band Score is ${data.band_score}!`,
                    url: window.location.href,
                });
            } catch (err) {
                console.error('Error sharing:', err);
            }
        } else {
            // Fallback: Copy to clipboard
            navigator.clipboard.writeText(`My IELTS Predicted Band Score is ${data.band_score}! View report at: ${window.location.href}`);
            alert('Report summary copied to clipboard!');
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 lg:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-zinc-950/90 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-[#0C121D] border border-white/5 rounded-[32px] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]"
                    >
                        {/* Header */}
                        <div className="sticky top-0 z-10 px-8 py-6 bg-zinc-900/50 backdrop-blur-md border-b border-white/5 flex items-center justify-between no-print">
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-primary/10 rounded-2xl text-primary">
                                    <FileText className="w-5 h-5" />
                                </div>
                                <div>
                                    <h2 className="text-xl font-black tracking-tight text-white uppercase italic">Complete Performance Matrix</h2>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Report ID: {data.report_id || 'EXAM-2024-001'}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={handlePrint}
                                    className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all border border-white/5"
                                    title="Download PDF"
                                >
                                    <Printer className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={handleShare}
                                    className="p-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white rounded-xl transition-all border border-white/5"
                                    title="Share Report"
                                >
                                    <Share2 className="w-5 h-5" />
                                </button>
                                <div className="w-px h-6 bg-white/10 mx-1" />
                                <button
                                    onClick={onClose}
                                    className="p-3 bg-white/5 hover:bg-red-500/20 text-zinc-400 hover:text-red-500 rounded-xl transition-all border border-white/5"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Scrollable Body */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 print-content">
                            <style>{`
                                @media print {
                                    .no-print { display: none !important; }
                                    .print-content { overflow: visible !important; position: static !important; }
                                    body { background: white !important; color: black !important; }
                                    .bg-zinc-900 { background: white !important; }
                                    .text-white { color: black !important; }
                                    .text-zinc-500, .text-zinc-400 { color: #666 !important; }
                                    .border-white\\/10, .border-white\\/5 { border-color: #eee !important; }
                                }
                            `}</style>

                            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                                {/* Left Column: Overall Summary */}
                                <div className="md:col-span-4 space-y-6">
                                    <div className="relative p-10 bg-gradient-to-br from-primary/20 to-purple-600/20 border border-primary/20 rounded-[28px] text-center overflow-hidden">
                                        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05),transparent)] pointer-events-none" />
                                        <div className="relative z-10">
                                            <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-4">Predicted Band</p>
                                            <div className="text-8xl font-black tracking-tighter text-white mb-4">
                                                {data.band_score || '7.5'}
                                            </div>
                                            <div className="inline-flex items-center gap-2 px-4 py-1 bg-white/10 rounded-full border border-white/10">
                                                <Award className="w-3.5 h-3.5 text-yellow-500" />
                                                <span className="text-[10px] font-black text-white uppercase tracking-widest">
                                                    {data.competency_level || 'ADVANCED'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 bg-zinc-950/30 border border-white/5 rounded-2xl space-y-4">
                                        <h3 className="text-xs font-black text-zinc-500 uppercase tracking-widest flex items-center gap-2">
                                            <TrendingUp className="w-3.5 h-3.5" />
                                            Module Performance
                                        </h3>
                                        <div className="space-y-4">
                                            {[
                                                { label: 'Listening', score: data.listening_score || '8.0' },
                                                { label: 'Reading', score: data.reading_score || '7.5' },
                                                { label: 'Writing', score: data.writing_score || '6.5' },
                                                { label: 'Speaking', score: data.speaking_score || '8.0' },
                                            ].map((m, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <span className="text-xs font-bold text-zinc-400">{m.label}</span>
                                                    <span className="text-sm font-black text-white">{m.score}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Right Column: Detailed Analysis */}
                                <div className="md:col-span-8 space-y-8">
                                    <section className="space-y-4">
                                        <h3 className="text-sm font-black text-white uppercase tracking-[0.2em] flex items-center gap-3">
                                            <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                                            Executive Insights
                                        </h3>
                                        <p className="text-zinc-400 leading-relaxed font-medium">
                                            {data.insights || "Based on your recent practice sessions across all modules, you demonstrate a strong command of complex grammatical structures and high lexical variety. Your primary weakness remains time management in the Reading module and task response coherence in Writing Task 2."}
                                        </p>
                                    </section>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <section className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl space-y-4">
                                            <div className="flex items-center gap-3 text-emerald-400">
                                                <CheckCircle2 className="w-5 h-5" />
                                                <h4 className="text-xs font-black uppercase tracking-widest text-white">Dominant Strengths</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {(data.strengths || ['Natural phonetic flow', 'Wide vocabulary range', 'Excellent contextual understanding']).map((s: string, i: number) => (
                                                    <li key={i} className="text-[11px] text-zinc-400 flex gap-2">
                                                        <span className="text-emerald-500">•</span>
                                                        {s}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>

                                        <section className="p-6 bg-amber-500/5 border border-amber-500/10 rounded-2xl space-y-4">
                                            <div className="flex items-center gap-3 text-amber-400">
                                                <AlertCircle className="w-5 h-5" />
                                                <h4 className="text-xs font-black uppercase tracking-widest text-white">Focus Areas</h4>
                                            </div>
                                            <ul className="space-y-2">
                                                {(data.weaknesses || ['Reading pace optimization', 'Complex sentence linking', 'Note-taking speed']).map((w: string, i: number) => (
                                                    <li key={i} className="text-[11px] text-zinc-400 flex gap-2">
                                                        <span className="text-amber-500">•</span>
                                                        {w}
                                                    </li>
                                                ))}
                                            </ul>
                                        </section>
                                    </div>

                                    <section className="p-8 bg-zinc-950 border border-white/5 rounded-3xl relative overflow-hidden group">
                                        <div className="absolute top-0 right-0 p-4">
                                            <SparkleIcon className="w-12 h-12 text-zinc-800 rotate-12" />
                                        </div>
                                        <h3 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-4">The AI RoadMap</h3>
                                        <div className="space-y-6">
                                            {(data.roadmap || [
                                                { title: 'Week 1: Structural Integrity', desc: 'Focus on linking words and logical flow in writing.' },
                                                { title: 'Week 2: Advanced Scanning', desc: 'Implement the three-pass strategy for Reading passages.' }
                                            ]).map((step: any, i: number) => (
                                                <div key={i} className="relative pl-6 border-l-2 border-white/5 hover:border-primary/50 transition-all">
                                                    <div className="absolute -left-[5px] top-0 w-2 h-2 rounded-full bg-zinc-800" />
                                                    <h5 className="text-xs font-black text-white uppercase tracking-wider mb-1">{step.title}</h5>
                                                    <p className="text-[10px] text-zinc-500 font-medium">{step.desc}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </section>
                                </div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="px-8 py-6 bg-zinc-950/50 border-t border-white/5 text-center no-print">
                            <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em]">MARKAZ AI • GENETIC INTELLIGENCE MATRIX</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}

function SparkleIcon({ className }: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className={className}
        >
            <path d="M12,2L13.5,8.5L20,10L13.5,11.5L12,18L10.5,11.5L4,10L10.5,8.5L12,2Z" />
        </svg>
    );
}
