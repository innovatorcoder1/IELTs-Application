import { motion } from 'framer-motion';
import { BookOpen } from 'lucide-react';

interface ReadingPassageProps {
    title: string;
    content: string;
}

export default function ReadingPassage({ title, content }: ReadingPassageProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex flex-col h-full bento-card overflow-hidden shadow-2xl border border-white/5"
        >
            <div className="p-4 lg:p-6 border-b border-white/5 bg-white/5 flex items-start gap-4">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0">
                    <BookOpen className="w-5 h-5" />
                </div>
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest">Passage Text</span>
                    </div>
                    <h2 className="text-base lg:text-lg font-black tracking-tight text-slate-50 leading-tight">
                        {title}
                    </h2>
                </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4 lg:p-8 custom-scrollbar selection:bg-indigo-500/20">
                <div className="prose prose-invert max-w-4xl mx-auto prose-p:text-slate-400 prose-p:leading-relaxed prose-headings:text-slate-50 prose-strong:text-slate-200">
                    {content.split('\n\n').map((para, i) => (
                        para.startsWith('#') ? (
                            <h3 key={i} className="text-sm lg:text-base font-black mt-8 mb-4 border-l-4 border-indigo-500 pl-4 py-1 bg-indigo-500/5 rounded-r-lg tracking-tight text-slate-50">
                                {para.replace('#', '').trim()}
                            </h3>
                        ) : (
                            <p key={i} className="text-xs lg:text-sm text-slate-400 leading-relaxed mb-5">{para}</p>
                        )
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

