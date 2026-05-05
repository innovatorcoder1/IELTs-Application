import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ChevronLeft,
    CreditCard,
    ShieldCheck,
    Zap,
    Sparkles,
    Crown,
    Lock,
    CheckCircle2,
    Loader2,
    Calendar,
    ArrowRight
} from 'lucide-react';
import logo from '../assets/logo.png';

const planDetails = {
    "Free": {
        price: "0",
        icon: Zap,
        color: "text-zinc-400",
        bg: "bg-zinc-400/10"
    },
    "Pro": {
        price: "29",
        icon: Sparkles,
        color: "text-primary",
        bg: "bg-primary/10"
    },
    "Ultimate": {
        price: "79",
        icon: Crown,
        color: "text-purple-500",
        bg: "bg-purple-500/10"
    }
};

export default function Checkout() {
    const { planName } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [formData, setFormData] = useState({
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvc: ''
    });

    const plan = planDetails[planName as keyof typeof planDetails] || planDetails["Pro"];

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate payment processing
        setTimeout(() => {
            setIsLoading(false);
            setIsSuccess(true);
            setTimeout(() => {
                navigate('/app');
            }, 3000);
        }, 2500);
    };

    const formatCardNumber = (value: string) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];

        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }

        if (parts.length) {
            return parts.join(' ');
        } else {
            return value;
        }
    };

    return (
        <div className="min-h-screen bg-[#04070D] text-white selection:bg-primary selection:text-white pb-20">
            {/* Background Ambience */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-600/5 rounded-full blur-[120px]" />
            </div>

            {/* Header */}
            <header className="fixed top-0 w-full z-50 p-6 flex justify-between items-center bg-transparent backdrop-blur-sm">
                <Link to="/pricing" className="flex items-center gap-2 group no-underline">
                    <div className="p-2 rounded-xl bg-white/5 border border-white/10 group-hover:bg-blue-500/10 group-hover:border-blue-500/20 transition-all">
                        <ChevronLeft className="w-5 h-5 text-zinc-400 group-hover:text-blue-500" />
                    </div>
                    <span className="text-sm font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors uppercase tracking-widest hidden sm:block">Back to Pricing</span>
                </Link>
                <Link to="/" className="flex items-center gap-2 no-underline">
                    <img src={logo} alt="IELTS AI" className="w-8 h-8 object-contain" />
                    <span className="font-black text-lg tracking-tight text-white uppercase">IELTS AI</span>
                </Link>
                <div className="w-24 sm:w-32" />
            </header>

            <main className="pt-32 container mx-auto px-6 relative z-10">
                <AnimatePresence mode="wait">
                    {!isSuccess ? (
                        <motion.div
                            key="checkout-form"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12"
                        >
                            {/* Form Section */}
                            <div className="lg:col-span-7">
                                <h1 className="text-3xl font-black mb-8 uppercase tracking-tight">Complete your <span className="text-zinc-500">Upgrade.</span></h1>

                                <form onSubmit={handlePayment} className="space-y-8">
                                    <div className="bento-card p-8 bg-zinc-900/40 border-white/5 backdrop-blur-xl">
                                        <div className="flex items-center gap-3 mb-8">
                                            <div className="p-2 rounded-lg bg-blue-500/10 border border-blue-500/20">
                                                <CreditCard className="w-5 h-5 text-blue-400" />
                                            </div>
                                            <h3 className="font-bold text-sm uppercase tracking-widest text-zinc-300">Payment Information</h3>
                                        </div>

                                        <div className="space-y-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Cardholder Name</label>
                                                <input
                                                    type="text"
                                                    required
                                                    value={formData.cardName}
                                                    onChange={(e) => setFormData({ ...formData, cardName: e.target.value })}
                                                    placeholder="John Doe"
                                                    className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm"
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Card Number</label>
                                                <div className="relative group">
                                                    <input
                                                        type="text"
                                                        required
                                                        maxLength={19}
                                                        value={formData.cardNumber}
                                                        onChange={(e) => setFormData({ ...formData, cardNumber: formatCardNumber(e.target.value) })}
                                                        placeholder="0000 0000 0000 0000"
                                                        className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 px-6 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm tracking-[0.2em]"
                                                    />
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex gap-2">
                                                        <div className="w-8 h-5 bg-white/10 rounded border border-white/10" />
                                                        <div className="w-8 h-5 bg-white/10 rounded border border-white/10" />
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">Expiry Date</label>
                                                    <div className="relative">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                        <input
                                                            type="text"
                                                            required
                                                            placeholder="MM/YY"
                                                            maxLength={5}
                                                            value={formData.expiry}
                                                            onChange={(e) => setFormData({ ...formData, expiry: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm"
                                                        />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 ml-1">CVC / CVV</label>
                                                    <div className="relative">
                                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
                                                        <input
                                                            type="password"
                                                            required
                                                            placeholder="***"
                                                            maxLength={3}
                                                            value={formData.cvc}
                                                            onChange={(e) => setFormData({ ...formData, cvc: e.target.value })}
                                                            className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-zinc-600 outline-none focus:border-blue-500/50 focus:bg-blue-500/5 transition-all font-medium text-sm"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-col sm:flex-row items-center gap-6">
                                        <button
                                            type="submit"
                                            disabled={isLoading}
                                            className="flex-1 w-full btn-modern btn-primary-modern py-5 text-base font-black flex items-center justify-center gap-3 transition-all relative overflow-hidden group shadow-2xl shadow-primary/20"
                                        >
                                            <AnimatePresence mode="wait">
                                                {isLoading ? (
                                                    <motion.div
                                                        key="loading"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <Loader2 className="w-5 h-5 animate-spin" />
                                                        <span>Processing Securely...</span>
                                                    </motion.div>
                                                ) : (
                                                    <motion.div
                                                        key="ready"
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        exit={{ opacity: 0 }}
                                                        className="flex items-center gap-2"
                                                    >
                                                        <span>Pay ${plan.price}.00 Now</span>
                                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </button>
                                        <div className="flex items-center gap-2 text-zinc-500">
                                            <ShieldCheck className="w-4 h-4 text-emerald-500" />
                                            <span className="text-[10px] font-black uppercase tracking-widest shrink-0">Encrypted AES-256</span>
                                        </div>
                                    </div>
                                </form>
                            </div>

                            {/* Summary Section */}
                            <div className="lg:col-span-5">
                                <div className="sticky top-32 space-y-6">
                                    <div className="bento-card p-8 bg-zinc-900/60 border-primary/20 relative overflow-hidden">
                                        <div className="absolute top-0 right-0 p-4">
                                            <plan.icon className={`w-12 h-12 ${plan.color} opacity-10`} />
                                        </div>

                                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-6">Order Summary</h3>

                                        <div className="flex items-start justify-between mb-8">
                                            <div>
                                                <h2 className="text-3xl font-black flex items-center gap-3">
                                                    {planName} <span className="text-sm font-medium text-zinc-500">Edition</span>
                                                </h2>
                                                <p className="text-zinc-500 text-sm mt-1">Billed monthly. Cancel anytime.</p>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-3xl font-black">${plan.price}</span>
                                                <span className="text-xs text-zinc-500 block">per month</span>
                                            </div>
                                        </div>

                                        <div className="border-t border-white/5 pt-6 space-y-4">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-400 font-medium tracking-wide">Subtotal</span>
                                                <span className="font-bold">${plan.price}.00</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-zinc-400 font-medium tracking-wide">License Fee</span>
                                                <span className="text-emerald-500 font-bold">$0.00</span>
                                            </div>
                                            <div className="border-t border-white/5 pt-4 flex justify-between items-baseline">
                                                <span className="text-white font-black uppercase text-xs tracking-widest">Total Amount</span>
                                                <span className="text-4xl font-black text-primary">${plan.price}.00</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="p-6 rounded-2xl bg-white/5 border border-white/5">
                                        <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-4 flex items-center gap-2">
                                            <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                            Immediate Benefits
                                        </h4>
                                        <ul className="space-y-2">
                                            {["Full Engine Access", "Priority Neural Queue", "Instant Score Reports"].map((item) => (
                                                <li key={item} className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                                    <span className="w-1 h-1 rounded-full bg-zinc-700" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto text-center py-20"
                        >
                            <div className="w-24 h-24 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-emerald-500/20">
                                <CheckCircle2 className="w-12 h-12 text-emerald-400" />
                            </div>
                            <h1 className="text-5xl font-black mb-6 uppercase tracking-tight italic">Success!</h1>
                            <p className="text-zinc-400 text-xl font-medium mb-12">
                                Your account has been upgraded to <span className="text-white font-bold">{planName}</span>.
                                Redirecting you to the neural engine dashboard now...
                            </p>
                            <div className="flex items-center justify-center gap-4">
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-75" />
                                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse delay-150" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
