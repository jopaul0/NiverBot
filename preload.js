const { contextBridge } = require('electron');

// Aqui você pode expor funções ou dados do Node.js para o frontend
contextBridge.exposeInMainWorld('electronAPI', {
  // exemplo: função fictícia para iniciar o bot
  startBot: () => {
    console.log('Bot iniciado (isso está vindo do preload.js)');
  }
});
