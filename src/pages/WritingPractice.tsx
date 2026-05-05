import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import {
    Clock,
    ChevronLeft,
    LayoutDashboard,
    Quote,
    PenTool,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Atomic Components
import EssayEditor from '../components/writing/EssayEditor';
import WordCounter from '../components/writing/WordCounter';
import SubmitButton from '../components/writing/SubmitButton';
import ResultPanel from '../components/writing/ResultPanel';
import { usePerformance } from '../lib/PerformanceContext';

// Task 1 Visuals
import barChart from '../assets/writing/bar_chart.png';
import lineGraph from '../assets/writing/line_graph.png';
import processDiagram from '../assets/writing/process_diagram.png';

interface Task {
    id: number;
    title: string;
    type: 'Task 1' | 'Task 2';
    description: string;
    prompt: string;
    visualUrl?: string;
    targetWords: number;
    duration: number; // in seconds
    status: 'Pending' | 'Completed';
}

const DAILY_TASKS: Task[] = [
    {
        id: 1,
        title: 'Coffee Consumption Trends',
        type: 'Task 1',
        description: 'Academic Writing - Data Description',
        prompt: 'The bar chart below shows the annual coffee consumption in five different countries between 2020 and 2022. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
        visualUrl: barChart,
        targetWords: 150,
        duration: 1200, // 20 minutes
        status: 'Pending'
    },
    {
        id: 2,
        title: 'Population Growth Trends',
        type: 'Task 1',
        description: 'Academic Writing - Data Description',
        prompt: 'The line graph illustrates historical and projected population changes in three fictional cities: NeoCity, OldTown, and GreenValley from 1950 to 2050. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
        visualUrl: lineGraph,
        targetWords: 150,
        duration: 1200, // 20 minutes
        status: 'Pending'
    },
    {
        id: 3,
        title: 'Plastic Bottle Recycling',
        type: 'Task 1',
        description: 'Academic Writing - Process Diagram',
        prompt: 'The diagram below shows the stages of plastic bottle recycling. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.',
        visualUrl: processDiagram,
        targetWords: 150,
        duration: 1200, // 20 minutes
        status: 'Pending'
    },
    {
        id: 4,
        title: 'Education & Equality',
        type: 'Task 2',
        description: 'Academic Writing - Social Issues',
        prompt: '"Some people believe that education should be free for everyone. To what extent do you agree or disagree?"',
        targetWords: 250,
        duration: 2400, // 40 minutes
        status: 'Pending'
    }
];

export default function WritingPractice() {
    const { addScore } = usePerformance();
    const { testType } = useParams<{ testType: string }>();
    const isGeneral = testType === 'general';

    const filteredTasks = useMemo(() => {
        // For General, we usually have a letter for Task 1, but for now let's just label them
        return DAILY_TASKS.map(task => ({
            ...task,
            description: `${isGeneral ? 'General' : 'Academic'} Writing - ${task.type === 'Task 1' ? (isGeneral ? 'Letter Writing' : 'Data Description') : 'Social Issues'}`
        }));
    }, [isGeneral]);

    const [selectedTask, setSelectedTask] = useState<Task | null>(null);
    const [flowStep, setFlowStep] = useState<'selection' | 'instructions' | 'testing'>('selection');
    const [essayText, setEssayText] = useState('');
    const [wordCount, setWordCount] = useState(0);
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    // Timer state
    const [timeLeft, setTimeLeft] = useState(0);
    const [isTimerRunning, setIsTimerRunning] = useState(false);
    const [isTimeUp, setIsTimeUp] = useState(false);

    // Reset flow when URL params change (switching between Academic/General)
    useEffect(() => {
        setSelectedTask(null);
        setFlowStep('selection');
        setEssayText('');
        setResult(null);
    }, [testType]);

    // Word count logic
    useEffect(() => {
        const text = essayText.trim();
        if (text === '') {
            setWordCount(0);
        } else {
            const words = text.split(/\s+/);
            setWordCount(words.length);
        }
    }, [essayText]);

    // Timer countdown
    useEffect(() => {
        if (!isTimerRunning || timeLeft <= 0) return;
        const interval = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(interval);
                    setIsTimerRunning(false);
                    setIsTimeUp(true);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [isTimerRunning]);

    // Start timer only when in 'testing' step and user begins typing
    const handleEssayChange = (value: string) => {
        setEssayText(value);
        if (flowStep === 'testing' && !isTimerRunning && !isTimeUp && selectedTask && value.length > 0) {
            setTimeLeft(selectedTask.duration);
            setIsTimerRunning(true);
        }
    };

    // Format mm:ss
    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const handleEvaluate = async () => {
        if (wordCount < (selectedTask?.targetWords || 250)) {
            setError(`Essay must contain at least ${selectedTask?.targetWords || 250} words.`);
            return;
        }

        setError(null);
        setIsEvaluating(true);

        try {
            const response = await fetch("https://n8n.srv1196219.hstgr.cloud/webhook/ielts-writing", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    user_id: "demo_user",
                    task_type: selectedTask?.type === 'Task 1' ? 'task1' : 'task2',
                    essay: essayText,
                    word_count: wordCount
                })
            });

            if (!response.ok) {
                throw new Error("Failed to evaluate essay. Please try again.");
            }

            const data = await response.json();
            const raw = Array.isArray(data) ? data[0] : data;

            const normalized = {
                band_score: parseFloat(raw.overall_band ?? raw.band_score ?? 0),
                task_response: parseFloat(raw.task_response ?? 0),
                coherence: parseFloat(raw.coherence ?? 0),
                lexical: parseFloat(raw.lexical ?? 0),
                grammar: parseFloat(raw.grammar ?? 0),
                feedback: raw.feedback ?? '',
                improved_essay: raw.improved_essay ?? '',
            };

            setResult(normalized);

            // Save to Performance Context
            addScore({
                module: 'writing',
                score: normalized.band_score,
                date: new Date().toISOString(),
                tag: selectedTask?.type === 'Task 1' ? 'Writing Task 1' : 'Writing Task 2',
                title: selectedTask?.title || 'Writing Task'
            });

        } catch (err: any) {
            console.error("Evaluation Error:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsEvaluating(false);
        }
    };

    const handleTaskSelect = (task: Task) => {
        setSelectedTask(task);
        setFlowStep('instructions');
        setEssayText('');
        setResult(null);
        setError(null);
        setTimeLeft(0);
        setIsTimerRunning(false);
        setIsTimeUp(false);
    };

    const handleStartTest = () => {
        if (selectedTask) {
            setFlowStep('testing');
            setTimeLeft(selectedTask.duration);
            // We don't start timer yet, it starts on typing as per previous logic
            // or we could start it immediately here if that's preferred.
            // User said "start test after clicking button", so maybe start timer now?
            // Let's start it now for a more "test-like" feel.
            setIsTimerRunning(true);
        }
    };

    const handleProceedToTask2 = () => {
        const task2 = filteredTasks.find(t => t.type === 'Task 2');
        if (task2) {
            handleTaskSelect(task2);
        }
    };

    const handleBack = () => {
        if (result) {
            setResult(null);
        } else if (flowStep === 'testing') {
            setFlowStep('instructions');
            setIsTimerRunning(false);
        } else if (flowStep === 'instructions') {
            setFlowStep('selection');
            setSelectedTask(null);
        } else {
            setSelectedTask(null);
            setFlowStep('selection');
        }
    };

    // 1. Selection View
    if (flowStep === 'selection') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <header className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                        IELTS {isGeneral ? 'General' : 'Academic'} Writing <span className="text-emerald-500">Practice.</span>
                    </h1>
                    <p className="text-zinc-500 font-medium text-sm md:text-base">Select a {isGeneral ? 'General' : 'Academic'} task to begin your writing session.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTasks.map((task) => (
                        <motion.div
                            key={task.id}
                            whileHover={{ y: -5 }}
                            className="bento-card p-8 group transition-all border border-white/5 bg-zinc-900/50 flex flex-col"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-emerald-500/10 transition-colors">
                                    <Clock className="w-5 h-5 text-zinc-500 group-hover:text-emerald-500" />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded">
                                    {task.type}
                                </span>
                            </div>
                            <h3 className="text-xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">{task.title}</h3>
                            <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">{task.description}</p>

                            <div className="mt-auto">
                                <div className="pt-6 border-t border-white/5 flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">
                                    <span>{task.targetWords} Words</span>
                                    <span>{task.duration / 60} Mins</span>
                                </div>
                                <button
                                    onClick={() => handleTaskSelect(task)}
                                    className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
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
    if (flowStep === 'instructions' && selectedTask) {
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
                            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
                                {selectedTask.type} Instructions
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white">{selectedTask.title}</h2>
                        </div>
                        <div className="p-4 bg-zinc-800 rounded-2xl border border-white/5">
                            <PenTool className="w-6 h-6 text-emerald-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Time Limit</p>
                            <p className="text-xl font-bold text-white">{selectedTask.duration / 60} Minutes</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Word Target</p>
                            <p className="text-xl font-bold text-white">{selectedTask.targetWords}+ Words</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Test Instructions</h4>
                        <ul className="space-y-3 text-zinc-400 font-medium text-sm leading-relaxed list-disc pl-4">
                            <li>Read the prompt carefully and address all parts of the task.</li>
                            <li>Organize your ideas logically and use appropriate linking words.</li>
                            <li>The timer will start as soon as you click the button below.</li>
                            <li>Your work will be automatically saved as you type.</li>
                            <li>You can submit your essay anytime before the timer runs out.</li>
                        </ul>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <button
                            onClick={handleStartTest}
                            className="w-full py-4 bg-emerald-500 hover:bg-emerald-600 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-emerald-500/20"
                        >
                            Start Writing Test
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    // 3. Testing View
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 pb-24">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                    <button
                        onClick={handleBack}
                        className="p-2.5 hover:bg-white/5 rounded-xl border border-white/5 transition-colors group"
                    >
                        <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-white" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-1 text-[10px] font-black text-emerald-500 uppercase tracking-[0.2em]">
                            <span>{selectedTask!.type}</span>
                            <span className="w-1 h-1 rounded-full bg-zinc-700" />
                            <span className="text-zinc-500">{selectedTask!.description}</span>
                        </div>
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-white">
                            {selectedTask!.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-xs uppercase tracking-widest tabular-nums transition-all ${isTimeUp
                        ? 'bg-red-500/10 border-red-500/20 text-red-500'
                        : isTimerRunning
                            ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400'
                            : 'bg-zinc-900 border-white/5 text-zinc-500'
                        }`}>
                        <Clock className={`w-4 h-4 ${isTimerRunning && !isTimeUp ? 'animate-pulse' : ''}`} />
                        <span className="font-mono text-sm">
                            {isTimeUp
                                ? "Time's Up!"
                                : isTimerRunning
                                    ? formatTime(timeLeft)
                                    : formatTime(selectedTask!.duration)}
                        </span>
                    </div>
                </div>
            </header>

            <main className="flex flex-col gap-8 items-start">
                <div className="w-full space-y-8">
                    {!result && (
                        <div className="grid lg:grid-cols-2 gap-8">
                            <div className="space-y-6 lg:sticky lg:top-8">
                                <div className="bento-card p-6 md:p-10 bg-gradient-to-br from-zinc-900/50 to-transparent border border-white/5 space-y-6 md:space-y-8">
                                    <div className="p-3 bg-zinc-800 w-fit rounded-xl border border-white/5">
                                        <Quote className="w-5 h-5 text-emerald-500" />
                                    </div>
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-zinc-500">IELTS Question Card</h3>
                                        <p className="text-lg md:text-xl leading-relaxed text-zinc-200 font-bold tracking-tight">
                                            {selectedTask!.prompt}
                                        </p>
                                    </div>
                                </div>

                                {selectedTask!.visualUrl && (
                                    <div className="bento-card p-4 bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
                                        <img
                                            src={selectedTask!.visualUrl}
                                            alt="Task Visual"
                                            className="w-full h-auto rounded-xl object-contain bg-white"
                                        />
                                    </div>
                                )}

                                <div className="bento-card p-6 border border-white/5">
                                    <WordCounter current={wordCount} minimum={selectedTask!.targetWords} />
                                </div>
                            </div>

                            <div className="space-y-6">
                                {isTimeUp && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm font-bold"
                                    >
                                        <Clock className="w-4 h-4 shrink-0" />
                                        <span>Time is up! Writing has been stopped. You can still submit your essay for evaluation.</span>
                                    </motion.div>
                                )}

                                <EssayEditor
                                    value={essayText}
                                    onChange={handleEssayChange}
                                    disabled={isEvaluating || isTimeUp}
                                    placeholder="Write your IELTS essay here..."
                                />

                                {error && (
                                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm font-medium">
                                        {error}
                                    </div>
                                )}

                                <SubmitButton
                                    onClick={handleEvaluate}
                                    disabled={wordCount < (selectedTask!.targetWords || 250) || isEvaluating}
                                    loading={isEvaluating}
                                />
                            </div>
                        </div>
                    )}

                    <AnimatePresence>
                        {result && (
                            <ResultPanel
                                data={result}
                                onNextTask={selectedTask!.type === 'Task 1' ? handleProceedToTask2 : undefined}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </main>

            {result && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
                    <button
                        onClick={handleBack}
                        className="btn-modern bg-zinc-900 border border-white/10 px-8 py-3 rounded-full flex items-center gap-2 hover:bg-zinc-800 transition-all text-sm font-black uppercase tracking-widest shadow-2xl"
                    >
                        <LayoutDashboard className="w-4 h-4" />
                        Back to Selection
                    </button>
                </div>
            )}
        </div>
    );
}
