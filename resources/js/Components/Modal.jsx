import { useEffect, useRef } from 'react';

export default function Modal({ children, show = false, maxWidth = '2xl', closeable = true, onClose = () => {} }) {
    const close = () => {
        if (closeable) {
            onClose();
        }
    };

    const bgRef = useRef();

    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                close();
            }
        };

        if (show) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [show, close]);

    return (
        <>
            <div
                ref={bgRef}
                className={`fixed inset-0 z-50 overflow-y-auto px-4 py-6 sm:px-0 ${
                    show ? 'opacity-100' : 'opacity-0 pointer-events-none'
                } transition-opacity duration-300`}
                onClick={(e) => {
                    if (e.target === bgRef.current) {
                        close();
                    }
                }}
            >
                <div className="flex min-h-screen items-center justify-center">
                    <div
                        className={`w-full transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 shadow-xl transition-all duration-300 ${
                            show ? 'scale-100 opacity-100' : 'scale-95 opacity-0'
                        } ${maxWidth === 'sm' ? 'sm:max-w-sm' : maxWidth === 'md' ? 'sm:max-w-md' : maxWidth === 'lg' ? 'sm:max-w-lg' : maxWidth === 'xl' ? 'sm:max-w-xl' : 'sm:max-w-2xl'}`}
                    >
                        {children}
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-gray-900/50 transition-opacity duration-300 ${
                    show ? 'opacity-100' : 'opacity-0 pointer-events-none'
                }`}
            />
        </>
    );
}