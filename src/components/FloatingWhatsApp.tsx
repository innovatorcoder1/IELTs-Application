import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

export default function FloatingWhatsApp() {
    const whatsappNumber = "+92 3360000283";
    const message = "Hi, I'm interested in the IELTS AI coaching platform. Can I get more information?";
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`;

    return (
        <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 z-[100] w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-2xl shadow-[#25D366]/20 cursor-pointer group no-underline"
            style={{
                border: '4px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)'
            }}
        >
            <MessageCircle className="w-7 h-7 text-white fill-white/20 group-hover:fill-white/40 transition-all" />

            {/* Tooltip */}
            <div className="absolute right-full mr-4 px-3 py-1.5 rounded-xl bg-white text-black text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all pointer-events-none whitespace-nowrap shadow-xl">
                Chat with us
                <div className="absolute top-1/2 -translate-y-1/2 left-full w-2 h-2 bg-white rotate-45 -ml-1" />
            </div>

            {/* Pulsing Aura */}
            <div className="absolute inset-0 rounded-full animate-ping bg-[#25D366]/30 -z-10" />
        </motion.a>
    );
}
