require('dotenv').config();
const { findBirthday } = require('./services/googleSheets');

(async () => {
  const birthday = await findBirthday();
  console.log(birthday);



})();
