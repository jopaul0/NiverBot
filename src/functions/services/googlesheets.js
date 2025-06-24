import { google } from 'googleapis';
import { BirthdayInMonth, isBirthday } from '../utils/date.js';
import { sendLog } from '../utils/sendLog.js';
import { uniqueArray, firstName } from '../utils/format.js';

async function getRows() {
    const auth = new google.auth.GoogleAuth({
        keyFile: process.env.GOOGLE_APPLICATION_CREDENTIALS,
        scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    const client = await auth.getClient();
    const sheets = google.sheets({ version: 'v4', auth: client });

    const res = await sheets.spreadsheets.values.get({
        spreadsheetId: process.env.SPREADSHEET_ID,
        range: process.env.SPREADSHEET_RANGE,
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
        if (BirthdayInMonth(birthday)) {
            birthdays.push({ name, birthday, phone });
        }
    });

    const unique = uniqueArray(birthdays);

    sendLog(mainWindow, `🎉 Encontrados ${unique.length} aniversários no mês:`);
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


