import { app } from 'electron';
import { sendLog } from "./sendLog.js";
import fs from 'fs';
import path from "path";

const defaultConfig = {
    whatsapp: {
        "messages": {
            lateBirthday: [
                "🎉 Parabéns atrasado, ${name}! 🕒\nSabemos que a mensagem chegou um pouquinho depois, mas o carinho é o mesmo! Que seu novo ciclo seja repleto de saúde, realizações e prosperidade. ✨\nCom afeto, equipe OnVale Contabilidade.",
                "🥳 Mesmo com um pequeno atraso, não poderíamos deixar de celebrar você, ${name}!\nDesejamos um novo ano cheio de vitórias, felicidade e crescimento pessoal e profissional. Que possamos continuar juntos nessa jornada! 🎂\nUm forte abraço da OnVale Contabilidade.",
                "🎂 ${name}, o tempo passou, mas o desejo de felicidades permanece! ⏳\nParabéns atrasado! Que sua vida seja guiada por boas oportunidades, saúde e muita luz. Conte sempre com a gente! 💼\nAtenciosamente, OnVale Contabilidade."
            ],
            birthday: [
                "🎉 Feliz aniversário, ${name}! 🎂\nDesejamos a você um novo ciclo cheio de saúde, sucesso e muitas conquistas. Que a prosperidade caminhe com você, e saiba que pode contar com a gente! ✨\nCom carinho, OnVale Contabilidade.",
                "🎉 ${name}, parabéns pelo seu dia! 🥳\nNós, da Onvale Contabilidade, desejamos um novo ciclo cheio de saúde, sucesso e realizações. Que a vida te surpreenda positivamente em cada etapa, e que possamos seguir juntos, contribuindo para o seu crescimento!✨\nFeliz aniversário! 🎂",
                "🎉 ${name}, Hoje é dia de comemorar! 🎉\nA equipe da Onvale Contabilidade te deseja um aniversário incrível, cheio de alegrias, conquistas e motivos para sorrir. Que esse novo ciclo venha com ainda mais prosperidade. Conte com a gente nessa jornada!✨\nFelicidades! 🥳"
            ],
            earlyBirthday: [
                "🎉 Antecipando as comemorações, ${name}? 😄\nJá queremos te desejar um aniversário incrível, cheio de saúde, alegria e muito sucesso. Que seu novo ciclo traga ainda mais conquistas!✨\nCom carinho, OnVale Contabilidade.",
                "🥳 Está chegando o grande dia, ${name}!\nDesde já, desejamos que seu aniversário seja especial e que o novo ano venha cheio de oportunidades, crescimento e felicidades. 🎂\nConte conosco sempre! — OnVale Contabilidade.",
                "🎂 Faltam poucos dias, ${name}, mas a gente não quis esperar! 🎈\nDesejamos desde já um feliz aniversário cheio de motivos para sorrir e prosperar. Que sua caminhada seja sempre iluminada! ✨\nEquipe OnVale Contabilidade."
            ]
        },
        mediaPath: "birthday.jpeg"
    },
    googleSheets: {
        spreadsheetId: "",
        range: "Página1!A2:E",
        credentialsPath: "./credenciais.json"
    }
};

export const dataDirectoryExists = (mainWindow) => {
    const dataPath = app.getPath('userData');
    if (!fs.existsSync(dataPath)) {
        fs.mkdirSync(dataPath, { recursive: true });
        sendLog(mainWindow, '📁 Pasta "data" (userData) criada com sucesso.');
    }

    const configPath = path.join(dataPath, 'config.json');

    if (!fs.existsSync(configPath)) {
        fs.writeFileSync(configPath, JSON.stringify(defaultConfig, null, 2), 'utf-8');
        sendLog(mainWindow, '📝 Arquivo "config.json" criado com dados padrão.');
    }

    const imageDestPath = path.join(dataPath, 'birthday.jpeg');
    const imageSourcePath = path.join(process.resourcesPath, 'app.asar.unpacked', 'assets', 'birthday.jpeg');

    if (!fs.existsSync(imageDestPath)) {
        try {
            fs.copyFileSync(imageSourcePath, imageDestPath);
            sendLog(mainWindow, '🖼️ Imagem "birthday.jpeg" copiada para a pasta de dados.');
        } catch (error) {
            sendLog(mainWindow, `❌ Erro ao copiar imagem birthday.jpeg: ${error.message}`);
        }
    }

    return dataPath;
};

