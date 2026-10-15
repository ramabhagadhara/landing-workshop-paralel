import { render, screen } from '@testing-library/react';
import Hero from '../src/components/Hero.jsx';

describe('Hero', () => {
  it('renders a section with id "tentang" (AC-8)', () => {
    const { container } = render(<Hero />);
    const section = container.querySelector('section#tentang');
    expect(section).not.toBeNull();
    expect(section.tagName).toBe('SECTION');
  });

  it('renders exactly one heading, an h1 with the event name (AC-9)', () => {
    render(<Hero />);
    expect(
      screen.getByRole('heading', { level: 1, name: 'Workshop Komputasi Paralel 2026' })
    ).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });

  it('shows the exact subtitle text (AC-10)', () => {
    render(<Hero />);
    expect(
      screen.getByText(
        'Belajar membangun sistem multi-agent yang berjalan paralel, dari teori sampai demo langsung.'
      )
    ).toBeInTheDocument();
  });

  it('shows the exact info text with the middle dot (AC-11)', () => {
    render(<Hero />);
    expect(
      screen.getByText('Sabtu, 14 November 2026 · Aula Fakultas Ilmu Komputer')
    ).toBeInTheDocument();
  });

  it('has a single "Daftar Sekarang" link to #daftar and no buttons (AC-12)', () => {
    render(<Hero />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    const cta = screen.getByRole('link', { name: 'Daftar Sekarang' });
    expect(cta.tagName).toBe('A');
    expect(cta).toHaveAttribute('href', '#daftar');
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });
});
