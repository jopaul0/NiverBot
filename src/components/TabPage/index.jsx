import { AnimatePresence, motion } from "framer-motion";
import BirthdayPage from "@/pages/tabs/Birthday";
import WhatsappPage from "@/pages/tabs/Whatsapp";
import DocumentsPage from "@/pages/tabs/Documents";
import '@/components/TabPage/TabPage.css';

const TabPage = ({ activeTab, setActivity, whatsappConnected, setWhatsappConnected, loading, setLoading, activity, setActivityTab }) => {
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
        <section className="tab-section">
            <AnimatePresence mode="wait">
                <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="tab-page"
                >
                    {renderContent()}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default TabPage;
