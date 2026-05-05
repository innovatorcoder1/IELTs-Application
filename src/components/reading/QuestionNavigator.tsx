import { cn } from '../../lib/utils';

interface QuestionNavigatorProps {
    totalQuestions: number;
    answers: Record<number, string>;
    onNavigate: (id: number) => void;
}

export default function QuestionNavigator({ totalQuestions, answers, onNavigate }: QuestionNavigatorProps) {
    const answeredCount = Object.keys(answers).length;

    return (
        <div className="rounded-2xl border overflow-hidden" style={{ background: 'rgba(255,255,255,0.03)', borderColor: 'rgba(255,255,255,0.08)' }}>
            {/* Header */}
            <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-0.5">Matrix Navigator</p>
                    <p className="text-xs font-bold text-slate-300">{answeredCount} / {totalQuestions} answered</p>
                </div>
                <div className="w-10 h-10 flex items-center justify-center rounded-xl"
                    style={{ background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)' }}>
                    <span className="text-indigo-400 font-black text-sm">{Math.round((answeredCount / totalQuestions) * 100)}%</span>
                </div>
            </div>

            {/* Grid */}
            <div className="p-3">
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-1.5">
                    {Array.from({ length: totalQuestions }, (_, i) => {
                        const qId = i + 1;
                        const isAnswered = !!answers[qId];

                        return (
                            <button
                                key={qId}
                                onClick={() => onNavigate(qId)}
                                title={`Question ${qId}${isAnswered ? ' (answered)' : ' (unanswered)'}`}
                                className={cn(
                                    "h-8 w-full flex items-center justify-center text-[10px] font-black rounded-lg transition-all border",
                                    isAnswered
                                        ? "text-white border-indigo-500 shadow-sm shadow-indigo-500/30"
                                        : "text-slate-400 hover:text-white hover:border-slate-500 hover:bg-white/5"
                                )}
                                style={isAnswered
                                    ? { background: 'linear-gradient(135deg,rgba(99,102,241,0.8),rgba(139,92,246,0.7))', borderColor: 'rgba(99,102,241,0.6)' }
                                    : { background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(255,255,255,0.1)' }
                                }
                            >
                                {qId}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="px-4 py-2.5 border-t flex items-center gap-4" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded" style={{ background: 'linear-gradient(135deg,rgba(99,102,241,0.8),rgba(139,92,246,0.7))' }} />
                    <span className="text-[10px] font-bold text-slate-500">Answered</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <div className="w-3 h-3 rounded" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }} />
                    <span className="text-[10px] font-bold text-slate-500">Unanswered</span>
                </div>
            </div>
        </div>
    );
}

