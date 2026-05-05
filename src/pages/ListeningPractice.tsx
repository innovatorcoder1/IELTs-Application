import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Clock, Headphones, Send, Loader2, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AudioPlayer from '../components/listening/AudioPlayer';
import QuestionItem from '../components/listening/QuestionItem';
import ResultPanel from '../components/listening/ResultPanel';

// ─── Static test data ──────────────────────────────────────────────────────────
const AUDIO_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"; // replace with real IELTS audio

const SECTIONS = [
    {
        id: 1,
        label: "Section 1",
        description: "Social context – conversation between two people",
        questions: [
            "What is the woman's name?",
            "What is her phone number?",
            "What is her email address?",
            "What date does she want to book?",
            "How many people will attend the event?",
            "What type of room does she require?",
            "What is the price per person?",
            "What time does the event start?",
            "What is the parking arrangement?",
            "What is the name of the contact person?",
        ],
    },
    {
        id: 2,
        label: "Section 2",
        description: "Information monologue – public announcement",
        questions: [
            "What is the main topic of the announcement?",
            "What time does the tour begin?",
            "Where should visitors meet?",
            "How long does the tour last?",
            "What is included in the ticket price?",
            "Where can visitors get refreshments?",
            "What is the name of the main exhibition?",
            "Which floor is the gift shop on?",
            "What is the emergency exit location?",
            "What time does the museum close?",
        ],
    },
    {
        id: 3,
        label: "Section 3",
        description: "Academic context – discussion between students",
        questions: [
            "What subject are the students discussing?",
            "When is the assignment due?",
            "How many words must the essay contain?",
            "Who is their supervisor?",
            "What research method do they choose?",
            "Where will they conduct their interviews?",
            "How many participants do they need?",
            "What is the main research question?",
            "What software will they use for analysis?",
            "What is one limitation they identify?",
        ],
    },
    {
        id: 4,
        label: "Section 4",
        description: "Academic lecture – single speaker",
        questions: [
            "What is the lecture topic?",
            "In which century did this phenomenon begin?",
            "What factor does the lecturer identify as primary?",
            "Which country is used as a case study?",
            "What statistic is mentioned about population?",
            "What term describes the main process discussed?",
            "What solution does the speaker propose?",
            "Which institution conducted the cited research?",
            "What year was the key study published?",
            "What does the lecturer recommend for further reading?",
        ],
    },
];

// Flatten all questions into a single array of 40
const ALL_QUESTIONS: string[] = SECTIONS.flatMap(s => s.questions);

// ─── Timer helpers ─────────────────────────────────────────────────────────────
const TOTAL_TIME = 30 * 60; // 30 minutes in seconds

const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
};

