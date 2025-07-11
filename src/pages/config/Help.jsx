import Collapse from "@/components/Collapse";

export default function HelpPage() {
    const questions = [
        {
            question: "O que é o OnTrigger?",
            answer: "OnTrigger é um aplicativo desktop para envio de mensagens de aniversário via WhatsApp, usando dados de uma planilha Google Sheets."
        },
        {
            question: "Como o OnTrigger envia as mensagens?",
            answer: "Ele pode enviar mensagens individualmente ou automaticamente para todos que fazem aniversário no dia, lendo os dados da planilha."
        },
        {
            question: "Como devo estruturar minha planilha do Google Sheets?",
            answer: "Sua planilha deve conter colunas organizadas conforme o padrão do sistema (ex: empresa, nome, data, telefone, status). Evite renomear ou mover colunas sem conhecimento técnico para não comprometer a leitura dos dados."
        },
        {
            question: "Qual o formato correto para a data de nascimento?",
            answer: "A data de nascimento deve estar no formato dd/mm/aaaa para que o sistema possa interpretá-la corretamente."
        },
        {
            question: "Como devo preencher o número de telefone?",
            answer: "Insira apenas números, incluindo o código do país (DDI 55 para Brasil), seguido do DDD e do número, sem espaços, parênteses ou símbolos."
        },
        {
            question: "O que é a conta de serviço do Google e por que preciso dela?",
            answer: "É uma conta automatizada que permite ao OnTrigger acessar a API do Google Sheets para ler os dados. Sem essa conta, o app não consegue acessar sua planilha."
        },
        {
            question: "Como criar e configurar a conta de serviço do Google?",
            answer: "Você pode criar a conta de serviço no Google Cloud Console e gerar o arquivo credenciais.json. Depois, compartilhe sua planilha com o e-mail dessa conta para permitir o acesso."
        },
        {
            question: "O que é o arquivo credenciais.json e para que serve?",
            answer: "É o arquivo que contém as chaves e permissões da conta de serviço. É obrigatório para o OnTrigger acessar a planilha do Google Sheets."
        },
        {
            question: "Onde devo colocar o arquivo credenciais.json no OnTrigger?",
            answer: "Você deve enviar o arquivo pela interface do OnTrigger, normalmente na área de upload (dropzone) indicada."
        },
        {
            question: "Como obter o ID da minha planilha do Google Sheets?",
            answer: "O ID é a parte da URL da planilha que fica entre '/d/' e '/edit'. Exemplo: https://docs.google.com/spreadsheets/d/**SEU_ID**/edit"
        },
        {
            question: "Quais permissões a conta de serviço precisa para acessar a planilha?",
            answer: "A conta de serviço precisa ter permissão de leitura (ou edição, se desejar) na planilha. Isso é feito compartilhando a planilha com o e-mail da conta de serviço."
        },
        {
            question: "Por que minha planilha não está sendo lida pelo OnTrigger?",
            answer: "Pode ser por erro no ID da planilha, ausência do arquivo credenciais.json, ou falta de permissão da conta de serviço na planilha."
        },
        {
            question: "O que significa o erro 'Permissão negada' ao acessar a planilha?",
            answer: "Significa que o OnTrigger não tem acesso porque a planilha não foi compartilhada corretamente com a conta de serviço."
        },
        {
            question: "O que faço se o arquivo credenciais.json estiver inválido ou corrompido?",
            answer: "Baixe novamente o arquivo no Google Cloud Console e faça o upload no OnTrigger."
        },
        {
            question: "Como o OnTrigger identifica quem faz aniversário hoje?",
            answer: "Ele compara a data atual com as datas na planilha, considerando apenas o dia e o mês."
        },
        {
            question: "Posso personalizar as mensagens de aniversário?",
            answer: "Sim, as mensagens podem ser editadas no arquivo de configuração do OnTrigger para incluir textos personalizados."
        },
        {
            question: "Como funciona o envio automático de mensagens?",
            answer: "O sistema verifica diariamente a planilha e envia as mensagens para todos que fazem aniversário naquele dia."
        },
        {
            question: "Posso desativar temporariamente o envio automático?",
            answer: "Atualmente não há essa opção, mas ela pode ser incluída em futuras atualizações."
        },
        {
            question: "Como sei se as mensagens foram enviadas com sucesso?",
            answer: "Você pode acompanhar os logs do sistema que indicam o status dos envios."
        },
        {
            question: "O que devo fazer se o envio não funcionar?",
            answer: "Verifique o arquivo credenciais.json, o ID da planilha, permissões, e os logs para identificar possíveis erros."
        },
        {
            question: "Posso enviar mensagens para aniversariantes de outras datas que não hoje?",
            answer: "Por enquanto, o OnTrigger só envia mensagens automaticamente para aniversariantes do dia atual, mas o envio individual pode ser feito manualmente."
        }
    ];

    return (

        <div className="help-content">
            {questions.map((item, idx) => (
                <Collapse key={idx} title={item.question}>
                    {item.answer}
                </Collapse>
            ))}
        </div>

    );
}