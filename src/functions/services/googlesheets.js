import { google } from 'googleapis';
import { BirthdayInMonth } from '../utils/date.js';
import { sendLog } from '../utils/sendLog.js';

export async function findBirthdays(mainWindow) {
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
    const birthdays = [];

    sendLog(mainWindow, '🔍 Verificando aniversários...');

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

    const unique = birthdays.filter((value, index, self) =>
        index === self.findIndex(b =>
            b.name === value.name && b.birthday.getTime() === value.birthday.getTime()
        )
    );

    sendLog(mainWindow, `🎉 Encontrados ${unique.length} aniversários no mês:`);
    unique.forEach(birthday => {
        const name = birthday.name.toLowerCase().split(' ')[0];

        sendLog(mainWindow, `🎂 ${name.charAt(0).toUpperCase() + name.slice(1)} - ${birthday.birthday.toLocaleDateString()} - Telefone: ${birthday.phone}`);
    });
}
