import { app, BrowserWindow } from "electron";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow() {
    const win = new BrowserWindow({
        width: 1000,
        height: 800,
        resizable: false,
        icon: path.join(__dirname, '..', 'src', 'assets', 'logo.png'),
        title: 'OnTrigger',
        titleBarOverlay: {
            color: '#204A53',
            symbolColor: '#DDD9CE'
        },
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            preload: path.join(__dirname, 'preload.js') // Opcional
        }
    });

    const startUrl = process.env.ELECTRON_START_URL || 'http://localhost:5173';
    win.loadURL(startUrl);
    win.setMenu(null);
}

app.whenReady().then(createWindow);


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
