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

export function getBirthdayMessage(dateString) {
  const today = new Date();
  const birthday = new Date(dateString);

  // Cria uma nova data com o mesmo dia/mês, mas no ano atual
  const currentYearBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

  const diffTime = currentYearBirthday.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (isSameDay(today, currentYearBirthday)) {
    return "Aniversário 🎉";
  } else if (diffDays > 0) {
    return `Em ${diffDays} dia${diffDays > 1 ? 's' : ''}`;
  } else {
    return `Há ${Math.abs(diffDays)} dia${Math.abs(diffDays) > 1 ? 's' : ''}`;
  }
}

export function isSameDay(date1, date2) {
  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth()
  );
}


