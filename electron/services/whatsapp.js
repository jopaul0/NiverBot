import pkg from 'whatsapp-web.js';
import { sendLog } from '../utils/sendLog.js';
import { app } from 'electron';
const { Client, LocalAuth, MessageMedia } = pkg;
import qrcode from 'qrcode-terminal';
import fs from 'fs';
import path from 'path';
import { getMessage } from '../utils/messages.js';


let client = null;
let cancelConnectionRequested = false;

function getChromiumExecutablePath() {
    const chromePaths = [
        'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
        'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
        'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    ];

    for (const p of chromePaths) {
        if (fs.existsSync(p)) return p;
    }

    return null;
}

export async function connectWhatsapp(mainWindow) {
    if (client && client.info) {
        sendLog(mainWindow, '✅ Já está conectado');
        return;
    }

    cancelConnectionRequested = false;

    client = new Client({
        authStrategy: new LocalAuth({
            dataPath: path.join(app.getPath('userData'), '.wwebjs_auth')
        }),
        puppeteer: {
            executablePath: getChromiumExecutablePath(),
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
        },
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
        qrcode.generate(qr, { small: true }, qrAscii => sendLog(mainWindow, qrAscii));
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

    const userDataPath = app.getPath('userData');
    const configPath = path.join(userDataPath, 'config.json');
    let mediaFileName = 'birthday.jpeg'; // fallback padrão

    try {
        const configRaw = fs.readFileSync(configPath, 'utf-8');
        const config = JSON.parse(configRaw);
        if (config?.whatsapp?.mediaPath) {
            mediaFileName = config.whatsapp.mediaPath;
        }
    } catch (err) {
        sendLog(mainWindow, `❌ Erro ao ler config.json para obter a imagem: ${err.message}`);
    }

    const mediaPath = path.join(userDataPath, mediaFileName);

    if (!fs.existsSync(mediaPath)) {
        sendLog(mainWindow, `❌ Imagem não encontrada no caminho: ${mediaPath}`);
        return;
    }

    const media = MessageMedia.fromFilePath(mediaPath);

    for (const birthday of birthdays) {
        const rawNumber = birthday.phone.replace(/\D/g, '');
        const firstName = birthday.name.split(" ")[0].toLowerCase();
        const formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);

        try {
            const numberId = await client.getNumberId(rawNumber);
            if (!numberId) {
                sendLog(mainWindow, `⚠️ ${formattedName} não está no WhatsApp.`);
                continue;
            }

            await client.sendMessage(numberId._serialized, media);
            await client.sendMessage(numberId._serialized, getMessage(formattedName, birthday.date));
            sendLog(mainWindow, `✅ Mensagem enviada para ${formattedName}`);
        } catch (error) {
            sendLog(mainWindow, `❌ Erro ao enviar para ${formattedName}: ${error.message || error}`);
        }
    }
}

export function clearWhatsappSession(mainWindow) {
    const sessionPath = path.join(app.getPath('userData'), '.wwebjs_auth'); // ✅ caminho certo

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
