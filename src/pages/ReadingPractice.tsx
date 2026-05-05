import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import {
    ChevronLeft,
    Clock,
    Send,
    Loader2,
    ChevronRight,
    Layout
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Custom Components
import ReadingPassage from '../components/reading/ReadingPassage';
import QuestionSection from '../components/reading/QuestionSection';
import ReadingResultPanel from '../components/reading/ReadingResultPanel';
import QuestionNavigator from '../components/reading/QuestionNavigator';

const PASSAGES = [
    {
        id: 1,
        title: "The Impact of Artificial Intelligence on Modern Workspaces",
        content: `Artificial intelligence (AI) has rapidly transformed the way we approach work, fundamentally altering professional environments across nearly every sector of the global economy. From automating routine tasks to providing unprecedented insights into complex data sets, AI is not merely a technological trend but a fundamental shift in how organisations create value, manage workflows, and interact with their workforces. As this transformation continues to accelerate, it raises profound questions about the very nature of work itself.

# The Rise of Intelligent Automation

Historically, automation was confined to repetitive physical tasks in manufacturing environments. Assembly lines, welding robots, and mechanised packaging processes defined the first wave of industrial automation. However, the current generation of AI-driven automation marks a qualitative departure from its predecessors. Modern AI systems, powered by machine learning algorithms and vast neural networks trained on billions of data points, are now capable of performing tasks that require sophisticated pattern recognition, language comprehension, and even creative problem-solving.

Industries that were once considered immune to automation are now undergoing rapid transformation. Data analysts who once spent hours preparing and cleaning spreadsheets can now rely on AI tools that complete these tasks in seconds. Legal researchers can use natural language processing systems to review thousands of case documents in minutes rather than months. In radiology, AI-powered diagnostic tools are matching and, in certain narrow applications, surpassing the accuracy of experienced human clinicians in identifying anomalies in medical imaging scans.


Perhaps the most significant and nuanced shift brought about by AI is the emerging model of human-AI collaboration. Contrary to the often dystopian predictions made by sceptics, the early evidence from organisations at the frontier of AI adoption suggests that AI most frequently augments human capabilities rather than replacing them outright. In this collaborative paradigm, AI systems assume responsibility for handling and synthesising massive volumes of information, leaving human professionals free to focus on the higher-order cognitive tasks at which they excel: strategic decision-making, ethical reasoning, interpersonal negotiation, and the exercise of genuine emotional intelligence.

Management consulting firms have deployed AI tools that can rapidly analyse a client company's entire financial database, identify patterns invisible to human eyes, and generate preliminary diagnostic reports. The human consultant's role evolves: rather than spending weeks gathering and verifying data, they dedicate their expertise to interpreting nuanced findings, challenging AI-generated assumptions, and building the relationships of trust with clients that no machine can replicate. This dynamic requires a significant shift in how organisations conceive of professional skills and develop their talent pipelines.


With great technological power comes profound social responsibility. The widespread deployment of AI in the workplace raises a constellation of complex ethical questions that demands careful attention from business leaders, policymakers, and civil society alike. Chief among these is the issue of data privacy. AI systems require vast quantities of data to function effectively, and in a workplace context, this data is frequently drawn from detailed monitoring of employee activity, communications, and performance. The potential for this surveillance to cross ethical boundaries and infringe on workers' rights to privacy is a genuine concern.

A second critical issue is algorithmic bias. AI systems learn from historical data, and if that historical data reflects the prejudices of the past — in hiring decisions, performance evaluations, or promotion patterns — then the AI will codify and perpetuate those very biases at industrial scale. Organisations deploying AI for human resources functions must invest in rigorous auditing processes to identify and mitigate the risk of discriminatory outcomes.

Finally, the potential displacement of workers — particularly those in roles characterised by routine information processing — cannot be dismissed. While historical technological transitions have ultimately created more jobs than they destroyed, the pace and breadth of AI adoption may produce a period of significant structural unemployment, disproportionately affecting workers without access to reskilling opportunities. Governments and corporations alike must invest proactively in education and workforce transition programmes to ensure that the benefits of AI are distributed equitably across society.`,
        questions: [
            { id: 1, type: 'mcq' as const, text: "Which sector was historically the primary user of automation?", options: ["Medicine", "Manufacturing", "Legal Research", "Data Analysis"] },
            { id: 2, type: 'boolean' as const, text: "AI is now exclusively used for physical repetitive tasks.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 3, type: 'text' as const, text: "In collaborative environments, AI is often referred to as a _______." },
            { id: 4, type: 'mcq' as const, text: "What is a major ethical concern mentioned regarding AI in the workplace?", options: ["Loss of physical fitness", "Algorithmic bias", "Increased cost of hardware", "Faster communication"] },
            { id: 5, type: 'boolean' as const, text: "Companies can ignore data privacy when implementing AI.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 6, type: 'text' as const, text: "AI handles massive amounts of _______ while humans focus on decision making." },
            { id: 7, type: 'mcq' as const, text: "In which field can AI exceed the accuracy of human clinicians?", options: ["Radiology", "Law", "Management", "Manufacturing"] },
            { id: 8, type: 'boolean' as const, text: "AI acts as a replacement for human emotional intelligence.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 9, type: 'text' as const, text: "The current wave of automation affects both manufacturing and _______ professions." },
            { id: 10, type: 'mcq' as const, text: "What should companies ensure during the transition to AI?", options: ["Higher profits only", "A fair and productive transition", "Complete replacement of all workers", "Use of the most expensive AI"] },
            { id: 11, type: 'boolean' as const, text: "Deep insights into complex data sets are a benefit of AI.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 12, type: 'text' as const, text: "The deployment of AI raises questions about _______ privacy." },
            { id: 13, type: 'mcq' as const, text: "What does AI help legal researchers with?", options: ["Physical labor", "Enhancing efficiency", "Removing the need for laws", "Replacing judges"] }
        ]
    },
    {
        id: 2,
        title: "The Evolution of Marine Ecosystems",
        content: `The oceans cover more than seventy percent of the Earth's surface and are home to a staggering diversity of life. From microscopic phytoplankton that form the invisible foundation of aquatic food chains, to the magnificent blue whale, the largest animal ever to have existed on Earth, marine ecosystems represent some of the most complex and productive biological systems on the planet. They regulate climate, generate a significant proportion of the oxygen we breathe, and support the livelihoods of hundreds of millions of people worldwide. Yet these extraordinary environments are under unprecedented pressure from a confluence of human-driven forces.

# Climate Change and Coral Reefs

One of the most visually dramatic and ecologically significant impacts of anthropogenic climate change is the phenomenon of coral bleaching. Tropical coral reefs, often described as the "rainforests of the sea", support an estimated twenty-five percent of all marine biodiversity despite covering less than one percent of the ocean floor. Their biological productivity and ecological importance is therefore wildly disproportionate to their geographic footprint.

Coral polyps — the tiny animals that build reef structures — maintain a delicate symbiotic relationship with microscopic algae known as zooxanthellae, which live within their tissues. These algae perform photosynthesis and provide the coral with up to ninety percent of its energy requirements. However, when water temperatures rise even a single degree above the seasonal maximum for a sustained period of weeks, corals become physiologically stressed and expel their zooxanthellae, leaving behind the ghostly white calcium carbonate skeleton — the process known as bleaching. Without their primary food source, bleached corals are in a state of severe starvation. If elevated temperatures persist, the corals die, and the entire ecosystem that depends on the three-dimensional physical structure of the reef begins to collapse.

# Overfishing and Disrupted Food Webs

The global demand for seafood has grown dramatically over the past half-century, driven by rising incomes and populations in Asia, Europe, and North America. This demand has fuelled an era of large-scale commercial overfishing, deploying factory trawlers capable of harvesting hundreds of tonnes of fish in a single operation. The ecological consequences are profound and far-reaching, disrupting the natural balance of marine food webs in ways that are still being fully understood.

The removal of apex predators — including various shark species, large tuna, and groupers — creates what ecologists term "trophic cascades." With these controlling predators absent, populations of their prey species can explode. These smaller predatory fish then heavily predate on herbivorous species, which in turn can no longer fulfil their crucial ecological function: grazing on the algae that would otherwise smother productive habitats such as kelp forests and seagrass meadows. The result is a series of cascading failures across the food web, fundamentally restructuring the ecological character of affected marine areas.

# Plastic Pollution and the Microplastic Crisis

Every year, an estimated eight to twelve million tonnes of plastic waste enter the world's oceans, primarily from inefficient waste management systems in rapidly urbanising developing nations, as well as from rivers that transport inland waste to coastal waters. Unlike organic matter, plastics are not biodegradable; instead, they undergo a process of photodegradation, where sunlight and wave action break larger items into progressively smaller fragments. These fragments — defined as microplastics when they fall below five millimetres in size — are now found in every ocean basin on Earth, from the Arctic to the Antarctic, and at every depth, including the deepest marine trenches.

The consequences for marine life are severe and multifaceted. Filter feeders such as mussels, oysters, and various species of baleen whale inadvertently ingest microplastics in enormous quantities. The chemical additives incorporated into plastics during manufacturing — including phthalates, bisphenols, and various flame retardants — can leach from the particles into the tissues of consuming organisms. Through a process of bioaccumulation and biomagnification, the concentration of these toxic substances increases at each successive level of the food web, meaning that apex predators — including humans who consume seafood — receive the highest doses.`,
        questions: [
            { id: 14, type: 'mcq' as const, text: "What percentage of the Earth's surface do oceans cover?", options: ["50%", "60%", "70%", "80%"] },
            { id: 15, type: 'boolean' as const, text: "Coral bleaching is a result of ocean temperatures cooling.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 16, type: 'text' as const, text: "Corals expel _______ algae during the bleaching process." },
            { id: 17, type: 'mcq' as const, text: "What happens when top predators like sharks are removed?", options: ["Marine balance is maintained", "Populations of smaller fish decrease", "Disruption of marine food webs", "Kelp forests grow faster"] },
            { id: 18, type: 'boolean' as const, text: "Plastic pollution eventually disappears from the ocean.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 19, type: 'text' as const, text: "Microplastics are consumed by _______ animals." },
            { id: 20, type: 'mcq' as const, text: "What are the chemical additives in plastics capable of?", options: ["Cleaning the ocean", "Leaching into animal tissues", "Making plastics stronger over time", "Encouraging coral growth"] },
            { id: 21, type: 'boolean' as const, text: "Overfishing leads to the collapse of essential habitats.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 22, type: 'text' as const, text: "The loss of primary _______ source leads to coral death." },
            { id: 23, type: 'mcq' as const, text: "What produces microplastics?", options: ["Marine algae", "Coral reefs", "Breakdown of larger plastic materials", "Fish digestion"] },
            { id: 24, type: 'boolean' as const, text: "Humans are safe from the effects of microplastics consumption.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 25, type: 'text' as const, text: "Oceans are home to a staggering _______ of life." },
            { id: 26, type: 'mcq' as const, text: "What is the primary food source for coral reefs mentioned?", options: ["Small fish", "Symbiotic algae", "Microplastics", "Kelp"] }
        ]
    },
    {
        id: 3,
        title: "Modern Urban Planning and Sustainable Cities",
        content: `As the global population continues its dramatic migration towards urban centres — a trend that the United Nations projects will result in two thirds of humanity living in cities by 2050 — the challenges confronting urban planners and policymakers have never been more complex or consequential. Cities of the twenty-first century must simultaneously accommodate rapid population growth, deliver high-quality public services, and do so in a manner that does not compromise the ecological systems upon which all human prosperity ultimately depends. Modern urban planning has responded to this imperative by placing sustainability at the core of its intellectual and practical agenda.

# Green Infrastructure and Urban Ecology

Sustainable cities have increasingly moved beyond a purely instrumental view of nature to embrace what researchers term "green infrastructure" — a strategically planned network of natural and semi-natural areas that delivers a portfolio of ecosystem services to urban residents. Parks and public gardens serve obvious recreational functions, but they are also critical tools for managing stormwater runoff, filtering air pollutants, sequestering carbon dioxide, and providing biodiversity habitat in otherwise highly impervious urban landscapes.

Among the most innovative applications of green infrastructure thinking are the concepts of green roofs and living walls. A green roof — a vegetated layer grown on the waterproofed surface of a building — provides insulation that significantly reduces heating and cooling energy demands, extends the life of the roof structure by protecting it from ultraviolet radiation and temperature fluctuation, and contributes to urban biodiversity by creating elevated habitat patches for insects and birds. Perhaps most critically in the context of the urban heat island phenomenon, where dense concentrations of dark heat-absorbing surfaces cause cities to be several degrees warmer than surrounding rural areas, the evapotranspiration process of plants provides a highly effective natural cooling mechanism.

# Public Transportation and Reduced Car Dependency

A central pillar of sustainable urban design is the deliberate reduction of automobile dependency through the development of comprehensive, high-quality public transportation systems. The environmental case for this transition is well established: the transport sector is responsible for approximately twenty-three percent of global energy-related carbon dioxide emissions, with private passenger vehicles accounting for the largest share. But the case is also economic and social.

The space efficiency of public transport — a single underground metro line can carry the equivalent passenger load of up to twenty lanes of urban motorway — means that cities investing in rail and bus rapid transit networks can reclaim vast quantities of urban land currently dedicated to roads and parking, redirecting it towards housing, parks, and productive economic uses. Cities across Northern Europe, including Amsterdam, Copenhagen, Vienna, and Zurich, have pioneered integrated multi-modal transport systems that seamlessly combine heavy rail, light rail, cycling infrastructure, and shared mobility services, achieving private car mode shares of well below thirty percent. The result is not merely reduced emissions, but demonstrably higher quality of life indicators for residents, including lower transport costs as a proportion of household income, reduced commute times, better air quality, and dramatically lower rates of traffic fatality.

# Renewable Energy Integration and Zero-Carbon Development

The buildings sector consumes approximately forty percent of global final energy, making it central to any credible pathway towards a sustainable urban future. Modern sustainable urban development responds to this imperative through a combination of passive design strategies — building orientation, form, and envelope specification optimised to minimise energy demand — and active energy generation technologies. Solar photovoltaic panels have experienced a reduction in cost of over ninety percent in the past decade, making rooftop or facade-integrated solar a standard feature in progressive municipal building codes. Combined with advanced battery storage systems and smart grid technologies that allow buildings to dynamically respond to grid supply and demand conditions, new urban districts are increasingly being designed to achieve net-zero or net-positive energy performance.

Beyond the individual building scale, innovative cities are exploring district-level approaches to energy management, including waste heat recovery from data centres and industrial processes, large-scale geothermal systems, and the deployment of hydrogen fuel cells. These systemic approaches, combined with ambitious but achievable targets embedded in city master plans, represent the blueprint for the sustainable urban future that human civilisation urgently requires.`,
        questions: [
            { id: 27, type: 'mcq' as const, text: "What is a major priority for modern urban planners?", options: ["Increased car usage", "Environmental health", "Sprawling suburbs", "Reduced public transport"] },
            { id: 28, type: 'boolean' as const, text: "The 'urban heat island' effect makes cities cooler than rural areas.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 29, type: 'text' as const, text: "Green roofs are an example of green _______." },
            { id: 30, type: 'mcq' as const, text: "Which cities are mentioned for prioritizing cycling?", options: ["London and Paris", "New York and Tokyo", "Amsterdam and Copenhagen", "Berlin and Rome"] },
            { id: 31, type: 'boolean' as const, text: "Subways and light rails increase greenhouse gas emissions.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 32, type: 'text' as const, text: "Zero-carbon developments produce as much energy as they _______." },
            { id: 33, type: 'mcq' as const, text: "What do green spaces help improve for residents?", options: ["Physical speed", "Mental health", "Internet connectivity", "Job security"] },
            { id: 34, type: 'boolean' as const, text: "Solar panels are part of modern energy-efficient building designs.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 35, type: 'text' as const, text: "Sustainable urbanism aims to reduce _______ dependency." },
            { id: 36, type: 'mcq' as const, text: "What is the goal of zero-carbon developments?", options: ["High energy waste", "Consuming more energy than produced", "Meeting international climate targets", "Eliminating all buildings"] },
            { id: 37, type: 'boolean' as const, text: "Urban forests help to mitigate the heat island effect.", options: ["TRUE", "FALSE", "NOT GIVEN"] },
            { id: 38, type: 'text' as const, text: "The need for sustainable planning is driven by migration toward _______ centers." },
            { id: 39, type: 'mcq' as const, text: "What is a 'pillar' of sustainable urbanism?", options: ["More parking lots", "Efficient public transportation", "Single-use plastics", "Diesel generators"] },
            { id: 40, type: 'boolean' as const, text: "Copenhagen prioritizes cycling as a primary mode of transport.", options: ["TRUE", "FALSE", "NOT GIVEN"] }
        ]
    }
];

const INITIAL_TIME = 60 * 60; // 60 minutes in seconds

export default function ReadingPractice() {
    const { testType } = useParams<{ testType: string }>();
    const isGeneral = testType === 'general';
    const [flowStep, setFlowStep] = useState<'selection' | 'instructions' | 'testing'>('selection');
    const [activePassageIndex, setActivePassageIndex] = useState(0);
    const [answers, setAnswers] = useState<Record<number, string>>({});
    const [timeRemaining, setTimeRemaining] = useState(INITIAL_TIME);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    const activePassage = PASSAGES[activePassageIndex];

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const handleAnswerChange = (id: number, value: string) => {
        setAnswers(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = useCallback(async () => {
        if (isSubmitting) return;

        setIsSubmitting(true);
        setError(null);

        try {
            const allQuestions = PASSAGES.flatMap(p => p.questions);
            const answerList = allQuestions.map(q => answers[q.id] || "");

            const response = await fetch("https://n8n.srv1196219.hstgr.cloud/webhook/ielts-reading-submit", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    user_id: "demo_user",
                    test_id: "reading_test_01",
                    answers: answerList
                })
            });

            if (!response.ok) {
                throw new Error("Failed to evaluate reading answers. Please try again.");
            }

            const data = await response.json();
            const raw = Array.isArray(data) ? data[0] : data;
            setResult(raw);
        } catch (err: any) {
            console.error("Evaluation Error:", err);
            setError(err.message || "An unexpected error occurred.");
        } finally {
            setIsSubmitting(false);
        }
    }, [answers, isSubmitting]);

    // Timer Logic - Only active in 'testing' step
    useEffect(() => {
        if (result || isSubmitting || flowStep !== 'testing') return;

        const timer = setInterval(() => {
            setTimeRemaining(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    handleSubmit();
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [result, isSubmitting, handleSubmit, flowStep]);

    const handleReset = () => {
        setResult(null);
        setAnswers({});
        setTimeRemaining(INITIAL_TIME);
        setActivePassageIndex(0);
        setError(null);
        setFlowStep('selection');
    };

    const handleStartTest = () => {
        setFlowStep('testing');
    };

    const nextPassage = () => {
        if (activePassageIndex < PASSAGES.length - 1) {
            setActivePassageIndex(prev => prev + 1);
        }
    };

    const prevPassage = () => {
        if (activePassageIndex > 0) {
            setActivePassageIndex(prev => prev - 1);
        }
    };

    const scrollToQuestion = (id: number) => {
        const passageIndex = PASSAGES.findIndex(p => p.questions.some(q => q.id === id));
        if (passageIndex !== -1) {
            setActivePassageIndex(passageIndex);
        }
    };

    const handleBack = () => {
        if (result) {
            setResult(null);
        } else if (flowStep === 'testing') {
            setFlowStep('instructions');
        } else if (flowStep === 'instructions') {
            setFlowStep('selection');
        } else {
            window.history.back();
        }
    };

    // 1. Selection View
    if (flowStep === 'selection') {
        return (
            <div className="max-w-7xl mx-auto px-4 py-6 md:py-8">
                <header className="mb-8 md:mb-12 text-center md:text-left">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight text-white mb-2">
                        IELTS {isGeneral ? 'General' : 'Academic'} Reading <span className="text-indigo-500">Practice.</span>
                    </h1>
                    <p className="text-zinc-500 font-medium text-sm md:text-base">Select a reading simulation to begin your practice session.</p>
                </header>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <motion.div
                        whileHover={{ y: -5 }}
                        className="bento-card p-8 group transition-all border border-white/5 bg-zinc-900/50 flex flex-col"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-zinc-800 rounded-xl group-hover:bg-indigo-500/10 transition-colors">
                                <Layout className="w-5 h-5 text-zinc-500 group-hover:text-indigo-500" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest bg-indigo-500/10 text-indigo-500 px-2 py-1 rounded">
                                Full Test
                            </span>
                        </div>
                        <h3 className="text-xl font-bold mb-2 group-hover:text-indigo-500 transition-colors">Complete {isGeneral ? 'General' : 'Academic'} Reading</h3>
                        <p className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-6">3 Passages • 40 Questions</p>

                        <div className="mt-auto">
                            <div className="pt-6 border-t border-white/5 flex items-center justify-between text-zinc-500 text-xs font-bold uppercase tracking-widest mb-6">
                                <span>60 Minutes</span>
                                <span>Score Analysis</span>
                            </div>
                            <button
                                onClick={() => setFlowStep('instructions')}
                                className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs uppercase tracking-widest rounded-xl transition-all"
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
                            <span className="text-[10px] font-black text-indigo-500 uppercase tracking-widest">
                                Reading Test Instructions
                            </span>
                            <h2 className="text-2xl sm:text-3xl font-black text-white">Academic Reading</h2>
                        </div>
                        <div className="p-4 bg-zinc-800 rounded-2xl border border-white/5">
                            <Clock className="w-6 h-6 text-indigo-500" />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Duration</p>
                            <p className="text-xl font-bold text-white">60 Minutes</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Questions</p>
                            <p className="text-xl font-bold text-white">40 Items</p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <h4 className="text-sm font-black text-zinc-400 uppercase tracking-widest">Simulation Overview</h4>
                        <ul className="space-y-3 text-zinc-400 font-medium text-sm leading-relaxed list-disc pl-4">
                            <li>There are 3 sections in this test.</li>
                            <li>You should aim to spend 20 minutes on each section.</li>
                            <li>Answer all questions. There is no penalty for wrong answers.</li>
                            <li>The timer starts once you click the button below.</li>
                            <li>Ensure you scroll down to see both the passage and questions.</li>
                        </ul>
                    </div>

                    <div className="pt-8 border-t border-white/5">
                        <button
                            onClick={handleStartTest}
                            className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-black text-sm uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-indigo-500/20"
                        >
                            Start Reading Test
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    if (!activePassage) return null;

    // 3. Testing View
    return (
        <div className="flex flex-col h-screen max-h-screen overflow-hidden p-4 lg:p-6 space-y-6">
            <header className="flex flex-col sm:flex-row items-center justify-between shrink-0 gap-4 px-2">
                <div className="flex items-center gap-4 w-full sm:w-auto">
                    <button
                        onClick={handleBack}
                        className="p-2 hover:bg-white/5 rounded-xl border border-white/5 transition-all text-zinc-500 hover:text-white"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </button>
                    <div>
                        <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">{isGeneral ? 'General' : 'Academic'} Reading</span>
                            <span className="w-1 h-1 rounded-full bg-white/10" />
                            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Passage {activePassageIndex + 1} of 3</span>
                        </div>
                        <h1 className="text-xl lg:text-2xl font-black tracking-tight text-slate-50 line-clamp-1">
                            {activePassage.title}
                        </h1>
                    </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="bg-white/5 border border-white/10 px-4 py-2 rounded-xl flex items-center gap-3">
                        <Clock className={`w-4 h-4 ${timeRemaining < 300 ? 'text-red-400 animate-pulse' : 'text-indigo-400'}`} />
                        <span className={`text-sm font-bold tabular-nums ${timeRemaining < 300 ? 'text-red-400' : 'text-slate-300'}`}>
                            {formatTime(timeRemaining)}
                        </span>
                    </div>
                    {!result && (
                        <button
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all flex items-center gap-2 shadow-lg shadow-blue-500/20"
                        >
                            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                            Submit Test
                        </button>
                    )}
                </div>
            </header>

            <AnimatePresence mode="wait">
                {result ? (
                    <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
                        <ReadingResultPanel key="result" data={result} onReset={handleReset} />
                    </div>
                ) : (
                    <motion.div
                        key="practice"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex-1 flex flex-col gap-6 min-h-0 relative"
                    >

                        <div className="flex-1 overflow-y-auto custom-scrollbar lg:grid lg:grid-cols-2 gap-8 pr-2 space-y-8 lg:space-y-0 pb-10">
                            <div className="w-full shrink-0">
                                <ReadingPassage
                                    key={`passage-${activePassage.id}`}
                                    title={activePassage.title}
                                    content={activePassage.content}
                                />
                            </div>

                            <div className="w-full">
                                <div className="space-y-4">
                                    <QuestionNavigator
                                        totalQuestions={40}
                                        answers={answers}
                                        onNavigate={scrollToQuestion}
                                    />
                                    <div className="bento-card overflow-hidden">
                                        <QuestionSection
                                            questions={activePassage.questions}
                                            answers={answers}
                                            onAnswerChange={handleAnswerChange}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {isSubmitting && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 bg-zinc-950/80 backdrop-blur-md rounded-3xl z-50 flex flex-col items-center justify-center gap-6"
                            >
                                <div className="relative">
                                    <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
                                    <div className="absolute inset-0 bg-blue-500/20 blur-xl animate-pulse" />
                                </div>
                                <div className="text-center space-y-2">
                                    <h3 className="text-2xl font-black tracking-tight text-white">Evaluating Answers...</h3>
                                    <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">Processing your Reading Practice Test</p>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            {error && (
                <div className="fixed bottom-8 left-1/2 -translate-x-1/2 p-4 bg-red-500 text-white rounded-xl shadow-2xl flex items-center gap-3 z-[100]">
                    <p className="text-xs font-bold">{error}</p>
                    <button onClick={() => setError(null)} className="p-1 hover:bg-black/10 rounded-lg">
                        <ChevronLeft className="w-4 h-4 rotate-90" />
                    </button>
                </div>
            )}
        </div>
    );
}
