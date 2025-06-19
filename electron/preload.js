const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onLogMessage: (callback) => ipcRenderer.on('log-message', (event, message) => callback(message)),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  whatsappConnect: () => ipcRenderer.invoke('whatsapp-connect'),
  whatsappDisconnect: () => ipcRenderer.invoke('whatsapp-disconnect'),
  sendLog: (message) => ipcRenderer.send('send-log', message),
  onLogMessage: (callback) => ipcRenderer.on('log-message', (event, message) => callback(message)),
  onWhatsappStatus: (callback) => ipcRenderer.on('whatsapp-status', (event, status) => callback(status)),
  onWhatsappQR: (callback) => ipcRenderer.on('whatsapp-qr', (event, qr) => callback(qr)),
});
