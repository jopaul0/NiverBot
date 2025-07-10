import { app, BrowserWindow, ipcMain } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

// Resolver caminhos corretamente
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Importações absolutas a partir da raiz do projeto (via caminho relativo)
import { connectWhatsapp, disconnectWhatsapp, clearWhatsappSession, birthdayMessage, cancelWhatsappConnection } from './services/whatsapp.js';
import { findBirthdays, getBirthdayToday, getBirthdays } from './services/googlesheets.js';
import { sendLog } from './utils/sendLog.js';
import { dataDirectoryExists, updateSpreadsheetId, readJsonFile, getAllMessages, addMessage, deleteMessage } from './utils/data.js';

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '..', 'assets', 'iconelogo.png'),
        title: 'OnTrigger',
        titleBarOverlay: {
            color: '#204A53',
            symbolColor: '#DDD9CE'
        },
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js')
        }
    });

    const isDev = !app.isPackaged;

    if (isDev) {
        mainWindow.loadURL('http://localhost:5173');
        mainWindow.webContents.openDevTools();
    } else {
        mainWindow.loadFile(path.join(__dirname, '../dist/index.html'));
    }
}

app.whenReady().then(() => {
    createWindow();

    // Handle window controls
    ipcMain.on('window-minimize', () => {
        mainWindow.minimize();
    });

    ipcMain.on('window-close', () => {
        mainWindow.close();
    });

    // Handle WhatsApp connection
    ipcMain.handle('whatsapp-connect', async () => {
        sendLog(mainWindow, '⏳ Conectando...');
        await connectWhatsapp(mainWindow);
    });

    ipcMain.handle('whatsapp-disconnect', async () => {
        await disconnectWhatsapp(mainWindow);
    });

    ipcMain.handle('whatsapp-clear-session', () => {
        clearWhatsappSession(mainWindow);
    });

    ipcMain.handle('cancel-whatsapp-connection', () => {
        cancelWhatsappConnection(BrowserWindow.getFocusedWindow());
    });

    ipcMain.handle('whatsapp-send-birthday-message-automatic', async () => {
        const birthdays = await getBirthdayToday();
        if (birthdays.length === 0) {
            mainWindow.webContents.send('log-message', 'Nenhum aniversário encontrado para hoje.');
            return;
        }
        await birthdayMessage(mainWindow, birthdays);
    });

    ipcMain.handle('whatsapp-send-birthday-message-manual', async (event, birthdays) => {
        if (birthdays.length === 0) {
            mainWindow.webContents.send('log-message', 'Nenhum aniversário encontrado para hoje.');
            return;
        }
        await birthdayMessage(mainWindow, birthdays);
    });

    // Handle Googhle Sheets connection
    ipcMain.handle('find-birthdays', async () => {
        await findBirthdays(mainWindow);
    });

    ipcMain.on('send-log', (event, message) => {
        if (mainWindow && mainWindow.webContents) {
            mainWindow.webContents.send('log-message', message);
        }
    });

    ipcMain.handle('get-birthdays', async (event, range) => {
        return await getBirthdays(range);
    });

    dataDirectoryExists(mainWindow);

    //JSON
    ipcMain.on('save-credentials', (event, jsonData) => {
        const filePath = path.join(app.getPath('userData'), 'credenciais.json');

        try {
            fs.writeFileSync(filePath, JSON.stringify(jsonData, null, 2), 'utf-8');
            sendLog(mainWindow, '✅ Arquivo credenciais.json salvo com sucesso!');
        } catch (error) {
            sendLog(mainWindow, ('❌ Erro ao salvar credenciais: ', error));
        }
    });

    ipcMain.on('save-sheet-id', (event, sheetId) => {
        updateSpreadsheetId(mainWindow, sheetId);
    });

    ipcMain.handle('get-sheet-id', async () => {
        try {
            const json = await readJsonFile();
            return json.googleSheets.spreadsheetId;
        }
        catch (error) {
            sendLog(mainWindow, 'Erro ao ler config.json:', error);
            return '';
        }
    });

    ipcMain.handle('get-all-messages', async () => {
        return await getAllMessages();
    });


    ipcMain.on('add-message', (event, type) => {
        addMessage(mainWindow, type);
    });

    ipcMain.on('delete-message', (event, type, id) => {
        deleteMessage(mainWindow, type, id);
    });

});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

