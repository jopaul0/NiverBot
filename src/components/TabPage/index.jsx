
import { CSSTransition, SwitchTransition } from "react-transition-group"
import BirthdayPage from "../../pages/Birthday"
import WhatsappPage from "../../pages/Whatsapp"
import DocumentsPage from "../../pages/Documents"
import './TabPage.css';

const TabPage = ({ activeTab, nodeRef, setActivity, whatsappConnected, setWhatsappConnected, loading, setLoading, activity }) => {
    const renderContent = () => {
        switch (activeTab) {
            case "whatsapp":
                return <WhatsappPage
                    connected={whatsappConnected}
                    setConnected={setWhatsappConnected}
                    loading={loading}
                    setLoading={setLoading}
                />;
            case "birthday":
                return <BirthdayPage
                    connected={whatsappConnected}
                    loading={loading}
                    setLoading={setLoading}
                    activity={activity}
                    setActivity={setActivity}
                />;
            case "documents":
                return <DocumentsPage
                    connected={whatsappConnected}
                    loading={loading}
                    setLoading={setLoading}
                />;
            default:
                return <WhatsappPage
                    connected={whatsappConnected}
                    setConnected={setWhatsappConnected}
                    loading={loading}
                    setLoading={setLoading}
                />;
        }
    };
    return (
        <aside>
            <SwitchTransition>
                <CSSTransition
                    key={activeTab}
                    timeout={300}
                    classNames="fade"
                    nodeRef={nodeRef}
                    unmountOnExit
                >
                    <div ref={nodeRef} className="tab-page">
                        {renderContent()}
                    </div>
                </CSSTransition>
            </SwitchTransition>
        </aside>
    );
}

export default TabPage;