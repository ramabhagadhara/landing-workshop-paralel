import { describe, it, expect } from 'vitest';
import validatePendaftaran, { ERROR_MESSAGES } from '../src/components/validatePendaftaran.js';

const BASE = { nama: 'Budi Santoso', email: 'budi@kampus.ac.id', nim: '2201234567', sesi: 'Offline' };

const MSG_NAMA = 'Nama wajib diisi (3–80 karakter).';
const MSG_EMAIL = 'Format email tidak valid.';
const MSG_NIM = 'NIM harus 10 digit angka.';

const CASES = {
  nama: {
    invalid: ['', '   ', 'Al', '  Al  ', 'a'.repeat(81), undefined],
    valid: ['Ani', '  Ani  ', 'a'.repeat(80)],
    message: MSG_NAMA,
  },
  email: {
    invalid: ['', 'budi', 'budi@', 'budi@kampus', '@kampus.ac.id', 'budi @kampus.ac.id', 'budi@@kampus.ac.id'],
    valid: ['budi@kampus.ac.id', '  budi@kampus.ac.id  '],
    message: MSG_EMAIL,
  },
  nim: {
    invalid: ['', '123456789', '12345678901', '12345abcde', '12345 67890', '-123456789'],
    valid: ['2201234567', ' 2201234567 '],
    message: MSG_NIM,
  },
};

describe('validatePendaftaran', () => {
  it('exports exactly the three error messages (with en dash in 3–80)', () => {
    expect(ERROR_MESSAGES).toEqual({ nama: MSG_NAMA, email: MSG_EMAIL, nim: MSG_NIM });
  });

  it('returns {} for fully valid data with sesi Offline or Online', () => {
    for (const sesi of ['Offline', 'Online']) {
      const result = validatePendaftaran({ ...BASE, sesi });
      expect(result).toEqual({});
      expect(Object.keys(result)).toHaveLength(0);
    }
  });

  it('flags each documented invalid example with only that field key and exact message', () => {
    for (const [field, { invalid, message }] of Object.entries(CASES)) {
      for (const value of invalid) {
        const result = validatePendaftaran({ ...BASE, [field]: value });
        expect(result, `${field}=${JSON.stringify(value)}`).toEqual({ [field]: message });
      }
    }
  });

  it('accepts each documented valid example (trimmed, boundaries) with no error key', () => {
    for (const [field, { valid }] of Object.entries(CASES)) {
      for (const value of valid) {
        const result = validatePendaftaran({ ...BASE, [field]: value });
        expect(result, `${field}=${JSON.stringify(value)}`).not.toHaveProperty(field);
        expect(result).toEqual({});
      }
    }
  });

  it('returns all three keys for empty/missing data and never a sesi key', () => {
    const all = { nama: MSG_NAMA, email: MSG_EMAIL, nim: MSG_NIM };
    expect(validatePendaftaran({ nama: '', email: '', nim: '', sesi: 'Offline' })).toEqual(all);
    expect(validatePendaftaran()).toEqual(all);
    expect(validatePendaftaran({})).toEqual(all);
    for (const sesi of ['', 'X', undefined]) {
      expect(validatePendaftaran({ ...BASE, sesi })).not.toHaveProperty('sesi');
      expect(validatePendaftaran({ ...BASE, sesi })).toEqual({});
      expect(validatePendaftaran({ nama: '', email: '', nim: '', sesi })).not.toHaveProperty('sesi');
    }
  });

  it('does not mutate the input object and returns a new object', () => {
    const input = { nama: '  Ani  ', email: '  budi@kampus.ac.id  ', nim: ' 2201234567 ', sesi: 'Online' };
    const snapshot = { ...input };
    const result = validatePendaftaran(input);
    expect(input).toEqual(snapshot);
    expect(result).not.toBe(input);
    expect(result).toEqual({});

    const bad = { nama: ' Al ', email: 'budi', nim: '123', sesi: 'Offline' };
    const badCopy = { ...bad };
    validatePendaftaran(bad);
    expect(bad).toEqual(badCopy);
  });
});
