export const ERROR_MESSAGES = {
  nama: 'Nama wajib diisi (3–80 karakter).',
  email: 'Format email tidak valid.',
  nim: 'NIM harus 10 digit angka.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const NIM_PATTERN = /^[0-9]{10}$/;

function normalise(value) {
  return String(value ?? '').trim();
}

export function validatePendaftaran(data = {}) {
  const source = data ?? {};
  const errors = {};

  const nama = normalise(source.nama);
  if (nama.length < 3 || nama.length > 80) {
    errors.nama = ERROR_MESSAGES.nama;
  }

  const email = normalise(source.email);
  if (!EMAIL_PATTERN.test(email)) {
    errors.email = ERROR_MESSAGES.email;
  }

  const nim = normalise(source.nim);
  if (!NIM_PATTERN.test(nim)) {
    errors.nim = ERROR_MESSAGES.nim;
  }

  return errors;
}

export default validatePendaftaran;
