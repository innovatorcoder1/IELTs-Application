import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';

interface SubmitButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    text?: string;
    loadingText?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ onClick, disabled, loading, text, loadingText }) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`btn-modern btn-primary-modern flex items-center justify-center gap-2 w-full py-4 text-lg font-black tracking-tight ${(disabled || loading) ? 'opacity-50 cursor-not-allowed' : 'group hover:scale-[1.02]'
                }`}
        >
            {loading ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>{loadingText || "AI is evaluating your essay..."}</span>
                </>
            ) : (
                <>
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>{text || "Evaluate Essay"}</span>
                </>
            )}
        </button>
    );
};

export default SubmitButton;
