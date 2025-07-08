import Button from "@/components/Button";
import ConfirmModal from '@/pages/modals/Confirm';
import { useState } from "react";

const BirthdayPage = ({ connected, loading, setLoading, setActivity, activity, setActivityTab }) => {
  const [open, setOpen] = useState(false);

  // Função de busca de aniversários
  const handleFindBirthdays = async () => {
    setLoading(true);
    try {
      const response = await window.electronAPI.findBirthdays();
      console.log(response);
    } catch (error) {
      window.electronAPI.sendLog(`Erro ao buscar aniversários: ${error.message || error}`);
    }
    setLoading(false);
  };

  // Função para enviar mensagem de aniversário
  const handleSendBirthdayMessage = async () => {
    setLoading(true);
    try {
      const response = await window.electronAPI.whatsappSendBirthdayMessage();
      console.log(response);
    } catch (error) {
      window.electronAPI.sendLog(`Erro ao enviar mensagem de aniversário: ${error.message || error}`);
    }
    setLoading(false);
    setOpen(false);
  };


  return (
    <>
      <article>
        <h1>Aniversários</h1>
        <p>Busque os aniversariantes do dia!</p>
      </article>
      <Button message={"Consultar Aniversários"} disable={loading} onClick={handleFindBirthdays} />
      <Button message={"Mensagem Automática"} disable={!connected || loading} onClick={() => { setOpen(true) }} />
      <Button message={"Mensagem Manual"} disable={!connected || loading} onClick={() => {
        setActivityTab('birthday');
        setActivity(!activity);
      }} />
      <ConfirmModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onClickFunction={handleSendBirthdayMessage}
      />
    </>
  );
}
export default BirthdayPage;