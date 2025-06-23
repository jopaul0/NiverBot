export function BirthdayInMonth(date) {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth()
  );
}

export function isBirthday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth()
  );
}
