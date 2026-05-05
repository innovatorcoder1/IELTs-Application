import { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
    ChevronLeft,
    Clock,
    RotateCcw,
    Send,
    Loader2,
    Mic
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Components
import AudioRecorder from '../components/speaking/AudioRecorder';
import SpeakingResultPanel from '../components/speaking/SpeakingResultPanel';
import { usePerformance } from '../lib/PerformanceContext';

interface Question {
    id: string;
    part: string;
    text: string;
    instructions: string;
}

const QUESTIONS: Question[] = [
    {
        id: "speaking_q1",
        part: "Part 1",
        text: "What do you usually do on weekends?",
        instructions: "Describe your typical weekend activities. Aim for 30-45 seconds of speech."
    },
    {
        id: "speaking_q2",
        part: "Part 2",
        text: "Describe a book you recently read.",
        instructions: "Talk about why you chose it, what it was about, and how you felt about it. Speak for 1-2 minutes."
    }
];

export default function SpeakingPractice() {
    const { addScore } = usePerformance();
    const { testType } = useParams<{ testType: string }>();
    const isGeneral = testType === 'general';
    const [flowStep, setFlowStep] = useState<'selection' | 'instructions' | 'testing'>('selection');
    const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTaskSelect = (question: Question) => {
        setSelectedQuestion(question);
        setFlowStep('instructions');
        setResult(null);
        setAudioBlob(null);
        setError(null);
    };

    const handleStartTest = () => {
        setFlowStep('testing');
    };

    const handleSubmit = async () => {
        if (!audioBlob || !selectedQuestion) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const formData = new FormData();
            formData.append("audio_file", audioBlob, "speaking_answer.webm");
            formData.append("user_id", "demo_user");
            formData.append("question_id", selectedQuestion.id);

            const response = await fetch("https://n8n.srv1196219.hstgr.cloud/webhook/ielts-speaking-submit", {
                method: "POST",
                body: formData
            });

            if (!response.ok) {
                throw new Error("Failed to evaluate speaking response. Please try again.");
            }

            const data = await response.json();
            const raw = Array.isArray(data) ? data[0] : data;

            const normalized = {
                ...raw,
                overall_band: isNaN(parseFloat(raw.overall_band)) ? 0 : parseFloat(raw.overall_band),
                fluency: parseFloat(raw.fluency ?? 0) || 0,
                lexical: parseFloat(raw.lexical ?? 0) || 0,
                grammar: parseFloat(raw.grammar ?? 0) || 0,
                pronunciation: parseFloat(raw.pronunciation ?? 0) || 0,
                feedback: raw.feedback ?? "No feedback provided.",
                transcript: raw.transcript ?? "No transcript available."
            };

            setResult(normalized);

            // Save to Performance Context
            addScore({
                module: 'speaking',
                score: normalized.overall_band,
                date: new Date().toISOString(),
                tag: selectedQuestion.part,
                title: selectedQuestion.text
            });
        } catch (err: any) {
            console.error("Evaluation Error:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleBack = () => {
        if (result) {
            setResult(null);
            setAudioBlob(null);
        } else if (flowStep === 'testing') {
            setFlowStep('instructions');
        } else if (flowStep === 'instructions') {
            setFlowStep('selection');
            setSelectedQuestion(null);
        } else {
            window.history.back();
        }
    };

    const resetTask = () => {
        setResult(null);
        setAudioBlob(null);
        setError(null);
        setFlowStep('selection');
        setSelectedQuestion(null);
    };

    // 1. Selection View
    if (flowStep === 'selection') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <header className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                        IELTS {isGeneral ? 'General' : 'Academic'} Speaking <span className="text-blue-500">Practice.</span>
                    </h1>
                    <p className="text-zinc-500 font-medium text-sm md:text-base">Select a speaking topic to begin your recording session.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {QUESTIONS.map((q) => (
                        <motion.div
                            key={q.id}
                            whileHover={{ y: -5 }}
                            className="bento-card p-8 group transition-all border border-white/5 bg-zinc-900/50 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-blue-500/10 transition-colors">
                                    <Mic className="w-5 h-5 text-zinc-500 group-hover:text-blue-500" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-blue-500/10 text-blue-500 px-2 py-1 rounded">
                                    {q.part}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-4 group-hover:text-blue-500 transition-colors leading-tight">"{q.text}"</h3>

                            <div className="mt-auto pt-6 border-t border-white/5">
                                <button
                                    onClick={() => handleTaskSelect(q)}
                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                                >
                                    Take Test
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        );
    }

    // 2. Instructions View
    if (flowStep === 'instructions' && selectedQuestion) {
        return (
            <div className="max-w-3xl mx-auto px-4 py-12">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 font-bold text-xs uppercase tracking-widest"
                >
                    <ChevronLeft className="w-4 h-4" />
                    Back to Selection
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bento-card p-6 sm:p-10 border border-white/5 bg-zinc-900/50 space-y-8"
                >
                    <div className="flex justify-between items-center">
                        <div className="space-y-1">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                {selectedQuestion.part} Instructions
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white">Speaking Analysis</h2>
                        </div>
                        <div className="p-4 bg-zinc-800 rounded-2xl border border-white/5">
                            <Mic className="w-6 h-6 text-blue-500" />
                        </div>
                    </div>

                    <div className="p-6 bg-blue-500/5 rounded-2xl border border-blue-500/10 space-y-4">
                        <h4 className="text-sm font-black text-blue-400 uppercase tracking-widest">Your Task</h4>
                        <p className="text-zinc-300 font-medium leading-relaxed italic">
                            "{selectedQuestion.instructions}"
                        </p>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Test Guidelines</h4>
                        <ul className="space-y-3 text-zinc-400 font-medium text-sm leading-relaxed list-disc pl-4">
                            <li>Ensure you are in a quiet environment.</li>
                            <li>Speak clearly and naturally at a steady pace.</li>
                            <li>Check your microphone levels before starting.</li>
                            <li>You can listen to your recording before submitting.</li>
                            <li>AI will analyze your fluency, grammar, and pronunciation.</li>
                        </ul>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <button
                            onClick={handleStartTest}
                            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-blue-500/20"
                        >
                            Start Speaking Test
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // 3. Testing View
    return (
        <div className="max-w-4xl mx-auto px-4 py-8 space-y-12 pb-24">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2.5 hover:bg-white/5 rounded-xl border border-white/5 transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">{selectedQuestion!.part}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest italic font-serif">Diagnostic Module</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white mb-1">
                            {isGeneral ? 'General' : 'Academic'} Speaking <span className="text-blue-500">Practice.</span>
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className="bg-zinc-900 border border-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                        <Clock className="w-4 h-4 text-zinc-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Evaluation Engine Live</span>
                    </div>
                </div>
            </header>

            {!result ? (
                <div className="space-y-12">
                    <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center gap-4 text-blue-400">
                        <div className="p-2 bg-blue-500/20 rounded-xl">
                            <RotateCcw className="w-4 h-4" />
                        </div>
                        <p className="text-xs font-bold leading-relaxed">
                            {selectedQuestion!.instructions}
                        </p>
                    </div>

                    <div className="bento-card p-6 md:p-12 bg-white/5 border border-white/5 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[100px] -mr-32 -mt-32" />
                        <div className="relative z-10 text-center space-y-6">
                            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">Speaking Prompt</h3>
                            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[1.1]">
                                "{selectedQuestion!.text}"
                            </h2>
                        </div>
                    </div>

                    <AudioRecorder
                        onRecordingComplete={setAudioBlob}
                        disabled={isSubmitting}
                    />

                    <AnimatePresence>
                        {audioBlob && !isSubmitting && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex flex-col items-center gap-6"
                            >
                                <button
                                    onClick={handleSubmit}
                                    className="group flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest transition-all shadow-2xl shadow-blue-500/30"
                                >
                                    <span>Submit Speaking Answer</span>
                                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </button>
                                <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                                    Click to analyze your response with AI
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {isSubmitting && (
                        <div className="flex flex-col items-center py-20 gap-8">
                            <div className="relative">
                                <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                                <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                            </div>
                            <div className="text-center space-y-2">
                                <h3 className="text-2xl font-black tracking-tight">AI is analyzing your voice signatures...</h3>
                                <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Processing lexical weight & phonetic precision</p>
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-center">
                            <p className="font-bold text-sm mb-4">{error}</p>
                            <button onClick={resetTask} className="text-xs font-black uppercase tracking-widest underline">
                                Try Again
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <SpeakingResultPanel data={result} />
            )}

            {result && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={resetTask}
                        className="btn-modern bg-zinc-900 border border-white/10 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-all text-sm font-black uppercase tracking-widest shadow-2xl"
                    >
                        <RotateCcw className="w-4 h-4" />
                        Back to Selection
                    </button>
                </div>
            )}
        </div>
    );
}
