import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import {
    BookOpen,
    Mic2,
    Headphones,
    PenTool,
    AlertCircle,
    ClipboardCheck,
    Gavel,
    ArrowRight
} from 'lucide-react';
import Footer from '../components/Footer';

const ruleSections = [
    {
        title: "General Regulations",
        icon: Gavel,
        color: "text-zinc-400",
        rules: [
            "Valid original Passport or ID required on test day.",
            "Arrival time: 30 minutes before the test starts.",
            "Forbidden items: Mobile phones, watches, bags, and any electronics.",
            "Only water in a transparent, label-free bottle is allowed.",
            "No talking or disruption during the test sessions."
        ]
    },
    {
        title: "Listening Module",
        icon: Headphones,
        color: "text-blue-500",
        rules: [
            "Total duration: 30 minutes + 10 minutes transfer time (Paper).",
            "Answers must be written strictly on the Answer Sheet.",
            "Spelling and grammar are critical—incorrect spelling loses the mark.",
            "Minor capitalization errors are generally accepted (e.g., 'london' vs 'London').",
            "Listen for numbers, dates, and names carefully—they are high-frequency targets."
        ]
    },
    {
        title: "Reading Module",
        icon: BookOpen,
        color: "text-emerald-500",
        rules: [
            "Total duration: 60 minutes (no extra transfer time).",
            "Academic vs General: Academic has long, complex texts; General has social/workplace texts.",
            "Word limit rules: 'NO MORE THAN THREE WORDS' means literal adherence.",
            "True/False/Not Given requires strict evidence—don't infer beyond the text.",
            "Skimming and scanning are essential strategies to manage time."
        ]
    },
    {
        title: "Writing Module",
        icon: PenTool,
        color: "text-primary",
        rules: [
            "Task 1: 150 words minimum (20 mins recommended).",
            "Task 2: 250 words minimum (40 mins recommended).",
            "Word count penalty: Under-length responses will be penalized.",
            "Off-topic or memorized answers will receive Band 0 for that section.",
            "Structure: Introduction, Overview/Body Paragraphs, and Conclusion are vital."
        ]
    },
    {
        title: "Speaking Module",
        icon: Mic2,
        color: "text-purple-500",
        rules: [
            "ID Check: You must show the same ID used for registration.",
            "The test is recorded for quality and assessment purposes.",
            "Part 1: General questions about yourself (4-5 mins).",
            "Part 2: Long turn (1-2 mins talk) on a cue card prompt.",
            "Part 3: Abstract discussion (4-5 mins)—depth over simplicity."
        ]
    }
];

export default function Rules() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            <Header />
            {/* Background Decor */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            <main className="container mx-auto px-8 pt-32 pb-20 relative z-10">
                <div className="max-w-4xl mx-auto mb-20 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 text-xs font-bold text-zinc-400 mb-6"
                    >
                        <AlertCircle className="w-3 h-3 text-primary" />
                        OFFICIAL GUIDELINES
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
                    >
                        IELTS Rules & <br /><span className="text-zinc-500">Regulations.</span>
                    </motion.h1>
                    <p className="text-zinc-400 text-lg leading-relaxed">
                        Mastering the content is only half the battle. Understanding the technical rules and scoring criteria is essential for achieving a high band score.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {ruleSections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className={`bento-card p-10 ${idx === 0 ? 'md:col-span-2 bg-zinc-900/40 border-primary/20' : 'bg-zinc-900/20'}`}
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className={`w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center`}>
                                    <section.icon className={`w-6 h-6 ${section.color}`} />
                                </div>
                                <h2 className="text-2xl font-bold tracking-tight">{section.title}</h2>
                            </div>

                            <ul className="space-y-4">
                                {section.rules.map((rule, rIdx) => (
                                    <li key={rIdx} className="flex items-start gap-4">
                                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                            <div className={`w-1.5 h-1.5 rounded-full ${section.color.replace('text-', 'bg-')}`} />
                                        </div>
                                        <span className="text-zinc-400 text-sm leading-relaxed">{rule}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    ))}
                </div>

                {/* Important Note */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mt-20 max-w-4xl mx-auto p-10 bento-card border-purple-500/20 bg-gradient-to-br from-zinc-900/50 to-black rounded-3xl"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <ClipboardCheck className="w-8 h-8 text-purple-500" />
                        <h3 className="text-2xl font-bold">Preparation Strategy</h3>
                    </div>
                    <p className="text-zinc-400 leading-relaxed mb-8">
                        The IELTS test assessment remains the same regardless of whether you take it on paper or computer. Our AI models are strictly calibrated to the <strong>Public Band Descriptors</strong> used by official examiners. Focus on consistency, lexical resource, and grammatical range.
                    </p>
                    <Link to="/app" className="btn-modern btn-primary-modern inline-flex">
                        Start Practice Session
                        <ArrowRight className="w-4 h-4" />
                    </Link>
                </motion.div>
            </main>

            <Footer />
        </div>
    );
}
