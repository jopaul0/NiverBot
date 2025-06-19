import Button from "../components/Button";
const DocumentsPage = () => {
  return (
    <>
      <article>
        <h1>Documentos</h1>
        <p>Busque os documentos pendentes!</p>
      </article>
      <Button message={"Documentos Pendentes"} />
      <Button message={"Enviar Mensagem"} />
    </>
  );
}
export default DocumentsPage;