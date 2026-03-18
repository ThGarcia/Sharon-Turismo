
// Calculate age
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

// Thermas price
export function getThermasPriceByAge(age) {
  if (age <= 2) return 50;
  if (age <= 7) return 220;
  return 296;
}

// Principal function
export function calculateTotal({ id, people, dates = [], price = 0 }) {
  if (id === "laranjais") {
    return dates.reduce((total, date) => {
      const age = calculateAge(date);
      return total + getThermasPriceByAge(age);
    }, 0);
  }

  if (id === "jordao") {
    let total = 0;
    let remaining = people;

    while (remaining > 0) {
      if (remaining >= 4) {
        total += 4 * 1280;
        remaining -= 4;
      } else if (remaining === 3) {
        total += 3 * 1360;
        remaining -= 3;
      } else if (remaining <= 2) {
        total += remaining * 1480;
        remaining = 0;
      }
    }

    return total;
  }

  return people * price;
}
