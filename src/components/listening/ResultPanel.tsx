import React from 'react';
import { motion } from 'framer-motion';
import ScoreCard from './ScoreCard';
import FeedbackSection from './FeedbackSection';
import QuestionItem from './QuestionItem';

interface QuestionResult {
    question: number;
    student_answer: string;
    correct_answer: string;
    correct: boolean;
}

interface ResultPanelProps {
    data: {
        score: number;
        band_score: number | string;
        feedback: string;
        results: QuestionResult[];
    };
    questions: string[];
}

const ResultPanel: React.FC<ResultPanelProps> = ({ data, questions }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            {/* Score + Feedback */}
            <div className="grid lg:grid-cols-2 gap-8">
                <ScoreCard
                    score={data.score}
                    total={40}
                    bandScore={data.band_score}
                />
                <FeedbackSection feedback={data.feedback} />
            </div>

            {/* Per-question review */}
            <div className="bento-card p-8 bg-zinc-900/50 border border-white/5 space-y-6">
                <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">Question Review</h3>
                <div className="grid md:grid-cols-2 gap-4">
                    {data.results.map((r, i) => (
                        <QuestionItem
                            key={i}
                            index={r.question - 1}
                            text={questions[r.question - 1] ?? `Question ${r.question}`}
                            value={r.student_answer}
                            onChange={() => { }}
                            disabled
                            result={r}
                        />
                    ))}
                </div>
            </div>
        </motion.div>
    );
};

export default ResultPanel;
