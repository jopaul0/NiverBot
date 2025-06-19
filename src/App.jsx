import Header from "./components/Header"
import { useState, useRef } from "react"
import BirthdayPage from "./pages/Birthday"
import WhatsappPage from "./pages/Whatsapp"
import DocumentsPage from "./pages/Documents"
import Terminal from "./components/Terminal"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import "./App.css"
import Status from "./components/Status"

function App() {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const nodeRef = useRef(null);

  const renderContent = () => {
    switch (activeTab) {
      case "whatsapp":
        return <WhatsappPage
          connected={whatsappConnected}
          setConnected={setWhatsappConnected}
        />;
      case "birthday":
        return <BirthdayPage />;
      case "documents":
        return <DocumentsPage />;
      default:
        return <WhatsappPage />;
    }
  };

  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <p>Bem-Vindo ao OnTrigger!</p>
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
          <Terminal />
        </section>
        <Status active={whatsappConnected} />
      </main>
    </>
  )
}

export default App
