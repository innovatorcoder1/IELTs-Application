import React from 'react';
import { CheckCircle2, XCircle } from 'lucide-react';

interface QuestionResult {
    question: number;
    student_answer: string;
    correct_answer: string;
    correct: boolean;
}

interface QuestionItemProps {
    index: number;
    text: string;
    value: string;
    onChange: (index: number, value: string) => void;
    disabled?: boolean;
    result?: QuestionResult;
}

const QuestionItem: React.FC<QuestionItemProps> = ({ index, text, value, onChange, disabled, result }) => {
    const qNum = index + 1;

    if (result !== undefined) {
        // Result view
        return (
            <div className={`flex items-start gap-4 p-4 rounded-xl border transition-all ${result.correct
                    ? 'bg-emerald-500/5 border-emerald-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                }`}>
                <div className="shrink-0 mt-0.5">
                    {result.correct
                        ? <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                        : <XCircle className="w-5 h-5 text-red-400" />
                    }
                </div>
                <div className="flex-1 min-w-0">
                    <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Q{qNum}</p>
                    <p className="text-sm text-zinc-300 font-medium mb-2 leading-relaxed">{text}</p>
                    <div className="flex flex-wrap gap-3 text-xs font-bold">
                        <span className={`px-2 py-1 rounded-lg ${result.correct ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'}`}>
                            Your answer: {result.student_answer || '(blank)'}
                        </span>
                        {!result.correct && (
                            <span className="px-2 py-1 bg-emerald-500/10 text-emerald-400 rounded-lg">
                                Correct: {result.correct_answer}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    // Input view
    return (
        <div className="space-y-2">
            <label className="flex items-baseline gap-2">
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest shrink-0">Q{qNum}.</span>
                <span className="text-sm font-medium text-zinc-300 leading-relaxed">{text}</span>
            </label>
            <input
                type="text"
                value={value}
                onChange={e => onChange(index, e.target.value)}
                disabled={disabled}
                placeholder="Type your answer..."
                className="w-full px-4 py-3 bg-zinc-900 border border-white/5 rounded-xl text-zinc-200 text-sm font-medium focus:outline-none focus:border-cyan-500/40 transition-all placeholder:text-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed"
            />
        </div>
    );
};

export default QuestionItem;
