import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard,
    PenTool,
    Mic,
    Headphones,
    BarChart3,
    HelpCircle,
    Settings as SettingsIcon,
    BookOpen,
    X,
    Zap,
} from 'lucide-react';
import logo from '../assets/logo.png';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, LucideIcon } from 'lucide-react';
import { useState, useEffect } from 'react';

interface SidebarItem {
    name: string;
    icon: LucideIcon;
    path: string;
    hasSubItems?: boolean;
}

interface SidebarGroup {
    group: string;
    items: SidebarItem[];
}

const sidebarItems: SidebarGroup[] = [
    {
        group: 'Main', items: [
            { name: 'Dashboard', icon: LayoutDashboard, path: '/app' },
            { name: 'Analytics', icon: BarChart3, path: '/app/analytics' },
        ]
    },
    {
        group: 'Practice Modules', items: [
            {
                name: 'Writing',
                icon: PenTool,
                path: '/app/writing',
                hasSubItems: true
            },
            {
                name: 'Speaking',
                icon: Mic,
                path: '/app/speaking',
                hasSubItems: true
            },
            {
                name: 'Listening',
                icon: Headphones,
                path: '/app/listening',
                hasSubItems: true
            },
            {
                name: 'Reading',
                icon: BookOpen,
                path: '/app/reading',
                hasSubItems: true
            },
        ]
    },
    {
        group: 'Resources', items: [
            { name: 'IELTS Rules', icon: HelpCircle, path: '/rules' },
        ]
    }
];

export default function Sidebar({ isOpen, onClose }: { isOpen?: boolean; onClose?: () => void }) {
    const location = useLocation();
    const [isUpgradeVisible, setIsUpgradeVisible] = useState(() => {
        return localStorage.getItem('ielts_upgrade_dismissed') !== 'true';
    });

    const handleDismissUpgrade = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsUpgradeVisible(false);
        localStorage.setItem('ielts_upgrade_dismissed', 'true');
    };

    // Close sidebar on route change (mobile)
    useEffect(() => {
        if (window.innerWidth < 1024 && onClose) onClose();
    }, [location.pathname]);

    return (
        <>
            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] lg:hidden"
                    />
                )}
            </AnimatePresence>

            <aside
                style={{ background: '#060A12', borderRight: '1px solid rgba(255,255,255,0.03)' }}
                className={`w-64 flex flex-col h-screen fixed lg:sticky top-0 left-0 shrink-0 shadow-2xl z-[70] transition-transform duration-300 lg:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
                    }`}
            >
                {/* Logo & Close */}
                <div className="px-6 py-7 flex items-center justify-between border-b"
                    style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    <Link to="/" className="flex items-center gap-2 group no-underline">
                        <img src={logo} alt="IELTS AI" className="w-8 h-8 object-contain" />
                        <span className="font-black text-lg tracking-tight text-slate-50 uppercase italic">IELTS AI</span>
                    </Link>
                    <button
                        onClick={onClose}
                        className="lg:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-zinc-500 hover:text-white transition-colors"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>

                {/* Nav */}
                <nav className="flex-1 px-3 py-6 space-y-6 overflow-y-auto">
                    {sidebarItems.map((group) => (
                        <div key={group.group}>
                            <p className="px-3 text-[10px] font-black uppercase tracking-widest mb-3"
                                style={{ color: 'rgba(160,175,210,0.45)' }}>
                                {group.group}
                            </p>
                            <div className="space-y-0.5">
                                {group.items.map((item) => {
                                    const active = location.pathname.startsWith(item.path);
                                    const [itemOpen, setItemOpen] = useState(active);

                                    return (
                                        <div key={item.path} className="space-y-0.5">
                                            <Link
                                                to={item.hasSubItems ? `${item.path}/academic` : item.path}
                                                className="block no-underline"
                                                onClick={() => item.hasSubItems && setItemOpen(!itemOpen)}
                                            >
                                                <motion.div
                                                    whileHover={{ x: 3 }}
                                                    style={active ? {
                                                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))',
                                                        borderLeft: '3px solid #6366F1',
                                                        color: '#F8FAFC',
                                                    } : {
                                                        color: '#94A3B8',
                                                        borderLeft: '3px solid transparent',
                                                    }}
                                                    className="flex items-center justify-between gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-sm font-semibold"
                                                >
                                                    <div className="flex items-center gap-3">
                                                        <item.icon className="w-4 h-4 shrink-0" />
                                                        <span>{item.name}</span>
                                                    </div>
                                                    {item.hasSubItems && (
                                                        <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${itemOpen ? 'rotate-180' : ''}`} />
                                                    )}
                                                </motion.div>
                                            </Link>

                                            <AnimatePresence>
                                                {item.hasSubItems && itemOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="overflow-hidden ml-4 space-y-0.5"
                                                    >
                                                        {[
                                                            { name: 'Academic', path: `${item.path}/academic` },
                                                            { name: 'General', path: `${item.path}/general` }
                                                        ].map((sub) => {
                                                            const subActive = location.pathname === sub.path;
                                                            return (
                                                                <Link key={sub.path} to={sub.path} className="block no-underline">
                                                                    <div
                                                                        className="px-4 py-2 rounded-xl text-xs font-bold transition-all"
                                                                        style={subActive ? {
                                                                            color: '#6366F1',
                                                                            background: 'rgba(99,102,241,0.05)'
                                                                        } : {
                                                                            color: 'rgba(148,163,184,0.6)',
                                                                        }}
                                                                    >
                                                                        {sub.name}
                                                                    </div>
                                                                </Link>
                                                            );
                                                        })}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </nav>

                {/* Upgrade Pro Card */}
                <AnimatePresence>
                    {isUpgradeVisible && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="px-4 py-4 mt-auto overflow-hidden"
                        >
                            <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-br from-indigo-600 to-purple-700 group cursor-pointer transition-all hover:scale-[1.02]">
                                <button
                                    onClick={handleDismissUpgrade}
                                    className="absolute top-3 right-3 z-20 p-1.5 rounded-lg bg-white/10 text-white/50 hover:text-white hover:bg-white/20 transition-all border border-white/10"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                                <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl -mr-12 -mt-12 transition-transform group-hover:scale-110" />
                                <div className="relative z-10 space-y-4">
                                    <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center">
                                        <Zap className="w-5 h-5 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-bold text-white mb-1">Unlock Pro Access</h4>
                                        <p className="text-[10px] text-indigo-100 font-medium leading-relaxed">
                                            Get unlimited sessions & deep AI diagnostics.
                                        </p>
                                    </div>
                                    <Link to="/pricing" className="block text-center py-2.5 bg-white text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-50 transition-all no-underline shadow-lg shadow-black/10">
                                        Upgrade now
                                    </Link>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer */}
                <div className="px-3 py-5 border-t space-y-0.5" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                    {[
                        { icon: SettingsIcon, label: 'Settings', path: '/app/settings' },
                        { icon: HelpCircle, label: 'Help Center', path: '/app/help' }
                    ].map(({ icon: Icon, label, path }) => {
                        const active = location.pathname === path;
                        return (
                            <Link key={label} to={path} className="block no-underline">
                                <div
                                    className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
                                    style={active ? {
                                        background: 'rgba(255,255,255,0.05)',
                                        color: '#A8BFFF',
                                    } : {
                                        color: 'rgba(160,175,210,0.5)',
                                    }}
                                >
                                    <Icon className="w-4 h-4" />
                                    {label}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </aside>
        </>
    );
}
