import React, { createContext, useContext, useState, useEffect } from 'react';

export interface ScoreEntry {
    module: 'listening' | 'reading' | 'writing' | 'speaking';
    score: number;
    date: string;
    tag: string;
    title: string;
}

interface PerformanceData {
    scores: ScoreEntry[];
    streak: number;
    lastActiveDate: string;
    targetScore: number;
}

interface PerformanceContextType {
    data: PerformanceData;
    addScore: (entry: ScoreEntry) => void;
    updateTargetScore: (score: number) => void;
    getAverageScore: (module?: ScoreEntry['module']) => number;
}

const PerformanceContext = createContext<PerformanceContextType | undefined>(undefined);

const DEFAULT_DATA: PerformanceData = {
    scores: [
        { module: 'writing', score: 7.5, date: new Date(Date.now() - 7200000).toISOString(), tag: 'Writing Task 2', title: 'Global Healthcare Challenges' },
        { module: 'speaking', score: 8.0, date: new Date(Date.now() - 86400000).toISOString(), tag: 'Speaking Arena', title: 'Part 2 Cue Card: Childhood Memory' },
        { module: 'listening', score: 6.5, date: new Date(Date.now() - 172800000).toISOString(), tag: 'Practical Listening', title: 'Section 4: Library Registration' },
    ],
    streak: 12,
    lastActiveDate: new Date().toISOString().split('T')[0],
    targetScore: 8.5
};

export const PerformanceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [data, setData] = useState<PerformanceData>(() => {
        const saved = localStorage.getItem('ielts_performance_data');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                return DEFAULT_DATA;
            }
        }
        return DEFAULT_DATA;
    });

    useEffect(() => {
        localStorage.setItem('ielts_performance_data', JSON.stringify(data));
    }, [data]);

    // Check streak
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        if (data.lastActiveDate !== today) {
            const lastDate = new Date(data.lastActiveDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
            
            if (diffDays === 1) {
                setData(prev => ({ ...prev, streak: prev.streak + 1, lastActiveDate: today }));
            } else if (diffDays > 1) {
                setData(prev => ({ ...prev, streak: 1, lastActiveDate: today }));
            } else if (diffDays === 0) {
                // Same day, do nothing
            }
        }
    }, []);

    const addScore = (entry: ScoreEntry) => {
        setData(prev => ({
            ...prev,
            scores: [entry, ...prev.scores].slice(0, 50), // Keep last 50
            lastActiveDate: new Date().toISOString().split('T')[0]
        }));
    };

    const updateTargetScore = (score: number) => {
        setData(prev => ({ ...prev, targetScore: score }));
    };

    const getAverageScore = (module?: ScoreEntry['module']) => {
        const filtered = module ? data.scores.filter(s => s.module === module) : data.scores;
        if (filtered.length === 0) return 0;
        const sum = filtered.reduce((acc, curr) => acc + curr.score, 0);
        return Math.round((sum / filtered.length) * 2) / 2; // Round to nearest 0.5
    };

    return (
        <PerformanceContext.Provider value={{ data, addScore, updateTargetScore, getAverageScore }}>
            {children}
        </PerformanceContext.Provider>
    );
};

export const usePerformance = () => {
    const context = useContext(PerformanceContext);
    if (context === undefined) {
        throw new Error('usePerformance must be used within a PerformanceProvider');
    }
    return context;
};
