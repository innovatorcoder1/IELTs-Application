import { motion } from 'framer-motion';
import { Target, CheckCircle2, XCircle, RotateCcw, Award, BarChart3 } from 'lucide-react';

interface ReadingResultProps {
    data: {
        score: number;
        scaled_score: number;
        band_score: number;
        total?: number; // Optional if backend doesn't send it, we know it's 40
        feedback: string;
        results: Array<{
            question_number: number;
            student_answer: string;
            correct_answer: string;
            correct: boolean;
        }>;
    };
    onReset: () => void;
}

export default function ReadingResultPanel({ data, onReset }: ReadingResultProps) {
    const totalQuestions = data.total || 40;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full space-y-8 max-w-5xl mx-auto pb-20"
        >
            {/* Main Score Overview */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-white/5 p-8 lg:p-12 shadow-2xl">
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-500/10 to-transparent pointer-events-none" />
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-blue-500/20 blur-[100px] pointer-events-none" />

                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
                    <div className="space-y-6 text-center lg:text-left">
                        <div>
                            <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                                <div className="px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-500 uppercase tracking-[0.2em]">Diagnostic Result</div>
                            </div>
                            <h3 className="text-4xl lg:text-5xl font-black tracking-tighter text-white leading-tight">
                                Performance <span className="text-blue-500">Analysis.</span>
                            </h3>
                        </div>

                        <div className="p-6 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-md max-w-xl">
                            <p className="text-zinc-400 font-medium leading-relaxed italic">
                                "{data.feedback}"
                            </p>
                        </div>
                    </div>

                    <div className="flex gap-8 lg:gap-16">
                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4">
                                <Award className="w-6 h-6 text-blue-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Band Score</span>
                            <div className="text-6xl lg:text-7xl font-black tracking-tighter text-white tabular-nums">{data.band_score}</div>
                        </div>

                        <div className="w-px h-24 bg-white/10 hidden lg:block" />

                        <div className="flex flex-col items-center">
                            <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 mb-4">
                                <BarChart3 className="w-6 h-6 text-emerald-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Raw Score</span>
                            <div className="text-6xl lg:text-7xl font-black tracking-tighter text-zinc-400 tabular-nums">
                                {data.score}<span className="text-2xl text-zinc-700 font-black">/{totalQuestions}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Detailed Question Review */}
            <div className="space-y-6">
                <div className="flex items-center justify-between px-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                            <Target className="w-5 h-5 text-blue-500" />
                        </div>
                        <h3 className="text-xs font-black uppercase tracking-widest text-zinc-500 italic">Detailed Question Breakdown</h3>
                    </div>
                    <div className="flex gap-4 text-[10px] font-black uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500" />
                            <span className="text-emerald-500/70">Correct</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="text-red-500/70">Incorrect</span>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {data.results.map((item, i) => (
                        <div
                            key={i}
                            className={`p-6 rounded-2xl border transition-all hover:scale-[1.02] duration-300 flex items-center justify-between gap-6 ${item.correct
                                    ? 'bg-emerald-500/5 border-emerald-500/10'
                                    : 'bg-red-500/5 border-red-500/10'
                                }`}
                        >
                            <div className="flex gap-4 items-center">
                                <span className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-lg ${item.correct
                                        ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 shadow-emerald-500/10'
                                        : 'bg-red-500/10 text-red-500 border border-red-500/20 shadow-red-500/10'
                                    }`}>
                                    {item.question_number}
                                </span>
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${item.correct ? 'text-emerald-500/50' : 'text-red-500/50'}`}>
                                            Your Answer:
                                        </span>
                                        <span className={`text-sm font-bold ${item.correct ? 'text-emerald-500' : 'text-red-500'}`}>
                                            {item.student_answer || '(Empty)'}
                                        </span>
                                    </div>
                                    {!item.correct && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/50">
                                                Correct Answer:
                                            </span>
                                            <span className="text-sm font-bold text-emerald-500">
                                                {item.correct_answer}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className={`p-2 rounded-full ${item.correct ? 'bg-emerald-500/10' : 'bg-red-500/10'}`}>
                                {item.correct ? (
                                    <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                                ) : (
                                    <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-center pt-8">
                <button
                    onClick={onReset}
                    className="group bg-zinc-900 hover:bg-zinc-800 border border-white/10 px-12 py-5 rounded-2xl flex items-center gap-3 transition-all text-sm font-black uppercase tracking-widest shadow-2xl hover:shadow-blue-500/10 hover:border-blue-500/30"
                >
                    <RotateCcw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                    Retake Practice Test
                </button>
            </div>
        </motion.div>
    );
}
