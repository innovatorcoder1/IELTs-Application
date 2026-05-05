import React from 'react';

interface EssayEditorProps {
    value: string;
    onChange: (value: string) => void;
    disabled?: boolean;
    placeholder?: string;
}

const EssayEditor: React.FC<EssayEditorProps> = ({ value, onChange, disabled, placeholder }) => {
    return (
        <div className="relative w-full h-full min-h-[400px]">
            <textarea
                value={value}
                onChange={(e) => onChange(e.target.value)}
                disabled={disabled}
                placeholder={placeholder || "Write your IELTS essay here..."}
                className={`w-full h-full p-8 bg-zinc-900/30 border border-white/5 rounded-2xl focus:border-emerald-500/50 focus:bg-zinc-900/50 transition-all outline-none text-zinc-200 text-lg leading-relaxed font-medium resize-none ${disabled ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
            />
        </div>
    );
};

export default EssayEditor;
