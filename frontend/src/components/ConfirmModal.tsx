import { type FC, useState, useEffect } from 'react';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    type?: 'danger' | 'warning' | 'info';
    isLoading?: boolean;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    type = 'danger',
    isLoading = false,
    onConfirm,
    onCancel,
}) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            requestAnimationFrame(() => setIsVisible(true));
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const typeConfig = {
        danger: {
            iconBg: 'bg-red-500/15 border-red-500/30',
            iconColor: 'text-red-400',
            buttonBg: 'bg-gradient-to-r from-red-600 to-red-500 hover:shadow-red-500/25',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
            ),
        },
        warning: {
            iconBg: 'bg-amber-500/15 border-amber-500/30',
            iconColor: 'text-amber-400',
            buttonBg: 'bg-gradient-to-r from-amber-600 to-amber-500 hover:shadow-amber-500/25',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            ),
        },
        info: {
            iconBg: 'bg-blue-500/15 border-blue-500/30',
            iconColor: 'text-blue-400',
            buttonBg: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:shadow-blue-500/25',
            icon: (
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
        },
    };

    const config = typeConfig[type];

    return (
        <div
            className={`fixed inset-0 z-[9998] flex items-center justify-center p-4 transition-all duration-300 ${
                isVisible ? 'opacity-100' : 'opacity-0'
            }`}
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={!isLoading ? onCancel : undefined}
            />

            {/* Modal */}
            <div
                className={`relative w-full max-w-md glass rounded-2xl overflow-hidden shadow-2xl transition-all duration-300 ${
                    isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
                }`}
            >
                {/* Top accent bar */}
                <div className={`h-1 ${
                    type === 'danger' ? 'bg-gradient-to-r from-red-600 to-red-400' :
                    type === 'warning' ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                    'bg-gradient-to-r from-blue-600 to-blue-400'
                }`} />

                <div className="p-6">
                    {/* Icon */}
                    <div className="flex justify-center mb-5">
                        <div className={`w-16 h-16 rounded-2xl border ${config.iconBg} flex items-center justify-center ${config.iconColor}`}>
                            {config.icon}
                        </div>
                    </div>

                    {/* Text */}
                    <h3 className="text-xl font-bold text-center text-slate-100 mb-2">{title}</h3>
                    <p className="text-sm text-center text-slate-400 mb-8 leading-relaxed">{message}</p>

                    {/* Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={onCancel}
                            disabled={isLoading}
                            className="flex-1 px-5 py-3 border border-slate-600 text-slate-300 text-sm font-medium rounded-xl hover:bg-slate-700/50 hover:text-slate-100 disabled:opacity-50 transition-all duration-200 cursor-pointer"
                        >
                            {cancelText}
                        </button>
                        <button
                            onClick={onConfirm}
                            disabled={isLoading}
                            className={`flex-1 px-5 py-3 text-white text-sm font-semibold rounded-xl hover:shadow-lg disabled:opacity-50 transition-all duration-200 cursor-pointer ${config.buttonBg}`}
                        >
                            {isLoading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </span>
                            ) : confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
