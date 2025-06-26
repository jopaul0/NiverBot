import './TitleBar.css';
import { Minus, X, Settings } from 'lucide-react';

const TitleBar = ({config, setConfig}) => {
    const onMinimize = () => {
        window.electronAPI.minimize();
    };
    const onClose = () => {
        window.electronAPI.close();
    };
    return (
        <div className="title-bar">
            <button onClick={() => {setConfig(!config)}}><Settings size={15}/></button>
            <div className='window-buttons'>
                <button onClick={onMinimize}><Minus size={15} /></button>
                <button onClick={onClose}><X size={15} /></button>
            </div>
        </div>
    );
}
export default TitleBar;