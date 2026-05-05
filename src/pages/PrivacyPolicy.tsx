import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';

export default function PrivacyPolicy() {
    const sections = [
        {
            title: "Information Collection",
            icon: Eye,
            content: "We collect information you provide directly to us, such as when you create an account, submit writing tasks for evaluation, or participate in speaking practice sessions. This includes your name, email, and voice recordings."
        },
        {
            title: "AI Processing & Training",
            icon: Shield,
            content: "Our IELTS Neural Engine (INE) processes your submissions to provide real-time feedback. While we use anonymized data to improve our models, your personal identity is never linked to the training datasets without explicit consent."
        },
        {
            title: "Data Security",
            icon: Lock,
            content: "We implement state-of-the-art encryption and security protocols to protect your data. Voice recordings and essay submissions are stored in encrypted buckets with restricted access."
        },
        {
            title: "User Rights",
            icon: FileText,
            content: "Under GDPR and other privacy frameworks, you have the right to access, rectify, or delete your personal data. You can request a full export of your practice history at any time from the Settings menu."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[60vw] h-[60vw] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-0 right-1/4 w-[50vw] h-[50vw] bg-purple-600/5 rounded-full blur-[120px]" />
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
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">Privacy <br /><span className="text-zinc-500">Policy.</span></h1>
                    <p className="text-zinc-400 text-lg mb-16 leading-relaxed max-w-2xl">
                        At IELTS AI, we take your data as seriously as your band score. This policy outlines how we handle your information in the age of neural coaching.
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
                        Last updated: March 25, 2024. For any questions, contact us at <span className="text-primary hover:underline cursor-pointer">info@arteanalytics.com</span>
                    </p>
                </div>
            </div>
        </div>
    );
}
