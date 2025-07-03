import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { connectWhatsapp, disconnectWhatsapp, clearWhatsappSession, birthdayMessage, cancelWhatsappConnection } from "../src/functions/services/whatsapp.js";
import { findBirthdays, getBirthdayToday, getBirthdays } from '../src/functions/services/googlesheets.js';
import { sendLog } from '../src/functions/utils/sendLog.js';
import { dataDirectoryExists, updateSpreadsheetId, readJsonFile } from '../src/functions/utils/data.js';
import fs from 'fs'



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        frame: true,
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

    const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:5173';
    mainWindow.loadURL(startUrl);

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

    ipcMain.handle('whatsapp-send-birthday-message', async () => {
        const birthdays = await getBirthdayToday();
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

    ipcMain.handle('get-birthdays', async () => {
        return await getBirthdays();
    });

    dataDirectoryExists(mainWindow);

    ipcMain.on('save-credentials', (event, jsonData) => {
        const filePath = path.join(process.cwd(), 'data', 'credenciais.json');

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

