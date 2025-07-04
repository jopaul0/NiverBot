import '@/components/Config/Config.css';
import Tabs from '@/components/Tabs';
import { useState, useEffect } from 'react';
import CredencialPage from '@/pages/config/Credencials';
import SheetPage from '@/pages/config/Sheet';
import MessagePage from '@/pages/config/Messages';
import HelpPage from '@/pages/config/Help';
import { ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Config = ({ visible, setVisible }) => {
    const [activeTabConfig, setActiveTabConfig] = useState('credenciais');

    const tabs = [
        { id: 'credenciais', label: 'Credenciais' },
        { id: 'planilha', label: 'Planilha' },
        { id: 'mensagens', label: 'Mensagens' },
        { id: 'ajuda', label: 'Ajuda' }
    ];

    const renderContent = () => {
        switch (activeTabConfig) {
            case "credenciais": return <CredencialPage />;
            case "planilha": return <SheetPage />;
            case "mensagens": return <MessagePage />;
            case "ajuda": return <HelpPage />;
            default: return <CredencialPage />;
        }
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            if (event.key === 'Escape') {
                setVisible(!visible);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [visible, setVisible]);

    return (
        <aside className={`config-container ${visible ? 'visible' : ''}`}>
            <div className='header-config'>
                <button
                    className='arrow-button'
                    onClick={() => setVisible(!visible)}
                >
                    <ArrowLeft size={30} />
                </button>
                <Tabs activeTab={activeTabConfig} setActiveTab={setActiveTabConfig} tabs={tabs} id='config-tabs' />
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTabConfig}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    className="config-content"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </aside>
    );
};

export default Config;
