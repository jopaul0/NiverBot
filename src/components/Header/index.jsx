import '@/components/Header/Header.css';
import Tabs from '@/components/Tabs';
import TitleBar from '@/components/Header/TitleBar';
import logo from '../../../assets/iconelogo.png';

const tabs = [
    { id: 'whatsapp', label: 'WhatsApp' },
    { id: 'birthday', label: 'Aniversários' },
    { id: 'documents', label: 'Documentos' }
];

const Header = ({ activeTab, setActiveTab, config, setConfig, openNotice,
    setOpenNotice }) => {
    return (
        <>

            <header className="header">
                <TitleBar config={config} setConfig={setConfig} openNotice={openNotice} setOpenNotice={setOpenNotice} />
                <div className="header-content">
                    <div className='logo-content'>
                        <img
                            src={logo}
                            alt="OnTrigger Logo"
                            className="logo"
                        />
                        <h1>OnTrigger</h1>
                    </div>

                    <Tabs activeTab={activeTab} setActiveTab={setActiveTab} tabs={tabs} />
                </div>
            </header>
        </>
    );
}

export default Header;
