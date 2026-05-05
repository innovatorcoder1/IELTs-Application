import React from 'react';
import { MessageSquare } from 'lucide-react';

interface FeedbackSectionProps {
    feedback: string;
}

const FeedbackSection: React.FC<FeedbackSectionProps> = ({ feedback }) => {
    return (
        <div className="bento-card p-8 bg-zinc-900/50 border border-white/5 space-y-5">
            <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400" />
                AI Feedback
            </h3>
            <div className="p-6 bg-zinc-800/50 rounded-2xl border border-white/5 text-zinc-300 font-medium leading-relaxed whitespace-pre-wrap">
                {feedback}
            </div>
        </div>
    );
};

export default FeedbackSection;
