import { motion } from 'framer-motion';
import { Scale, ShieldCheck, UserCheck, AlertCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function TermsOfService() {
    const sections = [
        {
            title: "Acceptance of Terms",
            icon: UserCheck,
            content: "By accessing and using IELTS AI, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use the platform. We reserve the right to update these terms at any time."
        },
        {
            title: "User Accounts",
            icon: ShieldCheck,
            content: "You are responsible for maintaining the confidentiality of your account credentials. All activities under your account are your responsibility. We reserve the right to terminate accounts that violate our community guidelines."
        },
        {
            title: "Subscription & Fees",
            icon: Scale,
            content: "Access to certain features requires a paid subscription. All fees are non-refundable unless specified otherwise (e.g., our 7-day money-back guarantee). Subscriptions renew automatically unless cancelled."
        },
        {
            title: "AI Disclaimer",
            icon: AlertCircle,
            content: "Our AI provides evaluations based on neural models trained on human scoring patterns. While highly accurate, these are estimations and do not guarantee official IELTS results. We are not affiliated with the British Council, IDP, or Cambridge."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 right-1/4 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 left-1/4 w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            <Header />

            <div className="container max-w-4xl pt-40 relative z-10 px-8">
                <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Home
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Terms of <br /><span className="text-zinc-500">Service.</span></h1>
                    <p className="text-zinc-400 text-lg mb-16 leading-relaxed max-w-2xl">
                        Welcome to IELTS AI. These terms govern your use of our neural coaching platform and services.
                    </p>
                </motion.div>

                <div className="space-y-12">
                    {sections.map((section, idx) => (
                        <motion.div
                            key={section.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="bento-card p-10 bg-zinc-900/20 border-white/5"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <section.icon className="w-8 h-8 text-primary" />
                                <h2 className="text-2xl font-bold">{section.title}</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed text-lg">
                                {section.content}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 p-10 rounded-3xl border border-dashed border-white/10 text-center">
                    <p className="text-zinc-500 italic text-sm">
                        Last updated: March 25, 2024. For any legal inquiries, contact us at <span className="text-primary hover:underline cursor-pointer">info@arteanalytics.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
