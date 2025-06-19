import Button from "../components/Button";

const WhatsappPage = ({ connected, setConnected }) => {
  return (
    <>
      <article>
        <h1>WhatsApp</h1>
        <p>Envie mensagens automáticas!</p>
      </article>
      <Button message={"Conectar ao WhatsApp"} disable={connected}/>
      <Button message={"Desconectar"} disable={!connected}/>
    </>
  );
}
export default WhatsappPage;