import { useState, useRef } from 'react';
import { Mic, Square, Play, Pause, RotateCcw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface AudioRecorderProps {
    onRecordingComplete: (blob: Blob) => void;
    disabled?: boolean;
}

export default function AudioRecorder({ onRecordingComplete, disabled }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [duration, setDuration] = useState(0);
    const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const chunksRef = useRef<Blob[]>([]);
    const timerRef = useRef<any>(null);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            chunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) {
                    chunksRef.current.push(e.data);
                }
            };

            mediaRecorder.onstop = () => {
                const blob = new Blob(chunksRef.current, { type: 'audio/webm' });
                setAudioBlob(blob);
                onRecordingComplete(blob);
                stream.getTracks().forEach(track => track.stop());
            };

            mediaRecorder.start();
            setIsRecording(true);
            setDuration(0);
            setAudioBlob(null);

            timerRef.current = setInterval(() => {
                setDuration(prev => prev + 1);
            }, 1000);
        } catch (err) {
            console.error("Microphone access denied:", err);
            alert("Microphone access is required for speaking practice.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current && isRecording) {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            if (timerRef.current) clearInterval(timerRef.current);
        }
    };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60).toString().padStart(2, '0');
        const s = (seconds % 60).toString().padStart(2, '0');
        return `${m}:${s}`;
    };

    const togglePlayback = () => {
        if (!audioRef.current && audioBlob) {
            audioRef.current = new Audio(URL.createObjectURL(audioBlob));
            audioRef.current.onended = () => setIsPlaying(false);
        }

        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const resetRecording = () => {
        setAudioBlob(null);
        setDuration(0);
        setIsPlaying(false);
        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current = null;
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 w-full py-10">
            <AnimatePresence mode="wait">
                {!isRecording && !audioBlob ? (
                    <motion.div
                        key="idle"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 1.1, opacity: 0 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <button
                            onClick={startRecording}
                            disabled={disabled}
                            className="w-24 h-24 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-xl shadow-blue-500/20 disabled:opacity-50 group"
                        >
                            <Mic className="w-10 h-10" />
                        </button>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Start Recording</p>
                    </motion.div>
                ) : isRecording ? (
                    <motion.div
                        key="recording"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex flex-col items-center gap-10 w-full max-w-md"
                    >
                        <div className="flex gap-1.5 h-16 items-center w-full justify-center">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    animate={{ height: [8, Math.random() * 60 + 10, 8] }}
                                    transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                                    className="flex-1 bg-blue-500 rounded-full"
                                />
                            ))}
                        </div>

                        <div className="flex flex-col items-center gap-2">
                            <span className="text-5xl font-black tabular-nums font-mono tracking-tighter text-white">
                                {formatTime(duration)}
                            </span>
                            <p className="font-black text-red-500 uppercase tracking-[0.4em] text-[10px] animate-pulse">Recording...</p>
                        </div>

                        <button
                            onClick={stopRecording}
                            className="w-16 h-16 rounded-full bg-red-600 text-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all"
                        >
                            <Square className="w-6 h-6 fill-white" />
                        </button>
                    </motion.div>
                ) : (
                    <motion.div
                        key="review"
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        className="flex flex-col items-center gap-6"
                    >
                        <div className="flex items-center gap-4">
                            <button
                                onClick={togglePlayback}
                                className="flex items-center gap-3 bg-zinc-800 hover:bg-zinc-700 text-white px-6 py-3 rounded-xl font-bold transition-all border border-white/5"
                            >
                                {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                                {isPlaying ? "Pause Playback" : "Listen to Recording"}
                            </button>
                            <button
                                onClick={resetRecording}
                                className="p-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-400 rounded-xl transition-all border border-white/5"
                                title="Record Again"
                            >
                                <RotateCcw className="w-5 h-5" />
                            </button>
                        </div>
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">Recording Duration: {formatTime(duration)}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
