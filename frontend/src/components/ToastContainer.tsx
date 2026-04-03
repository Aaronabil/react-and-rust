import { type FC, useState, useEffect } from 'react';
import { useToast } from '../hooks/useToast';
import type { Toast, ToastType } from '../context/ToastContext';

const toastConfig: Record<ToastType, { icon: JSX.Element; bgClass: string; borderClass: string; textClass: string }> = {
    success: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        bgClass: 'bg-emerald-500/10',
        borderClass: 'border-emerald-500/30',
        textClass: 'text-emerald-400',
    },
    error: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        bgClass: 'bg-red-500/10',
        borderClass: 'border-red-500/30',
        textClass: 'text-red-400',
    },
    warning: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
        ),
        bgClass: 'bg-amber-500/10',
        borderClass: 'border-amber-500/30',
        textClass: 'text-amber-400',
    },
    info: {
        icon: (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
        ),
        bgClass: 'bg-blue-500/10',
        borderClass: 'border-blue-500/30',
        textClass: 'text-blue-400',
    },
};

const ToastItem: FC<{ toast: Toast; onRemove: (id: string) => void }> = ({ toast, onRemove }) => {
    const [isVisible, setIsVisible] = useState(false);
    const [isLeaving, setIsLeaving] = useState(false);
    const config = toastConfig[toast.type];

    useEffect(() => {
        // Trigger enter animation
        requestAnimationFrame(() => setIsVisible(true));

        // Start exit animation before removal
        const exitTimer = setTimeout(() => {
            setIsLeaving(true);
        }, 3500);

        return () => clearTimeout(exitTimer);
    }, []);

    const handleClose = () => {
        setIsLeaving(true);
        setTimeout(() => onRemove(toast.id), 300);
    };

    return (
        <div
            className={`
                flex items-center gap-3 px-5 py-4 rounded-xl border backdrop-blur-xl shadow-2xl
                ${config.bgClass} ${config.borderClass}
                transition-all duration-300 ease-out
                ${isVisible && !isLeaving
                    ? 'translate-x-0 opacity-100'
                    : 'translate-x-full opacity-0'
                }
            `}
        >
            <span className={config.textClass}>{config.icon}</span>
            <p className="text-sm font-medium text-slate-200 flex-1">{toast.message}</p>
            <button
                onClick={handleClose}
                className="text-slate-500 hover:text-slate-300 transition-colors duration-200 cursor-pointer"
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};

const ToastContainer: FC = () => {
    const { toasts, removeToast } = useToast();

    return (
        <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-3 max-w-sm w-full pointer-events-none">
            {toasts.map((toast) => (
                <div key={toast.id} className="pointer-events-auto">
                    <ToastItem toast={toast} onRemove={removeToast} />
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
