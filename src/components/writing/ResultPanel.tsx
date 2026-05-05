import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import BandScoreCard from './BandScoreCard';
import FeedbackSection from './FeedbackSection';
import ImprovedEssaySection from './ImprovedEssaySection';
import { ArrowRight } from 'lucide-react';

interface ResultPanelProps {
    data: {
        band_score: number;
        task_response: number;
        coherence: number;
        lexical: number;
        grammar: number;
        feedback: string;
        improved_essay: string;
    };
    onNextTask?: () => void;
}

const ResultPanel: React.FC<ResultPanelProps> = ({ data, onNextTask }) => {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }, [data]);

    return (
        <motion.div
            ref={scrollRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col gap-8 w-full"
        >
            <BandScoreCard
                overall={data.band_score}
                taskResponse={data.task_response}
                coherence={data.coherence}
                lexical={data.lexical}
                grammar={data.grammar}
            />

            <div className="grid lg:grid-cols-2 gap-8">
                <FeedbackSection feedback={data.feedback} />
                <ImprovedEssaySection improvedEssay={data.improved_essay} />
            </div>

            {onNextTask && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="flex justify-center pt-8 border-t border-white/5"
                >
                    <button
                        onClick={onNextTask}
                        className="group flex items-center gap-3 bg-emerald-500 hover:bg-emerald-600 text-black px-8 py-4 rounded-2xl font-black uppercase tracking-widest transition-all shadow-xl shadow-emerald-500/20"
                    >
                        <span>Proceed to Task 2</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                </motion.div>
            )}
        </motion.div>
    );
};

export default ResultPanel;
