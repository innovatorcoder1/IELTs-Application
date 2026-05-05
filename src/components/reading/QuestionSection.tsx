import { motion } from 'framer-motion';
import { HelpCircle } from 'lucide-react';

interface Question {
    id: number;
    type: 'mcq' | 'text' | 'boolean';
    text: string;
    options?: string[];
}

interface QuestionSectionProps {
    questions: Question[];
    answers: Record<number, string>;
    onAnswerChange: (id: number, value: string) => void;
}

export default function QuestionSection({ questions, answers, onAnswerChange }: QuestionSectionProps) {
    return (
        <div className="flex flex-col h-full overflow-hidden">
            <div className="flex items-center gap-3 p-6 border-b border-white/5 bg-white/5">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                    <HelpCircle className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                    <h3 className="text-sm font-black uppercase tracking-widest text-slate-400">Practice Phase</h3>
                    <p className="text-xs font-bold text-slate-500 uppercase">Answer the questions based on the text</p>
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
                {questions.map((q, idx) => (
                    <motion.div
                        key={q.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        id={`question-${q.id}`}
                        className="p-6 rounded-2xl bg-white/5 border border-white/5 space-y-4 hover:border-white/10 transition-colors"
                    >
                        <div className="flex gap-5">
                            <span className="flex-shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-indigo-400 text-sm font-black flex items-center justify-center shadow-lg shadow-indigo-500/5">
                                {q.id}
                            </span>
                            <p className="text-[15px] font-bold text-slate-200 leading-relaxed pt-2">
                                {q.text}
                            </p>
                        </div>

                        {(q.type === 'mcq' || q.type === 'boolean') && (
                            <div className="grid gap-2 pl-12">
                                {(q.options || ["TRUE", "FALSE", "NOT GIVEN"]).map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => onAnswerChange(q.id, opt)}
                                        className={`group relative text-left p-4 rounded-xl border transition-all text-sm font-bold overflow-hidden ${answers[q.id] === opt
                                            ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/20'
                                            : 'bg-white/5 border-white/5 text-slate-400 hover:border-white/10 hover:bg-white/10'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between relative z-10">
                                            <span>{opt}</span>
                                            {answers[q.id] === opt && (
                                                <div className="w-2 h-2 rounded-full bg-white animate-pulse" />
                                            )}
                                        </div>
                                        {answers[q.id] === opt && (
                                            <motion.div
                                                layoutId={`active-bg-${q.id}`}
                                                className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-indigo-500"
                                            />
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}

                        {q.type === 'text' && (
                            <div className="pl-12">
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={answers[q.id] || ''}
                                        onChange={(e) => onAnswerChange(q.id, e.target.value)}
                                        placeholder="Type your answer here..."
                                        className="w-full bg-white/5 border border-white/5 rounded-xl px-4 py-5 text-base font-bold focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all text-slate-50 placeholder:text-slate-600 placeholder:italic"
                                    />
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none opacity-0 group-focus-within:opacity-100 transition-opacity">
                                        <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Editing</span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
