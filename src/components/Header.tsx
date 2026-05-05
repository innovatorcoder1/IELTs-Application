import { Link, useLocation } from 'react-router-dom';
import { BookMarked, Search, Command, Bell, Menu, Info, TrendingUp, UserCheck, X } from 'lucide-react';
import logo from '../assets/logo.png';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export default function Header({ onToggleSidebar }: { onToggleSidebar?: () => void }) {
    const location = useLocation();
    const isApp = location.pathname.startsWith('/app');
    const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
    const notificationRef = useRef<HTMLDivElement>(null);

    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'update',
            title: 'New AI Model v2.5',
            message: 'Improved speaking analysis is now live.',
            time: '2 mins ago',
            unread: true,
            icon: Info,
            color: '#6C8EF5'
        },
        {
            id: 2,
            type: 'profile',
            title: 'Profile Updated',
            message: 'Your personal information was successfully updated.',
            time: '1 hour ago',
            unread: true,
            icon: UserCheck,
            color: '#34D399'
        },
        {
            id: 3,
            type: 'performance',
            title: 'Score Milestone!',
            message: 'Your estimated band score reached 7.5.',
            time: '5 hours ago',
            unread: false,
            icon: TrendingUp,
            color: '#8B5CF6'
        }
    ]);

    const unreadCount = notifications.filter(n => n.unread).length;

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setIsNotificationsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })));
    };

    const scrollToSection = (id: string) => {
        if (location.pathname !== '/') { window.location.href = `/#${id}`; return; }
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <nav style={{
            background: 'rgba(4,7,13,0.85)',
            backdropFilter: 'blur(32px)',
            WebkitBackdropFilter: 'blur(32px)',
            borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
            className={`${isApp ? 'sticky' : 'fixed'} top-0 w-full z-50 h-16 flex items-center`}
        >
            <div className={`${isApp ? 'px-4 md:px-8 w-full' : 'container mx-auto px-4 md:px-8'} flex justify-between items-center`}>

                {/* Left */}
                <div className="flex items-center gap-3 md:gap-8">
                    {isApp && (
                        <button
                            onClick={onToggleSidebar}
                            className="lg:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-zinc-400 hover:text-white transition-colors"
                        >
                            <Menu className="w-5 h-5" />
                        </button>
                    )}
                    {!isApp && (
                        <Link to="/" className="flex items-center gap-2 no-underline group shrink-0">
                            <img src={logo} alt="IELTS AI" className="w-6 h-6 md:w-8 md:h-8 object-contain" />
                            <span className="font-black text-sm md:text-lg tracking-tight" style={{ color: '#F0F4FF' }}>IELTS AI</span>
                        </Link>
                    )}

                    {/* Desktop nav links */}
                    {!isApp && (
                        <div className="hidden lg:flex gap-6 text-sm font-medium" style={{ color: 'rgba(160,175,210,0.7)' }}>
                            {['features', 'methodology', 'results'].map(id => (
                                <button key={id} onClick={() => scrollToSection(id)}
                                    className="capitalize bg-transparent border-none cursor-pointer transition-colors"
                                    style={{ color: 'inherit', fontFamily: 'inherit', fontSize: 'inherit' }}
                                    onMouseEnter={e => (e.currentTarget.style.color = '#E2E8F5')}
                                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(160,175,210,0.7)')}
                                >
                                    {id}
                                </button>
                            ))}
                            <Link to="/pricing" className="no-underline transition-colors"
                                style={{ color: 'rgba(160,175,210,0.7)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#E2E8F5')}
                                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(160,175,210,0.7)')}
                            >Pricing</Link>
                        </div>
                    )}

                    {/* App search bar */}
                    {isApp && (
                        <div className="flex items-center gap-4">
                            <Link to="/app" className="items-center gap-2 no-underline group hidden sm:flex">
                                <img src={logo} alt="IELTS AI" className="w-6 h-6 object-contain" />
                                <span className="font-black text-sm tracking-tight" style={{ color: '#F0F4FF' }}>IELTS AI</span>
                            </Link>
                            <div className="hidden md:flex items-center gap-3 px-3 py-2 rounded-xl w-64"
                                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                                <Search className="w-4 h-4 shrink-0" style={{ color: 'rgba(160,175,210,0.5)' }} />
                                <input type="text" placeholder="Search practice tests..."
                                    className="bg-transparent border-none outline-none flex-1 text-sm font-medium w-full"
                                    style={{ color: '#C8D5F0', caretColor: '#6C8EF5' }}
                                />
                                <div className="hidden lg:flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px]"
                                    style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(160,175,210,0.5)', border: '1px solid rgba(255,255,255,0.08)' }}>
                                    <Command className="w-2.5 h-2.5" /><span>K</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Right */}
                <div className="flex items-center gap-2 md:gap-3">
                    <Link to="/rules"
                        className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold no-underline transition-all"
                        style={location.pathname === '/rules'
                            ? { background: 'linear-gradient(135deg,#6C8EF5,#8B5CF6)', color: '#fff' }
                            : { background: 'rgba(255,255,255,0.05)', color: 'rgba(160,175,210,0.7)', border: '1px solid rgba(255,255,255,0.08)' }
                        }
                    >
                        <BookMarked className="w-4 h-4" /> IELTS Rules
                    </Link>

                    {isApp && (
                        <div className="relative" ref={notificationRef}>
                            <button
                                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                                className="p-2 rounded-xl relative bg-transparent border-none cursor-pointer transition-all"
                                style={{ color: 'rgba(160,175,210,0.5)' }}
                                onMouseEnter={e => (e.currentTarget.style.color = '#A8BFFF')}
                                onMouseLeave={e => !isNotificationsOpen && (e.currentTarget.style.color = 'rgba(160,175,210,0.5)')}
                            >
                                <Bell className="w-5 h-5" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full animate-pulse"
                                        style={{ background: '#6C8EF5' }} />
                                )}
                            </button>

                            <AnimatePresence>
                                {isNotificationsOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute right-0 mt-2 w-80 md:w-96 rounded-2xl shadow-2xl overflow-hidden border z-[100]"
                                        style={{
                                            background: 'rgba(4,7,12,0.95)',
                                            backdropFilter: 'blur(32px)',
                                            borderColor: 'rgba(255,255,255,0.06)',
                                        }}
                                    >
                                        <div className="p-4 border-b flex items-center justify-between" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                            <h3 className="text-sm font-bold text-white uppercase tracking-widest">Notifications</h3>
                                            <button
                                                onClick={markAllAsRead}
                                                className="text-[10px] font-black uppercase tracking-tighter text-indigo-400 hover:text-indigo-300 transition-colors bg-transparent border-none cursor-pointer"
                                            >
                                                Mark all as read
                                            </button>
                                        </div>

                                        <div className="max-h-[70vh] overflow-y-auto custom-scrollbar">
                                            {notifications.length > 0 ? (
                                                notifications.map(notification => (
                                                    <div
                                                        key={notification.id}
                                                        className={`p-4 flex gap-4 transition-colors cursor-pointer border-b ${notification.unread ? 'bg-white/5' : ''} hover:bg-white/[0.08]`}
                                                        style={{ borderColor: 'rgba(255,255,255,0.03)' }}
                                                        onClick={() => {
                                                            setNotifications(notifications.map(n => n.id === notification.id ? { ...n, unread: false } : n));
                                                        }}
                                                    >
                                                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                                                            style={{ background: `${notification.color}20`, border: `1px solid ${notification.color}30` }}>
                                                            <notification.icon className="w-5 h-5" style={{ color: notification.color }} />
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex justify-between items-start mb-1">
                                                                <p className="text-xs font-bold text-white">{notification.title}</p>
                                                                <span className="text-[10px] text-zinc-500 font-medium">{notification.time}</span>
                                                            </div>
                                                            <p className="text-xs text-zinc-400 leading-relaxed">{notification.message}</p>
                                                        </div>
                                                        {notification.unread && (
                                                            <div className="w-1.5 h-1.5 rounded-full mt-1.5" style={{ background: notification.color }} />
                                                        )}
                                                    </div>
                                                ))
                                            ) : (
                                                <div className="p-12 text-center">
                                                    <Bell className="w-10 h-10 text-zinc-800 mx-auto mb-4 opacity-20" />
                                                    <p className="text-sm font-medium text-zinc-600">No new notifications</p>
                                                </div>
                                            )}
                                        </div>

                                        <div className="p-4 text-center border-t" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
                                            <button className="text-xs font-bold text-zinc-500 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                                                See all activity
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    )}

                    {!isApp ? (
                        <div className="flex items-center gap-2 md:gap-4">
                            <Link to="/login" className="text-xs md:text-sm font-bold no-underline hover:text-white transition-colors" style={{ color: 'rgba(160,175,210,0.7)' }}>
                                Sign In
                            </Link>
                            <Link to="/register" className="btn-modern btn-primary-modern px-3 md:px-5 py-1.5 md:py-2 text-[10px] md:text-sm no-underline shadow-lg shadow-blue-500/20">
                                Register
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3 pl-2 border-l" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
                            <div className="hidden sm:block text-right">
                                <p className="text-sm font-bold leading-none mb-1" style={{ color: '#E2E8F5' }}>Ibrahim</p>
                                <span className="text-[9px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded"
                                    style={{ color: '#34D399', border: '1px solid rgba(52,211,153,0.25)', background: 'rgba(52,211,153,0.1)' }}>Free</span>
                            </div>
                            <div className="w-9 h-9 rounded-full overflow-hidden cursor-pointer"
                                style={{ border: '2px solid rgba(108,142,245,0.3)' }}>
                                <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Sarah" alt="Avatar" className="w-full h-full" />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}
