import React from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface WordCounterProps {
    current: number;
    minimum?: number;
}

const WordCounter: React.FC<WordCounterProps> = ({ current, minimum = 250 }) => {
    const isUnderMinimum = current < minimum;

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center text-xs font-black uppercase tracking-widest text-zinc-500">
                <span>Word Count</span>
                <span className={isUnderMinimum ? 'text-amber-500' : 'text-emerald-500'}>
                    {current} / {minimum} minimum
                </span>
            </div>
            <div className="w-full h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                    className={`h-full transition-all duration-300 ${isUnderMinimum ? 'bg-amber-500' : 'bg-emerald-500'}`}
                    style={{ width: `${Math.min((current / minimum) * 100, 100)}%` }}
                />
            </div>
            {isUnderMinimum && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-amber-500/80 uppercase tracking-tight">
                    <AlertCircle className="w-3 h-3" />
                    <span>Essay must contain at least {minimum} words to evaluate.</span>
                </div>
            )}
            {!isUnderMinimum && (
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-emerald-500/80 uppercase tracking-tight">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Minimum word count reached.</span>
                </div>
            )}
        </div>
    );
};

export default WordCounter;
