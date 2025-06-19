import './TitleBar.css';

import { Minus, X } from 'lucide-react';

const TitleBar = () => {
    const onMinimize = () => {
        window.electronAPI.minimize();
    };
    const onClose = () => {
        window.electronAPI.close();
    };
    return (
        <div className="title-bar">
                <button onClick={onMinimize}><Minus size={15} /></button>
                <button onClick={onClose}><X size={15} /></button>
        </div>
    );
}
export default TitleBar;