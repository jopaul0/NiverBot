# OnTrigger

<p align="left">
  <img src="./frontend/assets/logo.png" alt="Logo" width="200" style="vertical-align: middle;"/>
  <img src="./frontend/assets/ontrigger-text.png" alt="OnTrigger Texto" height="200" style="vertical-align: middle;"/>
</p>

**OnTrigger** é uma aplicação desktop feita com **React** + **Electron** que automatiza o monitoramento de planilhas do Google e envia **mensagens automáticas no WhatsApp** com base em regras personalizadas. Um caso de uso comum é o envio de alertas para pessoas que estão devendo documentos, tudo de forma automatizada.

## ✨ Funcionalidades

- Integração com **Google Sheets** e **Google Drive**.
- Leitura automática de dados da planilha.
- Envio de mensagens no WhatsApp com base em regras.
- Interface desktop simples e leve.
- Configuração por variáveis de ambiente.

## ⚙️ Tecnologias

- [React](https://reactjs.org/)
- [Electron](https://www.electronjs.org/)
- [Google APIs (Sheets & Drive)](https://console.cloud.google.com/)
- Node.js

## 📦 Instalação

### Pré-requisitos

- [Node.js](https://nodejs.org/) instalado na máquina.
- Conta no [Google Cloud](https://console.cloud.google.com/).
- API do **Google Sheets** e **Google Drive** ativadas.
- Conta de serviço criada com permissão nas planilhas.

### Passo a passo

1. Clone o repositório:

   ```bash
    git clone https://github.com/jopaul0/OnTrigger.git
    cd OnTrigger
   ```

2. Instale as dependências principais:

    ```bash
    npm install
    ```

3. Vá até o diretório do frontend e instale as dependências:
    ```bash
    cd frontend
    npm install
    cd ..
    ```

4. Configure as variáveis de ambiente:
    Crie um arquivo .env na raiz com o seguinte conteúdo:
    ```bash
    SPREADSHEET_ID=seu_id_da_planilha
    SPREADSHEET_RANGE=nome_da_aba!A1:D100
    GOOGLE_APPLICATION_CREDENTIALS=./credenciais.json
    ```

5. Coloque o arquivo credenciais.json (baixado do Google Cloud ao criar a conta de serviço) na raiz do projeto.

6. Compartilhe sua planilha com o e-mail da conta de serviço (ex: ontrigger@nome-do-projeto.iam.gserviceaccount.com).

## 🚀 Executando o projeto
     ```bash
    npm start
     ```

## 📝 Observações

- O WhatsApp deve estar ativo na máquina ou ambiente onde o sistema for executado.
- As mensagens são geradas com base em lógica implementada no backend (você pode adaptar conforme o caso).
- Certifique-se de que a planilha está acessível pela conta de serviço.


### 💡 Criado por @jopaul0