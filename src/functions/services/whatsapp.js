import pkg from 'whatsapp-web.js';
import { sendLog } from '../utils/sendLog.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';

let client = null;

export function connectWhatsapp(mainWindow) {
    if (client && client.info) {
        sendLog(mainWindow, 'Já está conectado');
        return;
    }

    client = new Client({
        authStrategy: new LocalAuth(),
    });

    client.on('ready', () => {
        mainWindow.webContents.send('whatsapp-status', true);
        sendLog(mainWindow, 'WhatsApp pronto e conectado!');
    });

    client.on('disconnected', () => {
        mainWindow.webContents.send('whatsapp-status', false);
        sendLog(mainWindow, 'WhatsApp desconectado');
        client = null;
    });

    client.on('qr', (qr) => {
        mainWindow.webContents.send('whatsapp-qr', qr);
        sendLog(mainWindow, 'QR Code recebido, escaneie com seu celular');

        qrcode.generate(qr, { small: true }, (qrAscii) => {
            // Envia o QR Code ASCII para o frontend
            sendLog(mainWindow, qrAscii);
        });
    });

    client.initialize();

    sendLog(mainWindow, 'Conectando...');
}

export async function disconnectWhatsapp(mainWindow) {
    if (!client) {
        sendLog(mainWindow, 'Não está conectado');
        return;
    }

    await client.destroy();
    client = null;
    mainWindow.webContents.send('whatsapp-status', false);
    sendLog(mainWindow, 'Desconectado');
}