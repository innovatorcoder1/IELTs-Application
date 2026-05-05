import React, { useRef, useState, useEffect } from 'react';
import { Play, Pause, Headphones, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
    audioUrl: string;
    onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl, onEnded }) => {
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [hasEnded, setHasEnded] = useState(false);
    const [hasStarted, setHasStarted] = useState(false);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        const handleTimeUpdate = () => setCurrentTime(audio.currentTime);
        const handleLoadedMetadata = () => setDuration(audio.duration);
        const handleEnded = () => {
            setIsPlaying(false);
            setHasEnded(true);
            onEnded?.();
        };

        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.addEventListener('ended', handleEnded);

        return () => {
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
            audio.removeEventListener('ended', handleEnded);
        };
    }, [onEnded]);

    const togglePlay = () => {
        const audio = audioRef.current;
        if (!audio || hasEnded) return;
        if (isPlaying) {
            audio.pause();
            setIsPlaying(false);
        } else {
            audio.play();
            setIsPlaying(true);
            setHasStarted(true);
        }
    };

    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return '00:00';
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = Math.floor(seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

    return (
        <div className="bento-card p-8 md:p-10 bg-zinc-900 border border-white/5 relative overflow-hidden">
            <audio ref={audioRef} src={audioUrl} preload="metadata" />

            {/* Background glow when playing */}
            {isPlaying && (
                <div className="absolute inset-0 bg-cyan-500/3 pointer-events-none" />
            )}

            <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Animated icon */}
                <div className="relative shrink-0">
                    <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-700 bg-zinc-950 border border-white/5 ${isPlaying ? 'shadow-[0_0_50px_-10px_rgba(34,211,238,0.4)]' : ''
                        }`}>
                        <Headphones className={`w-10 h-10 transition-colors duration-500 ${isPlaying ? 'text-cyan-400' : 'text-zinc-600'}`} />
                    </div>
                    {isPlaying && (
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                            className="absolute inset-0 border-2 border-dashed border-cyan-400/20 rounded-full"
                        />
                    )}
                </div>

                <div className="flex-1 w-full space-y-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-base font-black text-zinc-200 tracking-tight">IELTS Listening Audio</h3>
                            <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest mt-0.5 flex items-center gap-1">
                                <Volume2 className="w-3 h-3" />
                                {hasEnded ? 'Audio Finished — Replay Disabled' : hasStarted ? 'Playing Once Only' : 'Press Play to Begin'}
                            </p>
                        </div>
                        <span className="text-xs font-black tabular-nums text-zinc-400 font-mono">
                            {formatTime(currentTime)} / {formatTime(duration)}
                        </span>
                    </div>

                    {/* Progress bar */}
                    <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-white/5">
                        <motion.div
                            className="h-full bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                            style={{ width: `${progress}%` }}
                            transition={{ type: 'tween', duration: 0.5 }}
                        />
                    </div>

                    {/* Controls */}
                    <div className="flex items-center justify-center">
                        <button
                            onClick={togglePlay}
                            disabled={hasEnded}
                            className={`flex items-center gap-3 px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-widest transition-all ${hasEnded
                                    ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed'
                                    : isPlaying
                                        ? 'bg-white text-black hover:bg-zinc-100 active:scale-95'
                                        : 'bg-cyan-500 text-black hover:bg-cyan-400 active:scale-95 shadow-[0_4px_24px_rgba(34,211,238,0.3)]'
                                }`}
                        >
                            {isPlaying
                                ? <><Pause className="w-4 h-4 fill-black" /> Pause</>
                                : hasEnded
                                    ? <><Headphones className="w-4 h-4" /> Audio Used</>
                                    : <><Play className="w-4 h-4 fill-black ml-0.5" /> Play Audio</>
                            }
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AudioPlayer;
