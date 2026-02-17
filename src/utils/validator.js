// Name Validator: minimun 2 words, first word > 2 characters
export function validateFullName(name) {
  if (!name) return false;
  const parts = name.trim().split(/\s+/);
  return parts.length >= 2 && parts[0].length > 2;
}

// CPF validator: 11 digits, not all the same, and valid check digits
export function validateCPF(cpf) {
  if (!cpf) return false;
  const clean = cpf.replace(/\D/g, "");
  if (clean.length !== 11 || /^(\d)\1+$/.test(clean)) return false;
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += Number(clean[i]) * (10 - i);
  }
  let firstDigit = (sum * 10) % 11;
  if (firstDigit === 10) firstDigit = 0;
  if (firstDigit !== Number(clean[9])) return false;
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += Number(clean[i]) * (11 - i);
  }
  let secondDigit = (sum * 10) % 11;
  if (secondDigit === 10) secondDigit = 0;
  return secondDigit === Number(clean[10]);
}

// Phone Validator: format (xx) xxxxx-xxxx || (xx) xxxx-xxxx
export function validatePhone(phone) {
  const digits = phone.replace(/\D/g, "");
  return digits.length === 10 || digits.length === 11;
}

// ZIP Code Validator: format xxxxx-xxx
export function validateCEP(cep) {
  if (!cep) return false;
  const clean = cep.replace(/\D/g, "");
  return clean.length === 8;
}

// House Number Normalizer: if empty or only spaces, return "N/A"
export function normalizeHouseNumber(number) {
  if (!number || number.trim() === "") return "N/A";
  return number.trim();
}

// Fetch address by CEP using ViaCEP API
export async function fetchAddressByCEP(cep) {
  const clean = cep.replace(/\D/g, "");
  if (clean.length !== 8) return null;
  try {
    const res = await fetch(`https://viacep.com.br/ws/${clean}/json/`);
    const data = await res.json();
    if (data.erro) return null;
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch {
    return null;
  }
}
