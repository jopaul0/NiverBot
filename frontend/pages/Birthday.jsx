import Button from "../components/Button";
const BirthdayPage = () => {
  return (
    <>
      <article>
        <h1>Aniversários</h1>
        <p>Busque os aniversariantes do dia!</p>
      </article>
      <Button message={"Aniversários Hoje"} />
      <Button message={"Aniversários Próximos"} />
      <Button message={"Enviar Mensagem"} />
    </>
  );
}
export default BirthdayPage;