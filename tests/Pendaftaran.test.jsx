import { render, screen, within, fireEvent, createEvent } from '@testing-library/react';
import Pendaftaran from '../src/components/Pendaftaran.jsx';

const MSG_NAMA = 'Nama wajib diisi (3–80 karakter).';
const MSG_EMAIL = 'Format email tidak valid.';
const MSG_NIM = 'NIM harus 10 digit angka.';

const nama = () => screen.getByLabelText('Nama lengkap');
const email = () => screen.getByLabelText('Email');
const nim = () => screen.getByLabelText('NIM');
const type = (el, value) => fireEvent.change(el, { target: { value } });
const submit = () => fireEvent.click(screen.getByRole('button', { name: 'Kirim Pendaftaran' }));

describe('Pendaftaran (LP-2)', () => {
  it('renders section, heading and the initial empty form (LP2-AC-1, 8, 9, 10)', () => {
    const { container } = render(<Pendaftaran />);
    const section = container.querySelector('section#daftar');
    expect(section).not.toBeNull();
    const heading = screen.getByRole('heading', { level: 2, name: 'Pendaftaran' });
    expect(section).toContainElement(heading);
    expect(screen.getAllByRole('heading')).toHaveLength(1);
    expect(container.querySelector('h1, h3, h4, h5, h6')).toBeNull();
    expect(screen.queryByText('Pendaftaran dibuka 1 November 2026.')).toBeNull();

    const form = screen.getByRole('form', { name: 'Formulir pendaftaran' });
    expect(form).toHaveAttribute('novalidate');
    expect(section).toContainElement(form);
    // heading precedes form in DOM order
    expect(heading.compareDocumentPosition(form) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();

    expect(nama()).toHaveAttribute('type', 'text');
    expect(email()).toHaveAttribute('type', 'email');
    expect(nim()).toHaveAttribute('type', 'text');
    [nama(), email(), nim()].forEach((input) => {
      expect(input).toHaveValue('');
      expect(input).not.toHaveAttribute('aria-invalid');
    });

    const group = screen.getByRole('group', { name: 'Sesi' });
    expect(within(group).getByRole('radio', { name: 'Offline' })).toBeChecked();
    expect(within(group).getByRole('radio', { name: 'Online' })).not.toBeChecked();

    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.getByRole('button', { name: 'Kirim Pendaftaran' })).toHaveAttribute('type', 'submit');
    expect(screen.queryAllByRole('link')).toHaveLength(0);

    [MSG_NAMA, MSG_EMAIL, MSG_NIM].forEach((m) => expect(screen.queryByText(m)).toBeNull());
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('does not validate while typing, only on submit; empty submit shows all errors (LP2-AC-11, 12, 13, 15)', () => {
    const onSubmit = vi.fn();
    render(<Pendaftaran onSubmit={onSubmit} />);

    type(nama(), 'A');
    type(email(), 'budi');
    type(nim(), '12');
    [MSG_NAMA, MSG_EMAIL, MSG_NIM].forEach((m) => expect(screen.queryByText(m)).toBeNull());

    type(nama(), '');
    type(email(), '');
    type(nim(), '');

    const form = screen.getByRole('form', { name: 'Formulir pendaftaran' });
    const ev = createEvent.submit(form);
    fireEvent(form, ev);
    expect(ev.defaultPrevented).toBe(true);

    [
      [nama(), MSG_NAMA],
      [email(), MSG_EMAIL],
      [nim(), MSG_NIM],
    ].forEach(([input, msg]) => {
      const msgEl = screen.getByText(msg);
      expect(input).toHaveAttribute('aria-invalid', 'true');
      expect(input).toHaveAccessibleDescription(msg);
      expect(input.nextElementSibling).toBe(msgEl);
    });

    expect(onSubmit).not.toHaveBeenCalled();
    expect(screen.getByRole('form', { name: 'Formulir pendaftaran' })).toBeInTheDocument();
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('shows only the error for the single invalid field and keeps values (LP2-AC-12, 13)', () => {
    const onSubmit = vi.fn();
    render(<Pendaftaran onSubmit={onSubmit} />);
    type(nama(), 'Budi Santoso');
    type(email(), 'budi@kampus.ac.id');
    type(nim(), '123');
    submit();

    expect(screen.getByText(MSG_NIM)).toBeInTheDocument();
    expect(screen.queryByText(MSG_NAMA)).toBeNull();
    expect(screen.queryByText(MSG_EMAIL)).toBeNull();
    expect(nim()).toHaveAttribute('aria-invalid', 'true');
    expect(nama()).not.toHaveAttribute('aria-invalid');
    expect(email()).not.toHaveAttribute('aria-invalid');
    expect(nama()).toHaveValue('Budi Santoso');
    expect(email()).toHaveValue('budi@kampus.ac.id');
    expect(nim()).toHaveValue('123');
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('clears errors only on the next submit for fields that became valid (LP2-AC-14)', () => {
    render(<Pendaftaran />);
    submit();
    expect(screen.getByText(MSG_NAMA)).toBeInTheDocument();

    // changing a field without submitting keeps its message
    type(nama(), 'Budi Santoso');
    expect(screen.getByText(MSG_NAMA)).toBeInTheDocument();
    expect(nama()).toHaveAttribute('aria-invalid', 'true');

    submit();
    expect(screen.queryByText(MSG_NAMA)).toBeNull();
    expect(nama()).not.toHaveAttribute('aria-invalid');
    expect(screen.getByText(MSG_EMAIL)).toBeInTheDocument();
    expect(screen.getByText(MSG_NIM)).toBeInTheDocument();
  });

  it('on valid submit replaces the form with a thank-you status and calls onSubmit once (LP2-AC-15, 16, 17, 18)', () => {
    const onSubmit = vi.fn();
    const { container } = render(<Pendaftaran onSubmit={onSubmit} />);
    type(nama(), '  Budi Santoso ');
    type(email(), 'budi@kampus.ac.id');
    type(nim(), '2201234567');
    fireEvent.click(screen.getByRole('radio', { name: 'Online' }));

    const form = screen.getByRole('form', { name: 'Formulir pendaftaran' });
    const ev = createEvent.submit(form);
    fireEvent(form, ev);
    expect(ev.defaultPrevented).toBe(true);

    expect(screen.getByRole('status')).toHaveTextContent(
      'Terima kasih, Budi Santoso! Pendaftaranmu sudah kami terima.'
    );
    expect(screen.queryByRole('form')).toBeNull();
    expect(container.querySelector('form')).toBeNull();
    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(screen.queryAllByRole('radio')).toHaveLength(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);

    const section = container.querySelector('section#daftar');
    expect(
      within(section).getByRole('heading', { level: 2, name: 'Pendaftaran' })
    ).toBeInTheDocument();

    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      nama: 'Budi Santoso',
      email: 'budi@kampus.ac.id',
      nim: '2201234567',
      sesi: 'Online',
    });
  });

  it('sends default Offline session with trimmed values, and works without onSubmit (LP2-AC-18, 19)', () => {
    const onSubmit = vi.fn();
    const { unmount } = render(<Pendaftaran onSubmit={onSubmit} />);
    type(nama(), 'Ani');
    type(email(), '  ani@kampus.ac.id  ');
    type(nim(), ' 2201234568 ');
    submit();
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(onSubmit).toHaveBeenCalledWith({
      nama: 'Ani',
      email: 'ani@kampus.ac.id',
      nim: '2201234568',
      sesi: 'Offline',
    });
    unmount();

    render(<Pendaftaran />);
    type(nama(), 'Budi Santoso');
    type(email(), 'budi@kampus.ac.id');
    type(nim(), '2201234567');
    expect(() => submit()).not.toThrow();
    expect(screen.getByRole('status')).toHaveTextContent(
      'Terima kasih, Budi Santoso! Pendaftaranmu sudah kami terima.'
    );
  });
});
