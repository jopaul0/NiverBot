const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  saveCredentials: (jsonData) => ipcRenderer.send("save-credentials", jsonData),
  saveSheetId: (sheetId) => ipcRenderer.send('save-sheet-id', sheetId),
  minimize: () => ipcRenderer.send('window-minimize'),
  close: () => ipcRenderer.send('window-close'),
  whatsappSendBirthdayMessage: () => ipcRenderer.invoke('whatsapp-send-birthday-message'),
  cancelWhatsappConnection: () => ipcRenderer.invoke('cancel-whatsapp-connection'),
  findBirthdays: () => ipcRenderer.invoke('find-birthdays'),
  onLogMessage: (callback) => ipcRenderer.on('log-message', (event, message) => callback(message)),
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  whatsappConnect: () => ipcRenderer.invoke('whatsapp-connect'),
  whatsappDisconnect: () => ipcRenderer.invoke('whatsapp-disconnect'),
  sendLog: (message) => ipcRenderer.send('send-log', message),
  onLogMessage: (callback) => ipcRenderer.on('log-message', (event, message) => callback(message)),
  getSheetId: () => ipcRenderer.invoke('get-sheet-id'),
  onWhatsappStatus: (callback) => ipcRenderer.on('whatsapp-status', (event, status) => callback(status)),
  onWhatsappQR: (callback) => ipcRenderer.on('whatsapp-qr', (event, qr) => callback(qr)),
  clearWhatsappSession: () => ipcRenderer.invoke('whatsapp-clear-session')
});
