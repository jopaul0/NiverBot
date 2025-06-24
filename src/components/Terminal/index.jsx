import { useEffect, useRef, useState } from 'react';
import './Terminal.css';
import { Trash } from 'lucide-react';

const Terminal = ({ logs = [], setLog }) => {
    const endRef = useRef(null);
    const [isFading, setIsFading] = useState(false);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    const handleClear = () => {
        setIsFading(true); // começa o fade out
        setTimeout(() => {
            setLog([]);      // limpa o log após o fade
            setIsFading(false);
            endRef.current?.scrollIntoView({ behavior: 'smooth' });
        }, 300); // duração da transição em ms, combine com CSS
    };

    return (
        <div className="terminal">
            <div className="terminal-header">
                <span className="terminal-title">Terminal de Logs</span>
                <button className='terminal-trash' onClick={handleClear}>
                    <Trash />
                </button>
            </div>
            <div className={`terminal-body ${isFading ? 'fade-out' : ''}`}>
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
