import Button from "@/components/Button";
const DocumentsPage = ({ connected, setConnected, setActivity, activity, setActivityTab }) => {
  return (
    <>
      <article>
        <h1>Documentos</h1>
        <p>Busque os documentos pendentes!</p>
      </article>
      <Button message={"Em Breve"} onClick={() => {
        setActivityTab('documents');
        setActivity(!activity);
      }} />
    </>
  );
}
export default DocumentsPage;