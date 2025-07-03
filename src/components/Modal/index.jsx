import { createPortal } from 'react-dom';
import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import '@/components/Modal/Modal.css';

export const ModalBase = ({ isOpen, onClose, children, className = '' }) => {
    if (typeof document === 'undefined') return null;

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isOpen) {
                e.preventDefault();
                e.stopPropagation();
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown, true);
        return () => {
            document.removeEventListener('keydown', handleKeyDown, true);
        };
    }, [isOpen, onClose]);

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="modal-wrapper"
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        className={`modal-content ${className}`}
                        initial={{ y: 200, opacity: 0, scale: 0.95 }}
                        animate={{ y: 0, opacity: 1, scale: 1, transition: { duration: 0.4, ease: 'easeOut' } }}
                        exit={{ y: 200, opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: 'easeIn' } }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button className="modal-close-button" onClick={onClose} aria-label="Fechar modal">
                            <X size={20} />
                        </button>
                        {children}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
};





// Modal de Sucesso
export const SuccessModal = ({ isOpen, onClose, message }) => (
    <ModalBase isOpen={isOpen} onClose={onClose} className="modal-success">
        <h2>✅ Sucesso</h2>
        <p>{message}</p>
    </ModalBase>
);

// Modal de Erro
export const ErrorModal = ({ isOpen, onClose, message }) => (
    <ModalBase isOpen={isOpen} onClose={onClose} className="modal-error">
        <h2>❌ Erro</h2>
        <p>{message}</p>
    </ModalBase>
);

// Modal Personalizável
export const CustomModal = ({ isOpen, onClose, children }) => (
    <ModalBase isOpen={isOpen} onClose={onClose}>
        {children}
    </ModalBase>
);
