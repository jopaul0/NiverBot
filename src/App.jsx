//Imports
import { useState, useRef, useEffect } from "react"
import Header from "./components/Header"
import TabPage from "./components/TabPage"
import Status from "./components/Status"
import ActivityArea from "./components/ActivityArea"
import "./App.css"


const App = () => {
  //Consts
  const nodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [logs, setLogs] = useState([]);
  const [activity, setActivity] = useState(false);

  //Effects 
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

  useEffect(() => {
    const handleLog = (msg) => {
      setLogs(prev => [...prev, msg]);
    };

    window.electronAPI.removeAllListeners('log-message');
    window.electronAPI.onLogMessage(handleLog);

    return () => {
      window.electronAPI.removeAllListeners('log-message');
    };
  }, []);



  //JSX
  return (
    <>
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />
      <main>
        <TabPage
          activeTab={activeTab}
          nodeRef={nodeRef}
          setActivity={setActivity}
          activity={activity}
          whatsappConnected={whatsappConnected}
          setConnected={setWhatsappConnected}
          loading={loading}
          setLoading={setLoading} />
        <ActivityArea
          logs={logs}
          setLogs={setLogs}
          setActivity={setActivity}
          activity={activity}
        /> 
        <Status active={whatsappConnected} loading={loading} />
      </main>

    </>
  )
}

export default App
