const { contextBridge } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  startBot: () => {
    console.log('Bot iniciado (isso está vindo do preload.js)');
  }
});