export async function readJsonFile(mainWindow) {
    const filePath = path.join(app.getPath('userData'), 'config.json');

    try {
        const data = await fs.promises.readFile(filePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        sendLog(mainWindow, `❌ Erro ao ler o arquivo config.json: ${error.message}`);
        return null;
    }
}

export function updateSpreadsheetId(mainWindow, newId) {
    const configPath = path.join(app.getPath('userData'), 'config.json');

    try {
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        config.googleSheets.spreadsheetId = newId;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), 'utf-8');
        sendLog(mainWindow, '✅ ID atualizado com sucesso!');
    } catch (err) {
        sendLog(mainWindow, `❌ Erro ao atualizar config.json: ${err.message}`);
    }
}

export function updateMessage(mainWindow, type, index, message) {
    const configPath = path.join(app.getPath("userData"), "config.json");

    try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

        if (!config.whatsapp?.messages?.[type]) {
            sendLog(mainWindow, `❌ Tipo de mensagem '${type}' não encontrado.`);
            return;
        }

        if (index < 0 || index >= config.whatsapp.messages[type].length) {
            sendLog(mainWindow, `❌ Índice inválido para o tipo '${type}'.`);
            return;
        }

        config.whatsapp.messages[type][index] = message;

        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
        sendLog(mainWindow, "✅ Mensagem atualizada com sucesso!");
    } catch (err) {
        sendLog(mainWindow, `❌ Erro ao atualizar config.json: ${err.message}`);
    }
}

export function addMessage(mainWindow, type, newMessage = 'Clique aqui para editar essa mensagem!') {
    const configPath = path.join(app.getPath("userData"), "config.json");

    try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

        if (!config.whatsapp?.messages?.[type]) {
            sendLog(mainWindow, `❌ Tipo de mensagem '${type}' não encontrado.`);
            return;
        }
        config.whatsapp.messages[type].push(newMessage);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");
        sendLog(mainWindow, "✅ Nova mensagem adicionada com sucesso!");
    } catch (err) {
        sendLog(mainWindow, `❌ Erro ao adicionar mensagem: ${err.message}`);
    }
}

export function deleteMessage(mainWindow, type, index) {
    const configPath = path.join(app.getPath("userData"), "config.json");

    try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

        const messages = config.whatsapp?.messages?.[type];

        if (!messages) {
            sendLog(mainWindow, `❌ Tipo de mensagem '${type}' não encontrado.`);
            return;
        }

        if (messages.length === 1) {
            sendLog(mainWindow, `⚠️ Não é possível excluir a única mensagem do tipo '${type}'.`);
            return;
        }

        if (index < 0 || index >= messages.length) {
            sendLog(mainWindow, `❌ Índice inválido para o tipo '${type}'.`);
            return;
        }
        const removed = messages.splice(index, 1);
        fs.writeFileSync(configPath, JSON.stringify(config, null, 2), "utf-8");

        sendLog(mainWindow, `✅ Mensagem removida com sucesso: "${removed[0].slice(0, 30)}..."`);
    } catch (err) {
        sendLog(mainWindow, `❌ Erro ao deletar mensagem: ${err.message}`);
    }
}

export async function getAllMessages() {
    const configPath = path.join(app.getPath("userData"), "config.json");
    try {
        const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));
        const messages = config.whatsapp?.messages;
        return messages;
    } catch (err) {
        sendLog(mainWindow, `❌ Erro ao ler mensagens: ${err.message}`);
    }
}