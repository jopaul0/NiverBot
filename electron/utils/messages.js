import Chance from "chance";
import fs from 'fs';
import path from 'path';
import { app } from 'electron';

export function getMessage(name, date) {
    const configPath = path.join(app.getPath('userData'), 'config.json');
    const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));

    // Normaliza datas para comparação
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffInTime = targetDate.getTime() - today.getTime();
    const diffInDays = Math.floor(diffInTime / (1000 * 60 * 60 * 24));

    let type;
    if (diffInDays > 0) {
        type = 'earlyBirthday';
    } else if (diffInDays === 0) {
        type = 'birthday';
    } else {
        type = 'lateBirthday';
    }

    const messages = config.whatsapp.messages[type];

    if (!messages || messages.length === 0) {
        console.log("⚠️ Nenhuma mensagem encontrada para esse tipo.");
        return `Nenhuma mensagem disponível para o tipo "${type}".`;
    }

    const chance = new Chance();
    const randomIndex = chance.integer({ min: 0, max: messages.length - 1 });
    const selectedMessage = messages[randomIndex];

    return selectedMessage.text.replace(/\$\{name\}/g, name);
}
