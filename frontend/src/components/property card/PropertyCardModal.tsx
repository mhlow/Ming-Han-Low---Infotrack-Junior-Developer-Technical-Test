import type { InternalProperty } from '../../types/InternalProperty';
import { useEffect, useRef, useState } from 'react';


//   onConfirm: (volume: string, folio: string) => void; // Called when saving


function PropertyCardModal({
    isOpen,
    setIsOpen,
    property,
    onConfirm,
}: {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    property: InternalProperty;
    onConfirm: (volume: string, folio: string) => void;
}) {
    const [volume, setVolume] = useState(property.volumeFolio.volume || '');
    const [folio, setFolio] = useState(property.volumeFolio.folio || '');
    const [volumeError, setVolumeError] = useState('');
    const [folioError, setFolioError] = useState('');

    const modalRef = useRef<HTMLDivElement>(null);
    const firstInputRef = useRef<HTMLInputElement>(null);

    // Reset form when modal opens with new initial values
    useEffect(() => {
        if (isOpen) {
            setVolume(property.volumeFolio.volume || '');
            setFolio(property.volumeFolio.folio || '');
            setVolumeError('');
            setFolioError('');
            // Focus first input when modal opens
            setTimeout(() => firstInputRef.current?.focus(), 0);
        }
    }, [isOpen, property.volumeFolio.volume, property.volumeFolio.folio]);

    // Handle escape key
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                setIsOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, setIsOpen]);

    // Focus trap
    useEffect(() => {
        if (!isOpen) return;

        const modal = modalRef.current;
        if (!modal) return;

        const focusableElements = modal.querySelectorAll(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

        const handleTab = (e: KeyboardEvent) => {
            if (e.key !== 'Tab') return;

            if (e.shiftKey) {
                if (document.activeElement === firstElement) {
                    e.preventDefault();
                    lastElement?.focus();
                }
            } else {
                if (document.activeElement === lastElement) {
                    e.preventDefault();
                    firstElement?.focus();
                }
            }
        };

        document.addEventListener('keydown', handleTab);
        return () => document.removeEventListener('keydown', handleTab);
    }, [isOpen]);

    const validateVolume = (value: string): boolean => {
        if (!value.trim()) {
            setVolumeError('Volume is required');
            return false;
        }
        if (!/^\d{1,6}$/.test(value)) {
            setVolumeError('Volume must be 1-6 digits');
            return false;
        }
        setVolumeError('');
        return true;
    };

    const validateFolio = (value: string): boolean => {
        if (!value.trim()) {
            setFolioError('Folio is required');
            return false;
        }
        if (!/^\d{1,5}$/.test(value)) {
            setFolioError('Folio must be 1-5 digits');
            return false;
        }
        setFolioError('');
        return true;
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setVolume(value);
        if (volumeError) {
            validateVolume(value);
        }
    };

    const handleFolioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setFolio(value);
        if (folioError) {
            validateFolio(value);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const isVolumeValid = validateVolume(volume);
        const isFolioValid = validateFolio(folio);

        if (isVolumeValid && isFolioValid) {
            onConfirm(volume, folio);
            setIsOpen(false);
        }
    };

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            setIsOpen(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="absolute left-0 top-0 w-full h-full flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            <div className="absolute left-0 top-0 w-full h-full bg-black opacity-50 flex items-center justify-center" onClick={handleBackdropClick}/>
            <div
                ref={modalRef}
                className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 z-50"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                    <h2 id="modal-title" className="text-xl font-semibold text-gray-900">
                        Edit Volume/Folio
                    </h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        aria-label="Close modal"
                    >
                        X
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    {/* Volume Input */}
                    <div>
                        <label
                            htmlFor="volume"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Volume
                        </label>
                        <input
                            ref={firstInputRef}
                            id="volume"
                            type="text"
                            value={volume}
                            onChange={handleVolumeChange}
                            onBlur={() => validateVolume(volume)}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${volumeError
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                }`}
                            placeholder="Enter 1-6 digits"
                            aria-invalid={!!volumeError}
                            aria-describedby={volumeError ? 'volume-error' : undefined}
                        />
                        {volumeError && (
                            <p id="volume-error" className="mt-1 text-sm text-red-600">
                                {volumeError}
                            </p>
                        )}
                    </div>

                    {/* Folio Input */}
                    <div>
                        <label
                            htmlFor="folio"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Folio
                        </label>
                        <input
                            id="folio"
                            type="text"
                            value={folio}
                            onChange={handleFolioChange}
                            onBlur={() => validateFolio(folio)}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${folioError
                                    ? 'border-red-500 focus:ring-red-500'
                                    : 'border-gray-300'
                                }`}
                            placeholder="Enter 1-5 digits"
                            aria-invalid={!!folioError}
                            aria-describedby={folioError ? 'folio-error' : undefined}
                        />
                        {folioError && (
                            <p id="folio-error" className="mt-1 text-sm text-red-600">
                                {folioError}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={() => setIsOpen(false)}
                            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
                        >
                            Close
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
                        >
                            Confirm
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PropertyCardModal;