// ─── Component ────────────────────────────────────────────────────────────────
export default function ListeningPractice() {
    const { testType } = useParams<{ testType: string }>();
    const isGeneral = testType === 'general';
    const [flowStep, setFlowStep] = useState<'selection' | 'instructions' | 'testing'>('selection');
    const [answers, setAnswers] = useState<string[]>(Array(40).fill(''));
    const [activeSection, setActiveSection] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Timer
    const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
    const [timerStarted, setTimerStarted] = useState(false);
    const [timeUp, setTimeUp] = useState(false);

    // Reset flow on test type change
    useEffect(() => {
        setFlowStep('selection');
        setResult(null);
        setAnswers(Array(40).fill(''));
        setTimeLeft(TOTAL_TIME);
        setTimerStarted(false);
        setTimeUp(false);
    }, [testType]);

    // Start timer when audio begins
    const handleAudioStarted = () => {
        if (!timerStarted && flowStep === 'testing') setTimerStarted(true);
    };

    useEffect(() => {
        if (!timerStarted || timeUp || flowStep !== 'testing') return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setTimeUp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [timerStarted, timeUp, flowStep]);

    const handleAnswerChange = (index: number, value: string) => {
        setAnswers(prev => {
            const next = [...prev];
            next[index] = value;
            return next;
        });
    };

    const answeredCount = answers.filter(a => a.trim() !== '').length;

    const handleSubmit = async () => {
        setError(null);
        setIsSubmitting(true);

        const normalized = answers.map(a => a.trim().toLowerCase());

        try {
            const response = await fetch(
                'https://n8n.srv1196219.hstgr.cloud/webhook/ielts-listening-submit',
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        user_id: 'demo_user',
                        test_id: 'listening_test_01',
                        answers: normalized,
                    }),
                }
            );

            if (!response.ok) throw new Error('Submission failed. Please try again.');

            const data = await response.json();
            const raw = Array.isArray(data) ? data[0] : data;
            setResult(raw);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleStartTest = () => {
        setFlowStep('testing');
        // Timer starts when audio starts normally, but we can also trigger it here 
        // if we want to force start upon entering the test.
    };

    const handleBack = () => {
        if (result) {
            setResult(null);
        } else if (flowStep === 'testing') {
            setFlowStep('instructions');
            setTimerStarted(false);
        } else if (flowStep === 'instructions') {
            setFlowStep('selection');
        } else {
            window.history.back();
        }
    };

    const sectionStart = activeSection * 10;
    const sectionQuestions = ALL_QUESTIONS.slice(sectionStart, sectionStart + 10);
    const sectionAnswers = answers.slice(sectionStart, sectionStart + 10);

    // 1. Selection View
    if (flowStep === 'selection') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <header className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                        IELTS {isGeneral ? 'General' : 'Academic'} Listening <span className="text-cyan-400">Practice.</span>
                    </h1>
                    <p className="text-zinc-500 font-medium text-sm md:text-base">Select a listening simulation to begin your practice session.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bento-card p-8 group transition-all border border-white/5 bg-zinc-900/50 flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-cyan-500/10 transition-colors">
                                <Headphones className="w-5 h-5 text-zinc-500 group-hover:text-cyan-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-cyan-500/10 text-cyan-500 px-2 py-1 rounded">
                                Full Test
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-cyan-500 transition-colors">Complete {isGeneral ? 'General' : 'Academic'} Listening</h3>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">4 Sections • 40 Questions</p>

                        <div className="mt-auto">
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">
                                <span>30 Minutes</span>
                                <span>Audio Enabled</span>
                            </div>
                            <button
                                onClick={() => setFlowStep('instructions')}
                                className="w-full py-3 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
                            >
                                Take Test
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    // 2. Instructions View
    if (flowStep === 'instructions') {
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
                            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest">
                                Listening Test Instructions
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white">Academic Listening</h2>
                        </div>
                        <div className="p-4 bg-zinc-800 rounded-2xl border border-white/5">
                            <Headphones className="w-6 h-6 text-cyan-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duration</p>
                            <p className="text-xl font-bold text-white">30 Minutes</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Questions</p>
                            <p className="text-xl font-bold text-white">40 Items</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Simulation Overview</h4>
                        <ul className="space-y-3 text-zinc-400 font-medium text-sm leading-relaxed list-disc pl-4">
                            <li>The test consists of 4 sections, played once only.</li>
                            <li>Answer questions as you listen.</li>
                            <li>You will have some time at the end to check your answers.</li>
                            <li>The timer starts once you play the audio in the next screen.</li>
                            <li>Ensure your volume is at a comfortable level.</li>
                        </ul>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <button
                            onClick={handleStartTest}
                            className="w-full py-4 bg-cyan-600 hover:bg-cyan-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-cyan-500/20"
                        >
                            Start Listening Test
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // 3. Testing View
    return (
        <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 pb-28">
            <header className="space-y-2">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2.5 hover:bg-white/5 rounded-xl border border-white/5 transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                    </button>
                    <div className="flex items-center gap-2 text-[10px] font-black text-cyan-400 uppercase tracking-[0.2em]">
                        <Headphones className="w-3.5 h-3.5" />
                        <span>IELTS {isGeneral ? 'General' : 'Academic'} Listening Practice Test</span>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-white">
                            {isGeneral ? 'General' : 'Academic'} Listening <span className="text-cyan-400">Practice.</span>
                        </h1>
                        <p className="text-zinc-500 font-medium mt-1 text-sm max-w-xl">
                            Listen carefully and answer the following questions. The audio will play only once.
                        </p>
                    </div>

                    <div className={`flex items-center gap-2 px-5 py-2.5 rounded-xl border font-black text-sm font-mono tabular-nums transition-all ${timeUp
                        ? 'bg-red-500/10 border-red-500/20 text-red-400'
                        : timerStarted
                            ? timeLeft < 300
                                ? 'bg-amber-500/10 border-amber-500/20 text-amber-400'
                                : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-zinc-900 border-white/5 text-zinc-500'
                        }`}>
                        <Clock className={`w-4 h-4 ${timerStarted && !timeUp ? 'animate-pulse' : ''}`} />
                        <span>{timeUp ? "Time's Up!" : formatTime(timeLeft)}</span>
                    </div>
                </div>
            </header>

            <div onClick={handleAudioStarted}>
                <AudioPlayer
                    audioUrl={AUDIO_URL}
                    onEnded={handleAudioStarted}
                />
            </div>

            <div className="flex gap-2 flex-wrap">
                {SECTIONS.map((s, i) => (
                    <button
                        key={s.id}
                        onClick={() => setActiveSection(i)}
                        className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest border transition-all ${activeSection === i
                            ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400'
                            : 'bg-zinc-900 border-white/5 text-zinc-500 hover:border-white/10'
                            }`}
                    >
                        {s.label}
                        <span className={`ml-2 text-[9px] ${answers.slice(i * 10, i * 10 + 10).filter(a => a.trim()).length === 10
                            ? 'text-emerald-400'
                            : 'text-zinc-700'
                            }`}>
                            {answers.slice(i * 10, i * 10 + 10).filter(a => a.trim()).length}/10
                        </span>
                    </button>
                ))}
            </div>

            <AnimatePresence mode="wait">
                {result ? (
                    <ResultPanel
                        key="result"
                        data={result}
                        questions={ALL_QUESTIONS}
                    />
                ) : (
                    <motion.div
                        key={`section-${activeSection}`}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        className="bento-card p-6 md:p-8 bg-zinc-900/50 border border-white/5 space-y-6"
                    >
                        <div className="flex items-center gap-3 pb-4 border-b border-white/5">
                            <div className="w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                            <div>
                                <h2 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-300">
                                    {SECTIONS[activeSection]?.label}
                                </h2>
                                <p className="text-[10px] text-zinc-600 font-medium mt-0.5">
                                    {SECTIONS[activeSection]?.description} • Questions {sectionStart + 1}–{sectionStart + 10}
                                </p>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                            {sectionQuestions.map((q, i) => (
                                <QuestionItem
                                    key={sectionStart + i}
                                    index={sectionStart + i}
                                    text={q}
                                    value={sectionAnswers[i] || ""}
                                    onChange={handleAnswerChange}
                                    disabled={isSubmitting || timeUp}
                                />
                            ))}
                        </div>

                        <div className="flex justify-between pt-4 border-t border-white/5">
                            <button
                                onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                                disabled={activeSection === 0}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-700 transition-all"
                            >
                                <ChevronLeft className="w-4 h-4" /> Previous
                            </button>
                            <button
                                onClick={() => setActiveSection(prev => Math.min(3, prev + 1))}
                                disabled={activeSection === 3}
                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-800 text-zinc-400 text-xs font-bold uppercase tracking-widest disabled:opacity-30 hover:bg-zinc-700 transition-all"
                            >
                                Next <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-medium">
                    {error}
                </div>
            )}

            {!result && (
                <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/5 bg-zinc-950/90 backdrop-blur-md px-4 py-4 md:px-6">
                    <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-[10px] md:text-xs font-bold text-zinc-500 uppercase tracking-widest">
                            <span className="text-cyan-400">{answeredCount}</span> / 40 answered
                        </div>
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className={`btn-modern w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${isSubmitting
                                ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                : 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95 shadow-[0_4px_20px_rgba(34,211,238,0.3)]'
                                }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin" />
                                    <span>Evaluating...</span>
                                </>
                            ) : (
                                <>
                                    <Send className="w-4 h-4" />
                                    <span>Submit Test</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
