import Header from "./components/Header"
import { useState, useRef, useEffect } from "react"
import BirthdayPage from "./pages/Birthday"
import WhatsappPage from "./pages/Whatsapp"
import DocumentsPage from "./pages/Documents"
import Terminal from "./components/Terminal"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import "./App.css"
import Status from "./components/Status"

function App() {
  const nodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  useEffect(() => {
    const handleStatus = (status) => {
      setWhatsappConnected(status);
      setLoading(false);
    };

    window.electronAPI.removeAllListeners('whatsapp-status');
    window.electronAPI.onWhatsappStatus(handleStatus);
    
    return () => {
      window.electronAPI.removeAllListeners('whatsapp-status');
    };
  }, []);

  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const handleLog = (msg) => {
      setLogs(prev => [...prev, msg]);
    };

    window.electronAPI.removeAllListeners('log-message'); // Só funciona se essa função existir no preload!
    window.electronAPI.onLogMessage(handleLog);

    return () => {
      window.electronAPI.removeAllListeners('log-message');
    };
  }, []);


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
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
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
        <section>
          <Terminal logs={logs} setLog={setLogs} />
        </section>
        <Status active={whatsappConnected} loading={loading} />
      </main>
    </>
  )
}

export default App
