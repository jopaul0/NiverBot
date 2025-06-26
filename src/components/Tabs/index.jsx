import './Tabs.css';
import { motion } from 'framer-motion';

const Tabs = ({ activeTab, setActiveTab, tabs, id = 'default' }) => {
    return (
        <div className="tabs">
            {tabs.map((tab) => (
                <button
                    key={tab.id}
                    className={activeTab === tab.id ? 'active' : ''}
                    onClick={() => setActiveTab(tab.id)}
                >
                    {tab.label}
                    {activeTab === tab.id && (
                        <motion.div
                            layoutId={`tab-indicator-${id}`}
                            className="tab-indicator"
                            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                        />
                    )}
                </button>
            ))}
        </div>
    );
};


export default Tabs;
