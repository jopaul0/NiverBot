//Imports
import { useState, useRef, useEffect } from "react"
import "./App.css"
import Config from "./components/Config"
import Header from "./components/Header"
import TabPage from "./components/TabPage"
import Status from "./components/Status"
import ActivityArea from "./components/ActivityArea"





const App = () => {
  //Consts
  const nodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("whatsapp");
  const [whatsappConnected, setWhatsappConnected] = useState(false);
  const [logs, setLogs] = useState(['Bem-Vindo ao OnTrigger!']);
  const [activity, setActivity] = useState(false);
  const [config, setConfig] = useState(false);
  const [activityTab, setActivityTab] = useState("birthday")

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
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        config={config}
        setConfig={setConfig}
      />
      <Config
        visible={config}
        setVisible={setConfig}
      />
      <main>
        <TabPage
          activeTab={activeTab}
          nodeRef={nodeRef}
          setActivity={setActivity}
          activity={activity}
          whatsappConnected={whatsappConnected}
          setConnected={setWhatsappConnected}
          loading={loading}
          setLoading={setLoading}
          setActivityTab={setActivityTab}
        />

        <ActivityArea
          logs={logs}
          setLogs={setLogs}
          setActivity={setActivity}
          activity={activity}
          activityTab={activityTab}
          loading={loading}
          setLoading={setLoading}
          connected={whatsappConnected}
        />
        <Status
          active={whatsappConnected}
          loading={loading}
        />
      </main>
    </>
  )
}

export default App
