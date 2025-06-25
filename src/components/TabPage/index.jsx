
import { CSSTransition, SwitchTransition } from "react-transition-group"
import BirthdayPage from "../../pages/tabs/Birthday"
import WhatsappPage from "../../pages/tabs/Whatsapp"
import DocumentsPage from "../../pages/tabs/Documents"
import './TabPage.css';

const TabPage = ({ activeTab, nodeRef, setActivity, whatsappConnected, setWhatsappConnected, loading, setLoading, activity, setActivityTab }) => {
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
                    setActivityTab={setActivityTab}
                />;
            case "documents":
                return <DocumentsPage
                    connected={whatsappConnected}
                    loading={loading}
                    setLoading={setLoading}
                    setActivityTab={setActivityTab}
                    activity={activity}
                    setActivity={setActivity}
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