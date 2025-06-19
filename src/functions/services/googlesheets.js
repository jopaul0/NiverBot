const { google } = require('googleapis');
const { isBirthday } = require('../utilities/date');

async function findBirthday() {
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

    console.log('🔍 Verificando aniversários...');

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

    console.log(`🎉 Encontrados ${birthdays.length} aniversários para hoje.`);
    return birthdays;

}

module.exports = { findBirthday };