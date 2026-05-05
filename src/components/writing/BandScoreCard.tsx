import React from 'react';
import { Award, Target, MessageSquare, BookOpen, PenTool } from 'lucide-react';

interface Subscore {
    label: string;
    score: number;
    icon: React.ReactNode;
}

interface BandScoreCardProps {
    overall: number;
    taskResponse: number;
    coherence: number;
    lexical: number;
    grammar: number;
}

const BandScoreCard: React.FC<BandScoreCardProps> = ({ overall, taskResponse, coherence, lexical, grammar }) => {
    const subscores: Subscore[] = [
        { label: 'Task Response', score: taskResponse, icon: <Target className="w-5 h-5 text-emerald-500" /> },
        { label: 'Coherence & Cohesion', score: coherence, icon: <MessageSquare className="w-5 h-5 text-blue-500" /> },
        { label: 'Lexical Resource', score: lexical, icon: <BookOpen className="w-5 h-5 text-purple-500" /> },
        { label: 'Grammar Accuracy', score: grammar, icon: <PenTool className="w-5 h-5 text-amber-500" /> },
    ];

    return (
        <div className="bento-card p-8 bg-zinc-900/50 border border-white/5 space-y-8">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                        <Award className="w-8 h-8 text-emerald-500" />
                    </div>
                    <div>
                        <h3 className="text-xl font-black tracking-tight text-white uppercase">Overall Analysis</h3>
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Neural Evaluation Engine v2.0</p>
                    </div>
                </div>
                <div className="text-right">
                    <span className="text-7xl font-black text-white leading-none tracking-tighter">{overall.toFixed(1)}</span>
                    <div className="flex items-center gap-2 mt-2 justify-end">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">STABLE BAND</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {subscores.map((sub, idx) => (
                    <div key={idx} className="p-6 bg-zinc-900/30 rounded-2xl border border-white/5 flex flex-col items-center gap-4 hover:border-white/10 transition-all group">
                        <div className="p-3 bg-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
                            {sub.icon}
                        </div>
                        <div className="text-center">
                            <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest block mb-1">{sub.label}</span>
                            <span className="text-2xl font-black text-white">{sub.score}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BandScoreCard;
