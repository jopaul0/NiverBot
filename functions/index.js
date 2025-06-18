require('dotenv').config();
const { findBirthday } = require('./services/googleSheets');
const { sendHappyBirthday } = require('./services/whatsapp');

(async () => {
  const birthday = await findBirthday();
  if (birthday.length > 0) {
    await sendHappyBirthday(birthday);
  } else {
    console.log('Nenhum aniversário encontrado para hoje.');
  }
})();