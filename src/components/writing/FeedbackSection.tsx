import React from 'react';
import { Lightbulb, AlertCircle } from 'lucide-react';

interface FeedbackSectionProps {
    feedback: string;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback }) => {
    return (
        <div className="bento-card p-8 bg-zinc-900/50 border border-white/5 space-y-6">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-emerald-500" />
                AI Feedback
            </h3>
            <div className="p-6 bg-zinc-800/50 rounded-2xl border border-white/5 text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap">
                {feedback}
            </div>
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                <h4 className="font-bold text-emerald-500 flex items-center gap-2 mb-4 uppercase text-xs tracking-widest">
                    <Lightbulb className="w-4 h-4" />
                    Strategic Insight
                </h4>
                <p className="text-sm text-zinc-400 font-medium leading-relaxed">
                    Review the feedback above to identify patterns in your writing and areas for improvement in your next essay.
                </p>
            </div>
        </div>
    );
};

export default FeedbackSection;
