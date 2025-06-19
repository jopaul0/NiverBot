import { useEffect, useRef } from 'react';
import './Terminal.css';

const Terminal = ({ logs = [] }) => {
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    return (
        <div className="terminal">
            <div className="terminal-header">Terminal de Logs</div>
            <div className="terminal-body">
                {logs.map((line, index) => (
                    <pre key={index} className="log-line">
                        {line}
                    </pre>
                ))}
                <div ref={endRef} />
            </div>
        </div>
    );
}
export default Terminal;