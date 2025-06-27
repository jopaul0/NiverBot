import { useState } from "react";
import Dropzone from "../../components/Dropzone";
import Button from "../../components/Button";
import { ErrorModal, SuccessModal } from "../../components/Modal"


export default function CredencialPage() {
    const [jsonData, setJsonData] = useState(null);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!jsonData) {
            setError(true);
            return;
        }
        window.electronAPI.saveCredentials(jsonData);
        setSuccess(true);
    };

    return (
        <>
            <div className="page-content">
                <div className="left">
                    <h2>Conta de Serviço do Google</h2>
                    <p>
                        Para que o sistema consiga acessar a planilha do Google Sheets, é necessário utilizar uma conta de serviço do Google. Essa conta funciona como um usuário automatizado que pode se conectar à API do Google e ler ou editar dados conforme permissões concedidas.
                    </p>
                    <p>
                        Você pode criar uma conta de serviço no Google Cloud Console e gerar uma chave no formato JSON. Depois, compartilhe sua planilha com o e-mail da conta de serviço como se estivesse compartilhando com qualquer outro usuário.
                    </p>
                    <p>
                        <a
                            href="https://cloud.google.com/iam/docs/service-accounts"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Saiba mais sobre contas de serviço →
                        </a>
                    </p>
                </div>

                <div className="right">
                    <h2>Arquivo credenciais.json</h2>
                    <p>
                        O arquivo credenciais.json guarda os dados da sua conta de serviço, como o e-mail e a chave de acesso.
                    </p>
                    <p>
                        Lembre-se de compartilhar a planilha com o e-mail da conta de serviço para que ela tenha acesso.
                    </p>
                    <p>Arraste o arquivo <code>credenciais.json</code> aqui ou clique para selecionar.</p>

                    <form onSubmit={handleSubmit}>
                        <Dropzone onFileRead={setJsonData} />
                        <Button message="Enviar Arquivo" type="submit" />
                    </form>
                </div>
            </div>
            <SuccessModal isOpen={success} onClose={() => setSuccess(false)} message="Arquivo enviado com sucesso!" />
            <ErrorModal isOpen={error} onClose={() => setError(false)} message="Ocorreu um erro." />
        </>

    );
}
