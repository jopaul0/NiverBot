import { google } from 'googleapis';
import { isBirthday, BirthdayNear } from '../utils/date.js';
import { sendLog } from '../utils/sendLog.js';
import { readJsonFile } from '../utils/data.js';
import { uniqueArray, firstName, uniqueObjArray } from '../utils/format.js';
import { app } from 'electron';
import path from 'path';
import fs from 'fs';

async function getRows(mainWindow) {
    let config;

    try {
        config = await readJsonFile(mainWindow);
    } catch (err) {
        sendLog(mainWindow, '❌ Erro ao ler config.json.');
        return [];
    }

    if (!config || !config.googleSheets) {
        sendLog(mainWindow, '❌ Configuração do Google Sheets ausente ou inválida.');
        return [];
    }

    const credentialsFullPath = path.join(app.getPath('userData'), config.googleSheets.credentialsPath);

    if (!fs.existsSync(credentialsFullPath)) {
        sendLog(mainWindow, `❌ Arquivo de credenciais não encontrado: ${credentialsFullPath}`);
        return [];
    }

    try {
        const auth = new google.auth.GoogleAuth({
            keyFile: credentialsFullPath,
            scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
        });

        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const res = await sheets.spreadsheets.values.get({
            spreadsheetId: config.googleSheets.spreadsheetId,
            range: config.googleSheets.range,
        });

        return res.data.values || [];
    } catch (err) {
        if (err?.response?.status === 403) {
            sendLog(mainWindow, '❌ Permissão negada para acessar a planilha. Verifique o compartilhamento.');
        } else {
            sendLog(mainWindow, `❌ Erro ao acessar Google Sheets: ${err.message}`);
        }
        return [];
    }
}

export async function findBirthdays(mainWindow) {
    sendLog(mainWindow, '🔍 Verificando aniversários...');
    const rows = await getRows(mainWindow);
    const birthdays = [];

    rows.forEach(row => {
        const [company, name, date, phone, status] = row;
        const [day, month, year] = date.split('/').map(Number);
        const birthday = new Date(year, month - 1, day);

        if (BirthdayNear(birthday)) {
            birthdays.push({ name, birthday, phone });
        }
    });

    const unique = uniqueArray(birthdays);

    sendLog(mainWindow, `🎉 Encontrados ${unique.length} aniversários próximos`);
    unique.forEach(birthday => {
        sendLog(mainWindow, `🎂 ${firstName(birthday.name)} - ${birthday.birthday.toLocaleDateString()} - Telefone: ${birthday.phone}`);
    });
}

export async function findBirthdaysToday(mainWindow) {
    const rows = await getRows(mainWindow);
    const birthdays = [];

    rows.forEach(row => {
        const [company, name, date, phone, status] = row;
        const [day, month, year] = date.split('/').map(Number);
        const birthday = new Date(year, month - 1, day);

        if (isBirthday(birthday)) {
            birthdays.push({ name, birthday, phone });
        }
    });

    return uniqueArray(birthdays);
}

const parseDate = (d) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0);
    return date;
};

export async function getBirthdays(range, mainWindow) {
    const rows = await getRows(mainWindow);
    const birthdays = [];

    const start = range?.startDate ? parseDate(range.startDate) : null;
    const end = range?.endDate ? parseDate(range.endDate) : null;

    rows.forEach(row => {
        const [company, name, date, phone, status] = row;
        const [day, month, year] = date.split('/').map(Number);
        const birthday = new Date(year, month - 1, day);
        birthday.setHours(0, 0, 0, 0);

        const isWithinRange =
            (!start || birthday >= start) &&
            (!end || birthday <= end);

        if (isWithinRange) {
            birthdays.push({ name, date: birthday, phone });
        }
    });

    return uniqueObjArray(birthdays) || [];
}

export async function getBirthdayToday(mainWindow) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const range = {
        startDate: today.toISOString(),
        endDate: today.toISOString()
    };

    const birthdays = await getBirthdays(range, mainWindow);
    return birthdays || [];
}
