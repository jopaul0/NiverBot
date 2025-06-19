function isBirthday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth()
  );
}

module.exports = { isBirthday };