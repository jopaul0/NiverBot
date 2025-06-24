import dotenv from 'dotenv';
import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import { connectWhatsapp, disconnectWhatsapp } from "../src/functions/services/whatsapp.js";
import { clearWhatsappSession } from '../src/functions/services/whatsapp.js';
import { findBirthdays } from '../src/functions/services/googlesheets.js';



const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPath = path.resolve(__dirname, '../.env');
dotenv.config({ path: envPath });

let mainWindow = null;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        frame: false,
        icon: path.join(__dirname, '..', 'assets', 'logo.png'),
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
    mainWindow.setMenu(null);
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
        await connectWhatsapp(mainWindow);
    });

    ipcMain.handle('whatsapp-disconnect', async () => {
        await disconnectWhatsapp(mainWindow);
    });

    ipcMain.handle('whatsapp-clear-session', () => {
        clearWhatsappSession(mainWindow);
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

