import Button from "../components/Button";

const WhatsappPage = () => {
  return (
    <>
      <article>
        <h1>WhatsApp</h1>
        <p>Envie mensagens automáticas!</p>
      </article>
      <Button message={"Conectar ao WhatsApp"} />
      <Button message={"Desconectar"} />
    </>
  );
}
export default WhatsappPage;