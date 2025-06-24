import pkg from 'whatsapp-web.js';
import { sendLog } from '../utils/sendLog.js';
const { Client, LocalAuth, MessageMedia } = pkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import { get } from 'http';
import { getMessage } from '../utils/messages.js';

let client = null;
let cancelConnectionRequested = false;

export async function connectWhatsapp(mainWindow) {

    if (client && client.info) {
        sendLog(mainWindow, '✅ Já está conectado');
        return;
    }
    cancelConnectionRequested = false;
    client = new Client({
        authStrategy: new LocalAuth(),
    });

    client.on('ready', () => {
        mainWindow.webContents.send('whatsapp-status', true);
        sendLog(mainWindow, '✅ WhatsApp pronto e conectado!');
    });

    client.on('disconnected', () => {
        mainWindow.webContents.send('whatsapp-status', false);
        sendLog(mainWindow, '❌ WhatsApp desconectado');
        client = null;
    });

    client.on('qr', (qr) => {
        if (cancelConnectionRequested) return;
        mainWindow.webContents.send('whatsapp-qr', qr);
        sendLog(mainWindow, '📱 QR Code recebido, escaneie com seu celular');

        qrcode.generate(qr, { small: true }, (qrAscii) => {
            sendLog(mainWindow, qrAscii);
        });
    });

    try {
        await client.initialize();
    } catch (error) {
        sendLog(mainWindow, `❌ Erro ao inicializar o WhatsApp: ${error.message}`);
    }

}

export async function cancelWhatsappConnection(mainWindow) {
    if (client) {
        cancelConnectionRequested = true;
        sendLog(mainWindow, '⚠️ Cancelando tentativa de conexão...');
        try {
            await client.destroy();
        } catch (err) {
            sendLog(mainWindow, `❌ Erro ao cancelar conexão: ${err.message}`);
        }
        client = null;
        mainWindow.webContents.send('whatsapp-status', false);
        sendLog(mainWindow, '❌ Conexão cancelada.');
    } else {
        sendLog(mainWindow, '⚠️ Nenhuma conexão em andamento.');
    }
}

export async function disconnectWhatsapp(mainWindow) {
    if (!client) {
        sendLog(mainWindow, '❌ Não está conectado');
        return;
    }

    await client.destroy();
    client = null;
    mainWindow.webContents.send('whatsapp-status', false);
    sendLog(mainWindow, '✅ Desconectado');
}

export async function birthdayMessage(mainWindow, birthdays) {
    if (!client) {
        sendLog(mainWindow, '❌ Não está conectado ao WhatsApp');
        return;
    }

    sendLog(mainWindow, `Enviando mensagens de aniversário para ${birthdays.length} contatos...`);
    const media = MessageMedia.fromFilePath(path.join(process.cwd(), 'assets', 'birthday.jpeg'));

    for (const birthday of birthdays) {
        const rawNumber = birthday.phone.replace(/\D/g, ''); // remove qualquer caractere não numérico
        const firstName = birthday.name.split(" ")[0].toLowerCase();
        const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

        try {
            const numberId = await client.getNumberId(rawNumber);
            if (!numberId) {
                sendLog(mainWindow, `⚠️ ${formattedName} não está no WhatsApp.`);
                continue;
            }

            await client.sendMessage(numberId._serialized, media);
            await client.sendMessage(numberId._serialized, getMessage(formattedName));
            sendLog(mainWindow, `✅ Mensagem enviada para ${formattedName}`);
        } catch (error) {
            sendLog(mainWindow, `❌ Erro ao enviar para ${formattedName}: ${error.message || error}`);
        }
    }
}


export function clearWhatsappSession(mainWindow) {
    const sessionPath = path.join(process.cwd(), '.wwebjs_auth');

    try {
        if (fs.existsSync(sessionPath)) {
            fs.rmSync(sessionPath, { recursive: true, force: true });
            sendLog(mainWindow, '✅ Sessão do WhatsApp limpa com sucesso.');
        } else {
            sendLog(mainWindow, '✅ Nenhuma sessão do WhatsApp encontrada.');
        }
    } catch (error) {
        sendLog(mainWindow, `❌ Erro ao limpar sessão: ${error.message}`);
    }
}