import { render, screen } from '@testing-library/react';
import Pendaftaran from '../src/components/Pendaftaran.jsx';

describe('Pendaftaran', () => {
  it('renders as a section with id "daftar" (AC-17)', () => {
    const { container } = render(<Pendaftaran />);
    const section = container.querySelector('section#daftar');
    expect(section).not.toBeNull();
    expect(container.querySelector('main')).toBeNull();
  });

  it('has exactly one level-2 heading "Pendaftaran" and no other headings (AC-18)', () => {
    render(<Pendaftaran />);
    expect(
      screen.getByRole('heading', { level: 2, name: 'Pendaftaran' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });

  it('shows the exact registration text with trailing period (AC-19)', () => {
    render(<Pendaftaran />);
    const text = screen.getByText('Pendaftaran dibuka 1 November 2026.');
    expect(text).toBeInTheDocument();
    expect(text.tagName).toBe('P');
  });

  it('contains no form fields, buttons or links (AC-20)', () => {
    const { container } = render(<Pendaftaran />);
    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.queryAllByRole('combobox')).toHaveLength(0);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
    expect(container.querySelector('form, input, select, textarea, button')).toBeNull();
  });
});
