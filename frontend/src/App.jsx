import Header from "../components/Header"
import { useState } from "react"
import BirthdayPage from "../pages/Birthday"
import WhatsappPage from "../pages/Whatsapp"
import DocumentsPage from "../pages/Documents"

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
      <p style={{textAlign:"center", padding:'10px'}}>Bem-Vindo ao OnTrigger!</p>
      <div style={{ padding: "20px" }}>{renderContent()}</div>
    </>
  )
}

export default App
