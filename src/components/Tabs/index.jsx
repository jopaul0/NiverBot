import './Tabs.css';

const Tabs = ({ activeTab, setActiveTab }) => {
    return (
        <div className='tabs'>
            <button
                className={activeTab === "whatsapp" ? "active" : ""}
                onClick={() => setActiveTab("whatsapp")}
            >
                WhatsApp
            </button>
            <button
                className={activeTab === "birthday" ? "active" : ""}
                onClick={() => setActiveTab("birthday")}
            >
                Aniversários
            </button>
            <button
                className={activeTab === "documents" ? "active" : ""}
                onClick={() => setActiveTab("documents")}
            >
                Documentos
            </button>
        </div>
    );
}
export default Tabs;