import { motion } from 'framer-motion';
import {
    HelpCircle,
    MessageCircle,
    Mail,
    ExternalLink,
    Search,
    Book,
    Video,
    LifeBuoy,
    ChevronRight,
    ArrowRight,
    BookOpen,
    BarChart3,
    PenTool,
    Mic,
    Headphones,
    Star
} from 'lucide-react';

const faqs = [
    {
        question: "How do I start a practice session?",
        answer: "Navigate to any practice module (Writing, Speaking, etc.) from the sidebar and click the 'Start Practice' button."
    },
    {
        question: "Is the AI feedback accurate?",
        answer: "Our AI is calibrated to official IELTS Band Descriptors, providing highly accurate estimates and detailed structural feedback."
    },
    {
        question: "Can I track my progress over time?",
        answer: "Yes, the Analytics dashboard provides detailed insights into your performance across all modules."
    },
    {
        question: "How do I upgrade to a premium plan?",
        answer: "Visit the Pricing page to compare plans and choose the one that best fits your needs."
    }
];

const guidanceArticles = [
    {
        title: "Mastering IELTS Writing Task 1",
        description: "Learn how to describe charts, graphs, and processes like a pro with our expert data interpretation guide.",
        category: "Writing",
        icon: BarChart3,
        color: "text-emerald-400",
        bg: "bg-emerald-400/10"
    },
    {
        title: "Speaking Success Tips",
        description: "Discover the secrets to a high band score in the speaking module, from fluency to pronunciation precision.",
        category: "Speaking",
        icon: Mic,
        color: "text-blue-400",
        bg: "bg-blue-400/10"
    },
    {
        title: "Reading: Skimming & Scanning",
        description: "Master the essential techniques to find information quickly and accurately in complex academic texts.",
        category: "Reading",
        icon: BookOpen,
        color: "text-indigo-400",
        bg: "bg-indigo-400/10"
    },
    {
        title: "Listening Focus Strategies",
        description: "Improve your ability to catch every detail in conversations and lectures with our focused listening guide.",
        category: "Listening",
        icon: Headphones,
        color: "text-cyan-400",
        bg: "bg-cyan-400/10"
    },
    {
        title: "Understanding AI Feedback",
        description: "Get a deep dive into how our AI evaluates your performance and how to interpret your band score estimates.",
        category: "System",
        icon: Star,
        color: "text-amber-400",
        bg: "bg-amber-400/10"
    }
];

const supportChannels = [
    {
        icon: MessageCircle,
        title: "Live Chat",
        description: "Chat with our support team in real-time.",
        action: "Start Chat",
        link: "#",
        color: "text-blue-500",
        bg: "bg-blue-500/10"
    },
    {
        icon: Mail,
        title: "Email Support",
        description: "Send us an email and we'll reply within 24 hours.",
        action: "Send Email",
        link: "mailto:info@arteanalytics.com",
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    },
    {
        icon: ExternalLink,
        title: "Community",
        description: "Join our Discord community for tips and tricks.",
        action: "Join Discord",
        link: "https://discord.gg/arteanalytics",
        color: "text-emerald-500",
        bg: "bg-emerald-500/10"
    }
];

export default function HelpCenter() {
    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8 pt-12">
            <div className="max-w-5xl mx-auto">
                {/* Header Section */}
                <div className="mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20">
                                <HelpCircle className="w-6 h-6 text-indigo-400" />
                            </div>
                            <h1 className="text-4xl font-bold tracking-tight text-white italic uppercase italic">Help <span className="text-slate-500">Center</span></h1>
                        </div>
                        <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
                            Need help with your IELTS preparation? Explore our resources or reach out to our support team.
                        </p>
                    </motion.div>

                    {/* Search Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="mt-10 relative max-w-xl"
                    >
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search for articles, guides..."
                            className="w-full bg-slate-900/50 border border-slate-800 rounded-2xl py-4 pl-12 pr-4 text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                        />
                    </motion.div>
                </div>

                {/* Quick Resources */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {[
                        { icon: Book, title: "User Guides", count: "12 articles" },
                        { icon: Video, title: "Video Tutorials", count: "8 modules" },
                        { icon: LifeBuoy, title: "Technical Support", count: "24/7 active" }
                    ].map((item, idx) => (
                        <motion.div
                            key={item.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:border-indigo-500/30 transition-all cursor-pointer group"
                        >
                            <div className="p-3 rounded-2xl bg-slate-800 w-fit mb-4 group-hover:bg-indigo-500/10 transition-colors">
                                <item.icon className="w-6 h-6 text-slate-400 group-hover:text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-bold text-white mb-1">{item.title}</h3>
                            <p className="text-sm text-slate-500">{item.count}</p>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Section */}
                <div className="mb-20">
                    <h2 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                        Frequently Asked Questions
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {faqs.map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 + idx * 0.1 }}
                                className="p-6 rounded-3xl bg-slate-900/20 border border-slate-800/50"
                            >
                                <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                                <p className="text-slate-400 text-sm leading-relaxed">{faq.answer}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Guidance Articles Section */}
                <div className="mb-20">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                            User Guidance Articles
                        </h2>
                        <button className="text-indigo-400 text-sm font-bold flex items-center gap-2 hover:text-indigo-300 transition-colors">
                            View All Articles <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {guidanceArticles.map((article, idx) => (
                            <motion.div
                                key={article.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + idx * 0.1 }}
                                className="p-6 rounded-3xl bg-slate-900/30 border border-slate-800/50 hover:bg-slate-900/50 transition-all group cursor-pointer"
                            >
                                <div className={`w-12 h-12 rounded-2xl ${article.bg} ${article.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                                    <article.icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-3">
                                    <span className={`text-[10px] font-black uppercase tracking-widest ${article.color}`}>
                                        {article.category}
                                    </span>
                                    <h3 className="text-xl font-bold text-white leading-tight">{article.title}</h3>
                                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-2">
                                        {article.description}
                                    </p>
                                </div>
                                <div className="mt-6 pt-6 border-t border-slate-800/50 flex items-center justify-between text-indigo-400 text-xs font-bold uppercase tracking-widest">
                                    <span>Read Article</span>
                                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Contact Section */}
                <div className="mt-20 border-t border-slate-800/50 pt-20 pb-20">
                    <div className="text-center max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl font-bold text-white mb-4 italic uppercase italic">Still Need <span className="text-slate-500">Help?</span></h2>
                        <p className="text-slate-400">Our support team is here to assist you with any questions you may have.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {supportChannels.map((channel, idx) => (
                            <motion.div
                                key={channel.title}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 + idx * 0.1 }}
                                className="p-8 rounded-3xl bg-slate-900/30 border border-slate-800/50 text-center"
                            >
                                <div className={`w-14 h-14 rounded-2xl ${channel.bg} ${channel.color} flex items-center justify-center mx-auto mb-6`}>
                                    <channel.icon className="w-7 h-7" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{channel.title}</h3>
                                <p className="text-slate-400 text-sm mb-8 leading-relaxed">
                                    {channel.description}
                                </p>
                                <a
                                    href={channel.link}
                                    target={channel.link.startsWith('http') ? "_blank" : undefined}
                                    rel={channel.link.startsWith('http') ? "noopener noreferrer" : undefined}
                                    className="w-full py-3 px-6 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold flex items-center justify-center gap-2 transition-all no-underline"
                                >
                                    {channel.action}
                                    <ChevronRight className="w-4 h-4" />
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
