import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react'; // só um ícone agora, animaremos ele
import '@/components/Collapse/Collapse.css';

export default function Collapse({ title, children }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="collapse-container">
            <button className="collapse-header" onClick={() => setIsOpen(!isOpen)}>
                <span>{title}</span>
                <motion.div
                    animate={{ rotate: isOpen ? 90 : 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ display: 'flex', alignItems: 'center' }}
                >
                    <ChevronRight size={18} />
                </motion.div>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="collapse-body"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                        <div className="collapse-content">{children}</div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
