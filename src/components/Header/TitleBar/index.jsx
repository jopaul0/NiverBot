import '@/components/Header/TitleBar/TitleBar.css';
import { Minus, X, Settings, PartyPopper } from 'lucide-react';


const TitleBar = ({ config, setConfig, openNotice, setOpenNotice }) => {
    const onMinimize = () => {
        window.electronAPI.minimize();
    };
    const onClose = () => {
        window.electronAPI.close();
    };
    return (
        <div className="title-bar">
            <button onClick={() => { setOpenNotice(!openNotice) }}><PartyPopper size={15} /></button>
            <button onClick={() => { setConfig(!config) }}><Settings size={15} /></button>
            <div className='window-buttons'>
                <button onClick={onMinimize}><Minus size={15} /></button>
                <button onClick={onClose}><X size={15} /></button>
            </div>
        </div>
    );
}
export default TitleBar;