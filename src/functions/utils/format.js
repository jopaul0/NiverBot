export function firstName(name) {
  if (!name) return '';
  const lower = name.toLowerCase();
  return (lower.charAt(0).toUpperCase() + lower.slice(1)).split(" ")[0];
}

export function uniqueArray(array) {
  return array.filter((value, index, self) => 
    index === self.findIndex((t) => (
      t.name === value.name && t.birthday.getTime() === value.birthday.getTime()
    ))
  );
}