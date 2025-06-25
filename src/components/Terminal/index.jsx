import { useEffect, useRef, useState } from 'react';
import './Terminal.css';
import { Trash } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

const Terminal = ({ logs = [], setLog }) => {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleClear = () => {
        setLog([]);
    };

    return (
        <div className="terminal">
            <div className="terminal-header">
                <span className="terminal-title">Terminal de Logs</span>
                <button className='terminal-trash' onClick={handleClear}>
                    <Trash />
                </button>
            </div>
            <div className="terminal-body">
                <AnimatePresence>
                    {logs.map((line, index) => (
                        <motion.pre
                            key={line + index}
                            className="log-line"
                            initial={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {line}
                        </motion.pre>
                    ))}
                </AnimatePresence>
                <div ref={endRef} />
            </div>
        </div>
    );
};

export default Terminal;
