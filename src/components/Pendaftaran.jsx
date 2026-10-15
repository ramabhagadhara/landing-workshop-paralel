import { useState } from 'react';
import validatePendaftaran from './validatePendaftaran.js';
import './Pendaftaran.css';

const INITIAL_VALUES = { nama: '', email: '', nim: '', sesi: 'Offline' };

export default function Pendaftaran({ onSubmit } = {}) {
  const [values, setValues] = useState(INITIAL_VALUES);
  const [errors, setErrors] = useState({});
  const [submittedNama, setSubmittedNama] = useState(null);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    const errs = validatePendaftaran(values);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      return;
    }
    const data = {
      nama: values.nama.trim(),
      email: values.email.trim(),
      nim: values.nim.trim(),
      sesi: values.sesi,
    };
    setSubmittedNama(data.nama);
    if (typeof onSubmit === 'function') {
      onSubmit(data);
    }
  }

  if (submittedNama !== null) {
    return (
      <section id="daftar" className="pendaftaran">
        <h2 className="pendaftaran-heading">Pendaftaran</h2>
        <p className="pendaftaran-success" role="status">
          {`Terima kasih, ${submittedNama}! Pendaftaranmu sudah kami terima.`}
        </p>
      </section>
    );
  }

  return (
    <section id="daftar" className="pendaftaran">
      <h2 className="pendaftaran-heading">Pendaftaran</h2>
      <form className="pendaftaran-form" aria-label="Formulir pendaftaran" noValidate onSubmit={handleSubmit}>
        <div className="pendaftaran-field">
          <label className="pendaftaran-label" htmlFor="pendaftaran-nama">Nama lengkap</label>
          <input
            id="pendaftaran-nama"
            name="nama"
            type="text"
            className="pendaftaran-input"
            autoComplete="name"
            value={values.nama}
            onChange={handleChange}
            aria-invalid={errors.nama ? 'true' : undefined}
            aria-describedby={errors.nama ? 'pendaftaran-nama-error' : undefined}
          />
          {errors.nama && <p id="pendaftaran-nama-error" className="pendaftaran-error">{errors.nama}</p>}
        </div>

        <div className="pendaftaran-field">
          <label className="pendaftaran-label" htmlFor="pendaftaran-email">Email</label>
          <input
            id="pendaftaran-email"
            name="email"
            type="email"
            className="pendaftaran-input"
            autoComplete="email"
            value={values.email}
            onChange={handleChange}
            aria-invalid={errors.email ? 'true' : undefined}
            aria-describedby={errors.email ? 'pendaftaran-email-error' : undefined}
          />
          {errors.email && <p id="pendaftaran-email-error" className="pendaftaran-error">{errors.email}</p>}
        </div>

        <div className="pendaftaran-field">
          <label className="pendaftaran-label" htmlFor="pendaftaran-nim">NIM</label>
          <input
            id="pendaftaran-nim"
            name="nim"
            type="text"
            inputMode="numeric"
            className="pendaftaran-input"
            value={values.nim}
            onChange={handleChange}
            aria-invalid={errors.nim ? 'true' : undefined}
            aria-describedby={errors.nim ? 'pendaftaran-nim-error' : undefined}
          />
          {errors.nim && <p id="pendaftaran-nim-error" className="pendaftaran-error">{errors.nim}</p>}
        </div>

        <fieldset className="pendaftaran-fieldset">
          <legend className="pendaftaran-legend">Sesi</legend>
          <div className="pendaftaran-radio">
            <input
              id="pendaftaran-sesi-offline"
              type="radio"
              name="sesi"
              value="Offline"
              checked={values.sesi === 'Offline'}
              onChange={handleChange}
            />
            <label htmlFor="pendaftaran-sesi-offline">Offline</label>
          </div>
          <div className="pendaftaran-radio">
            <input
              id="pendaftaran-sesi-online"
              type="radio"
              name="sesi"
              value="Online"
              checked={values.sesi === 'Online'}
              onChange={handleChange}
            />
            <label htmlFor="pendaftaran-sesi-online">Online</label>
          </div>
        </fieldset>

        <button type="submit" className="pendaftaran-submit">Kirim Pendaftaran</button>
      </form>
    </section>
  );
}
