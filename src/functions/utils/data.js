import { sendLog } from "./sendLog.js";
import fs from 'fs';
import path from "path";

const defaultConfig = {
    appName: "OnTrigger",
    version: "0.1.0",
    whatsapp: {
        messages: [],
        mediaPath: "birthday.jpeg"
    },
    googleSheets: {
        spreadsheetId: "",
        range: "",
        credentialsPath: ""
    },
    ui: {
        theme: "light",
        language: "pt-BR"
    }
};

export const dataDirectoryExists = (mainWindow) => {
    const dataPath = path.join(process.cwd(), 'data');

    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
        sendLog(mainWindow, '📁 Pasta "data" criada com sucesso.');
    }

    const configPath = path.join(dataPath, 'config.json');

    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
        sendLog(mainWindow, '📝 Arquivo "config.json" criado com dados padrão.');
    }

    return dataPath;
};

export async function readJsonFile(mainWindow) {
    const filePath = path.join(process.cwd(), 'data', 'config.json');

    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        sendLog(mainWindow, `❌ Erro ao ler o arquivo config.json: ${error.message}`);
        return null;
    }
}
