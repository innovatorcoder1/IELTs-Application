import { motion } from 'framer-motion';
import { Check, Sparkles, Zap, Shield, Crown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const pricingPlans = [
    {
        name: "Free",
        price: "0",
        description: "Perfect for getting started with AI-powered IELTS prep.",
        features: [
            "Daily AI Writing evaluation (1 task)",
            "10-min AI Speaking session",
            "Basic Reading & Listening modules",
            "Band score estimation",
            "Community Support"
        ],
        btnText: "Get Started",
        btnLink: "/app",
        icon: Zap,
        color: "text-zinc-400"
    },
    {
        name: "Pro",
        price: "29",
        description: "The most popular choice for serious candidates aiming for Band 8+.",
        features: [
            "Unlimited AI Writing evaluations",
            "Unlimited AI Speaking practice",
            "Advanced 'Trap Detection' AI",
            "Personalized study roadmap",
            "Detailed 'Neural Verdict' reports",
            "Priority AI processing"
        ],
        btnText: "Start Pro Trial",
        btnLink: "/app",
        icon: Sparkles,
        color: "text-primary",
        recommended: true
    },
    {
        name: "Ultimate",
        price: "79",
        description: "Concierge-level support with human-in-the-loop validation.",
        features: [
            "Everything in Pro",
            "2x Human examiner essay reviews",
            "1x Mock Speaking test with ex-examiner",
            "24/7 Premium Discord access",
            "University application consulting",
            "Lifetime access to archives"
        ],
        btnText: "Go Ultimate",
        btnLink: "/app",
        icon: Crown,
        color: "text-purple-500"
    }
];

export default function Pricing() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[50vw] h-[50vw] bg-primary/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[20%] w-[40vw] h-[40vw] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            <Header />

            <main className="pt-40 pb-20 container mx-auto px-8 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex py-1 px-3 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-bold mb-6"
                    >
                        PRICING PLANS
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight mb-6"
                    >
                        Invest in your <br /><span className="text-zinc-500">Global Future.</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-zinc-400 text-lg max-w-2xl mx-auto"
                    >
                        Choose the plan that fits your ambition. From self-paced prep to full concierge coaching, we have you covered.
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {pricingPlans.map((plan, idx) => (
                        <motion.div
                            key={plan.name}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (idx + 1) }}
                            className={`bento-card p-10 flex flex-col h-full relative ${plan.recommended ? 'border-primary/40 bg-zinc-900/50 scale-105 z-10' : 'bg-zinc-900/20'}`}
                        >
                            {plan.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-lg shadow-primary/20">
                                    Recommended
                                </div>
                            )}

                            <div className="mb-8">
                                <plan.icon className={`w-10 h-10 ${plan.color} mb-6`} />
                                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-4xl font-black">${plan.price}</span>
                                    <span className="text-zinc-500 text-sm font-medium">/month</span>
                                </div>
                                <p className="text-zinc-500 text-sm mt-4 leading-relaxed">
                                    {plan.description}
                                </p>
                            </div>

                            <div className="flex-1 space-y-4 mb-10">
                                {plan.features.map((feature) => (
                                    <div key={feature} className="flex items-start gap-3">
                                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center shrink-0 mt-0.5">
                                            <Check className="w-3 h-3 text-zinc-400" />
                                        </div>
                                        <span className="text-sm text-zinc-400">{feature}</span>
                                    </div>
                                ))}
                            </div>

                            <Link
                                to={`/checkout/${plan.name}`}
                                className={`btn-modern w-full py-4 text-sm ${plan.recommended ? 'btn-primary-modern shadow-xl shadow-primary/10' : 'btn-outline-modern'}`}
                            >
                                {plan.btnText}
                                <ArrowRight className="w-4 h-4" />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* FAQ Preview */}
                <div className="mt-40 text-center max-w-2xl mx-auto">
                    <Shield className="w-12 h-12 text-zinc-700 mx-auto mb-8" />
                    <h3 className="text-2xl font-bold mb-4">Secure & Simple</h3>
                    <p className="text-zinc-500 text-sm leading-relaxed">
                        All plans include a 7-day money-back guarantee. Cancel anytime with a single click from your dashboard. No hidden fees, no long-term contracts.
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}
