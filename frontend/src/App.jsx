import Header from "../components/Header"
import { useState } from "react"
import BirthdayPage from "../pages/Birthday"
import WhatsappPage from "../pages/Whatsapp"
import DocumentsPage from "../pages/Documents"
import Terminal from "../components/Terminal"

function App() {
  const [activeTab, setActiveTab] = useState("whatsapp");

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
      <Header activeTab={activeTab} setActiveTab={setActiveTab}/>
      <p>Bem-Vindo ao OnTrigger!</p>
      <main>
        <aside className="page">{renderContent()}</aside>
        <section>
          <Terminal/>
        </section>
      </main>
    </>
  )
}

export default App
