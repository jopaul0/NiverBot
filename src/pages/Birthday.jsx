import Button from "../components/Button";
import { useState } from "react";

const BirthdayPage = ({ connected }) => {

  const [loading, setLoading] = useState(false);

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

  return (
    <>
      <article>
        <h1>Aniversários</h1>
        <p>Busque os aniversariantes do dia!</p>
      </article>
      <Button message={"Consultar Aniversários"} onClick={handleFindBirthdays} />
      <Button message={"Mandar Mensagem"} disable={!connected} />
      <Button message={"Adiantar Mensagem"} disable={!connected} />
    </>
  );
}
export default BirthdayPage;