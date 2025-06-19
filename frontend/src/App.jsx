import Header from "../components/Header"
import { useState, useRef } from "react"
import BirthdayPage from "../pages/Birthday"
import WhatsappPage from "../pages/Whatsapp"
import DocumentsPage from "../pages/Documents"
import Terminal from "../components/Terminal"
import { CSSTransition, SwitchTransition } from "react-transition-group"
import "./App.css"

function App() {
  const [activeTab, setActiveTab] = useState("whatsapp");
  const nodeRef = useRef(null);

  const renderContent = () => {
    switch (activeTab) {
      case "whatsapp":
        return <WhatsappPage />;
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
      </main>
    </>
  )
}

export default App
