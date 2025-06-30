import { sendLog } from "./sendLog.js";
import fs from 'fs';
import path from "path";

const defaultConfig = {
    appName: "OnTrigger",
    version: "0.1.0",
    whatsapp: {
        "messages": [
            "🎉 Feliz aniversário, ${name}! 🎂\nDesejamos a você um novo ciclo cheio de saúde, sucesso e muitas conquistas. Que a prosperidade caminhe com você, e saiba que pode contar com a gente! ✨\nCom carinho, OnVale Contabilidade.",
            "🎉 ${name}, parabéns pelo seu dia! 🥳\nNós, da Onvale Contabilidade, desejamos um novo ciclo cheio de saúde, sucesso e realizações. Que a vida te surpreenda positivamente em cada etapa, e que possamos seguir juntos, contribuindo para o seu crescimento!✨\nFeliz aniversário! 🎂",
            "🎉 ${name}, Hoje é dia de comemorar! 🎉\nA equipe da Onvale Contabilidade te deseja um aniversário incrível, cheio de alegrias, conquistas e motivos para sorrir. Que esse novo ciclo venha com ainda mais prosperidade. Conte com a gente nessa jornada!✨\nFelicidades! 🥳"
        ],
        mediaPath: "birthday.jpeg"
    },
    googleSheets: {
        spreadsheetId: "",
        range: "Página1!A2:E",
        credentialsPath: "data/credenciais.json"
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

export function updateSpreadsheetId(mainWindow, newId) {
    try {
        const configPath = path.join(process.cwd(), 'data', 'config.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        config.googleSheets.spreadsheetId = newId;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
        sendLog(mainWindow, '✅ ID atualizado com sucesso!');
    } catch (err) {
        sendLog(mainWindow, '❌ Erro ao atualizar config.json:', err.message);
    }
}
