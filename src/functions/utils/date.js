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

export function BirthdayNear(date) {
  const today = new Date();
  const inputDate = new Date(date);

  today.setHours(0, 0, 0, 0);
  inputDate.setHours(0, 0, 0, 0);

  const diffInMs = inputDate - today;
  const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

  return Math.abs(diffInDays) <= 7;
}