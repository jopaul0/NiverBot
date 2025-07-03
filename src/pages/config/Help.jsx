import Collapse from "@/components/Collapse";

export default function HelpPage() {
    const quetions = [
        {
            question: "Como devo estruturar minha planilha do Google Sheets?",
            answer: "Sua planilha deve conter colunas organizadas conforme o padrão do sistema. Evite renomear ou mover colunas sem conhecimento técnico."
        },
        {
            question: "Qual o formato correto para a data de nascimento?",
            answer: "A data de nascimento deve estar no formato dd/mm/aaaa."
        },
        {
            question: "Como devo preencher o número de telefone?",
            answer: "Insira apenas números, incluindo o DDI do Brasil (55), seguido do DDD e do número, sem espaços ou símbolos."
        },
        {
            question: "Preciso compartilhar minha planilha com a conta de serviço?",
            answer: "Sim. Compartilhe a planilha com o e-mail da conta de serviço como se estivesse compartilhando com uma pessoa comum."
        },
        {
            question: "Como encontro o ID da minha planilha?",
            answer: "O ID fica na URL da planilha, entre ' / d / ' e ' / edit'. Exemplo: https://docs.google.com/spreadsheets/d/**SEU_ID**/edit"
        },
        {
            question: "Como o sistema sabe quando enviar as mensagens?",
            answer: "O sistema verifica diariamente se há aniversariantes com base nas datas da planilha."
        },
        {
            question: "O que é enviado na mensagem de aniversário?",
            answer: "Uma mensagem personalizada de aniversário, que pode conter texto e imagem."
        },
        {
            question: "É possível personalizar as mensagens de aniversário?",
            answer: "Sim. As mensagens podem ser editadas diretamente no arquivo de configuração."
        },
        {
            question: "Consigo desativar o envio automático temporariamente?",
            answer: "Atualmente não, mas em futuras atualizações essa opção pode estar disponível."
        },
        {
            question: "O que é a conta de serviço do Google e como criar uma?",
            answer: "É uma conta automatizada usada para acesso a APIs. Você pode criá-la pelo Google Cloud Console."
        },
        {
            question: "O que é o arquivo credenciais.json e como gerá-lo?",
            answer: "É um arquivo que contém as credenciais da conta de serviço. Você o baixa ao criar a conta no Google Cloud."
        },
        {
            question: "Onde devo colocar o arquivo de credenciais no sistema?",
            answer: "No campo indicado na interface, normalmente uma área de upload ou dropzone."
        },
        {
            question: "Por que minha planilha não está sendo lida?",
            answer: "Verifique se o ID está correto e se a conta de serviço tem acesso."
        },
        {
            question: "O que significa o erro 'Permissão negada'?",
            answer: "Significa que a planilha não está compartilhada com a conta de serviço corretamente."
        },
        {
            question: "Como sei se o envio automático está funcionando corretamente?",
            answer: "Você pode acompanhar os logs pelo sistema ou verificar se os aniversariantes receberam as mensagens."
        }
    ];
    return (
        
            <div className="help-content">
                {quetions.map((item, idx) => (
                    <Collapse key={idx} title={item.question}>
                        {item.answer}
                    </Collapse>
                ))}
            </div>
        
    );
}