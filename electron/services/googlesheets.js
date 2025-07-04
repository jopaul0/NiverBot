import { google } from 'googleapis';
import { isBirthday, BirthdayNear } from '../utils/date.js';
import { sendLog } from '../utils/sendLog.js';
import { readJsonFile } from '../utils/data.js';
import { uniqueArray, firstName, uniqueObjArray } from '../utils/format.js';
import { app } from 'electron';
import path from 'path';

async function getRows(mainWindow) {
    const config = await readJsonFile(mainWindow);

    if (!config || !config.googleSheets) {
        throw new Error('❌ Configuração do Google Sheets ausente ou inválida.');
    }

    const auth = new google.auth.GoogleAuth({
        keyFile: path.join(app.getPath('userData'), config.googleSheets.credentialsPath),
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: config.googleSheets.spreadsheetId,
        range: config.googleSheets.range,
    });

    const rows = res.data.values;
    return rows || [];
}

export async function findBirthdays(mainWindow) {
    sendLog(mainWindow, '🔍 Verificando aniversários...');
    const rows = await getRows();
    const birthdays = [];

    rows.forEach(row => {
        const [company, name, date, phone, status] = row;
        const info = date.split('/');
        const day = parseInt(info[0]);
        const month = parseInt(info[1]) - 1; // cuidado: mês começa do zero
        const year = parseInt(info[2]);

        const birthday = new Date(year, month, day);
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

export async function getBirthdayToday() {
    const rows = await getRows();
    const birthdays = [];

    rows.forEach(row => {
        const [company, name, date, phone, status] = row;
        const info = date.split('/');
        const day = parseInt(info[0]);
        const month = parseInt(info[1]) - 1; // cuidado: mês começa do zero
        const year = parseInt(info[2]);

        const birthday = new Date(year, month, day);
        if (isBirthday(birthday)) {
            birthdays.push({ name, birthday, phone });
        }
    });

    return uniqueArray(birthdays) || [];
}

const parseDate = (d) => {
    const date = new Date(d);
    date.setHours(0, 0, 0, 0); // zera hora, minuto, segundo e milissegundo
    return date;
};

export async function getBirthdays(range) {
    const rows = await getRows();
    const birthdays = [];

    const start = range?.startDate ? new Date(range.startDate) : null;
    const end = range?.endDate ? new Date(range.endDate) : null;

    if (start) start.setHours(0, 0, 0, 0);
    if (end) end.setHours(0, 0, 0, 0);

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






