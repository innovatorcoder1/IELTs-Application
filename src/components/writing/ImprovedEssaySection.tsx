import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';

interface ImprovedEssaySectionProps {
    improvedEssay: string;
}

const ImprovedEssaySection: React.FC<ImprovedEssaySectionProps> = ({ improvedEssay }) => {
    return (
        <div className="bento-card p-8 bg-zinc-900/50 border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-500" />
                AI Improved Essay
            </h3>
            <div className="p-6 bg-zinc-800/50 rounded-2xl border border-white/5 text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap relative overflow-hidden group">
                <div className="absolute top-4 right-4 p-2 bg-emerald-500/10 rounded-lg group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                </div>
                {improvedEssay}
            </div>
            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest text-center px-4">
                This version has been optimized for vocabulary variety and grammatical complexity.
            </p>
        </div>
    );
};

export default ImprovedEssaySection;
