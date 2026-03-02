// Calculates age based on a date string in the format "DD/MM/YYYY"
export function calculateAge(dateString) {
  if (!dateString) return 0;

  const [day, month, year] = dateString.split("/");
  const birthDate = new Date(year, month - 1, day);
  const today = new Date();

  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
}

// Returns the price of a ticket based on the age of the person
export function getThermasPriceByAge(age) {
  if (age <= 2) return 50;
  if (age <= 7) return 220;
  return 296;
}
