import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { render, screen, within } from '@testing-library/react';
import App from '../src/components/App.jsx';

describe('App', () => {
  it('AC-1: index.html has the exact page title', () => {
    const html = readFileSync(resolve(process.cwd(), 'index.html'), 'utf-8');
    expect(html).toContain('<title>Workshop Komputasi Paralel 2026</title>');
  });

  it('renders navigation, main and contentinfo landmarks exactly once', () => {
    render(<App />);
    expect(screen.getAllByRole('navigation', { name: 'Navigasi utama' })).toHaveLength(1);
    expect(screen.getAllByRole('main')).toHaveLength(1);
    expect(screen.getAllByRole('contentinfo')).toHaveLength(1);
  });

  it('AC-2/AC-7: renders sections in order nav, tentang, agenda, daftar, footer', () => {
    const { container } = render(<App />);
    const els = Array.from(container.querySelectorAll('nav, section, footer'));
    const ids = els.map((el) =>
      el.tagName.toLowerCase() === 'section' ? `section#${el.id}` : el.tagName.toLowerCase()
    );
    expect(ids).toEqual(['nav', 'section#tentang', 'section#agenda', 'section#daftar', 'footer']);

    const main = screen.getByRole('main');
    expect(main.querySelector('section#tentang')).not.toBeNull();
    expect(main.querySelector('section#agenda')).not.toBeNull();
    expect(main.querySelector('section#daftar')).not.toBeNull();
    expect(main.querySelector('footer')).toBeNull();
    expect(main.querySelector('nav')).toBeNull();
  });

  it('AC-3: has one h1, h2s in order Agenda, Pendaftaran, and no deeper headings', () => {
    const { container } = render(<App />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Workshop Komputasi Paralel 2026');
    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.map((h) => h.textContent)).toEqual(['Agenda', 'Pendaftaran']);
    expect(container.querySelector('h3, h4, h5, h6')).toBeNull();
  });

  it('every in-page anchor link points to an existing element id', () => {
    const { container } = render(<App />);
    const hashLinks = screen
      .getAllByRole('link')
      .filter((a) => (a.getAttribute('href') || '').startsWith('#'));
    expect(hashLinks.length).toBeGreaterThanOrEqual(4);
    for (const link of hashLinks) {
      const id = link.getAttribute('href').slice(1);
      expect(container.querySelector(`[id="${id}"]`)).not.toBeNull();
    }
    const nav = screen.getByRole('navigation', { name: 'Navigasi utama' });
    expect(within(nav).getAllByRole('link')).toHaveLength(3);
    expect(screen.getByRole('link', { name: 'Daftar Sekarang' })).toHaveAttribute('href', '#daftar');
  });
});
