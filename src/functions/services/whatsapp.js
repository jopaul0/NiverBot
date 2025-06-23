import pkg from 'whatsapp-web.js';
import { sendLog } from '../utils/sendLog.js';
const { Client, LocalAuth, MessageMedia } = pkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';

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

export async function birthdayMessage(mainWindow, birthdays) {
    if (!client) {
        sendLog(mainWindow, 'Não está conectado ao WhatsApp');
        return;
    }

    sendLog(mainWindow, `Enviando mensagens de aniversário para ${birthdays.length} contatos...`);
    const media = MessageMedia.fromFilePath(path.join(process.cwd(), 'assets', 'birthday.jpeg'));

    for (const birthday of birthdays) {
        const number = birthday.phone.includes('@c.us') ? birthday.phone : `${birthday.phone}@c.us`;
        const firstName = birthday.name.split(" ")[0].toLowerCase();
        const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
        const message = `🎉 Feliz aniversário, ${formattedName}! 🎂 Desejamos a você ótimas festas!`;

        try {
            await client.sendMessage(number, media);
            await client.sendMessage(number, message);
            sendLog(mainWindow, `✅ Mensagem enviada para ${formattedName}`);
        } catch (erro) {
            sendLog(mainWindow,`❌ Erro ao enviar para ${formattedName}:${erro}`);
        }
    }
}

export function clearWhatsappSession(mainWindow) {
    const sessionPath = path.join(process.cwd(), '.wwebjs_auth');

    try {
        if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            sendLog(mainWindow, 'Sessão do WhatsApp limpa com sucesso.');
        } else {
            sendLog(mainWindow, 'Nenhuma sessão do WhatsApp encontrada.');
        }
    } catch (error) {
        sendLog(mainWindow, `Erro ao limpar sessão: ${error.message}`);
    }
}