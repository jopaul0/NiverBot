import Button from "../components/Button";
import { useState } from "react";

const WhatsappPage = ({ connected, setConnected }) => {
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      const response = await window.electronAPI.whatsappConnect();
      console.log(response);
    } catch (error) {
      window.electronAPI.sendLog(`Erro ao conectar: ${error.message || error}`);
    }
    setLoading(false);
  };

  const handleDisconnect = async () => {
    setLoading(true);
    try {
      const response = await window.electronAPI.whatsappDisconnect();
      console.log(response);
    } catch (error) {
      window.electronAPI.sendLog(`Erro ao desconectar: ${error.message || error}`);
    }
    setLoading(false);
  };

  const handleClearSession = async () => {
    setLoading(true);
  try {
    await window.electronAPI.clearWhatsappSession();
  } catch (error) {
    window.electronAPI.sendLog(`Erro ao limpar sessão: ${error.message || error}`);
  }
  setLoading(false);
  }

  return (
    <>
      <article>
        <h1>WhatsApp</h1>
        <p>Envie mensagens automáticas!</p>
      </article>
      <Button message={"Conectar ao WhatsApp"} disable={connected} onClick={handleConnect} />
      <Button message={"Desconectar"} disable={!connected} onClick={handleDisconnect} />
      <Button message={"Limpar Sessão"} disable={connected} onClick={handleClearSession} />
    </>
  );
}
export default WhatsappPage;