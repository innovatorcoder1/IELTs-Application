import React from 'react';
import { Headphones, Award } from 'lucide-react';

interface ScoreCardProps {
    score: number;
    total: number;
    bandScore: number | string;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ score, total, bandScore }) => {
    const pct = Math.round((score / total) * 100);

    return (
        <div className="bento-card p-8 bg-zinc-900/50 border border-white/5 space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20">
                    <Headphones className="w-7 h-7 text-cyan-400" />
                </div>
                <div>
                    <h3 className="text-lg font-black tracking-tight text-white uppercase">Listening Score</h3>
                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">AI Evaluation Result</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {/* Raw score */}
                <div className="p-6 bg-zinc-800/50 rounded-2xl border border-white/5 text-center">
                    <span className="text-5xl font-black text-white leading-none">{score}</span>
                    <span className="text-zinc-500 text-xl font-bold"> / {total}</span>
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mt-2">Correct Answers</p>
                </div>

                {/* Band score */}
                <div className="p-6 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-center">
                    <div className="flex items-center justify-center gap-2 mb-1">
                        <Award className="w-5 h-5 text-cyan-400" />
                    </div>
                    <span className="text-5xl font-black text-cyan-400 leading-none">{bandScore}</span>
                    <p className="text-[10px] font-black text-cyan-500/70 uppercase tracking-widest mt-2">Band Score</p>
                </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                    <span>Accuracy</span>
                    <span className="text-cyan-400">{pct}%</span>
                </div>
                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)] transition-all duration-1000"
                        style={{ width: `${pct}%` }}
                    />
                </div>
            </div>
        </div>
    );
};

export default ScoreCard;
