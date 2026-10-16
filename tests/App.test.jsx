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

  it('LP3-AC-1/AC-7: renders sections in order nav, tentang, agenda, faq, daftar, footer', () => {
    const { container } = render(<App />);
    const els = Array.from(container.querySelectorAll('nav, section, footer'));
    const ids = els.map((el) =>
      el.tagName.toLowerCase() === 'section' ? `section#${el.id}` : el.tagName.toLowerCase()
    );
    expect(ids).toEqual([
      'nav',
      'section#tentang',
      'section#agenda',
      'section#faq',
      'section#daftar',
      'footer',
    ]);

    const main = screen.getByRole('main');
    for (const id of ['tentang', 'agenda', 'faq', 'daftar']) {
      expect(main.querySelector(`section#${id}`)).not.toBeNull();
    }
    expect(main.querySelector('footer')).toBeNull();
    expect(main.querySelector('nav')).toBeNull();
  });

  it('LP3-AC-1: one h1, h2s Agenda/Pertanyaan Umum/Pendaftaran, four h3s in #faq, no skipped levels', () => {
    const { container } = render(<App />);
    const h1s = screen.getAllByRole('heading', { level: 1 });
    expect(h1s).toHaveLength(1);
    expect(h1s[0]).toHaveTextContent('Workshop Komputasi Paralel 2026');

    const h2s = screen.getAllByRole('heading', { level: 2 });
    expect(h2s.map((h) => h.textContent)).toEqual(['Agenda', 'Pertanyaan Umum', 'Pendaftaran']);

    const h3s = Array.from(container.querySelectorAll('h3'));
    expect(h3s).toHaveLength(4);
    const faq = container.querySelector('section#faq');
    expect(faq).not.toBeNull();
    for (const h3 of h3s) {
      expect(faq.contains(h3)).toBe(true);
    }
    expect(container.querySelector('h4, h5, h6')).toBeNull();

    const all = Array.from(container.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    let prev = 0;
    for (const h of all) {
      const level = Number(h.tagName.slice(1));
      expect(level).toBeLessThanOrEqual(prev + 1);
      prev = level;
    }
    expect(all[0].tagName).toBe('H1');
  });

  it('LP3-AC-2: in-page links resolve; nav has 4 links incl. FAQ -> #faq', () => {
    const { container } = render(<App />);
    const hashLinks = screen
      .getAllByRole('link')
      .filter((a) => (a.getAttribute('href') || '').startsWith('#'));
    expect(hashLinks.length).toBeGreaterThanOrEqual(5);
    for (const link of hashLinks) {
      const id = link.getAttribute('href').slice(1);
      expect(container.querySelector(`[id="${id}"]`)).not.toBeNull();
    }
    const nav = screen.getByRole('navigation', { name: 'Navigasi utama' });
    const navLinks = within(nav).getAllByRole('link');
    expect(navLinks).toHaveLength(4);
    expect(navLinks.map((a) => a.getAttribute('href'))).toEqual([
      '#tentang',
      '#agenda',
      '#faq',
      '#daftar',
    ]);
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '#faq');
    expect(container.querySelector('section#faq')).not.toBeNull();
    expect(screen.getByRole('link', { name: 'Daftar Sekarang' })).toHaveAttribute('href', '#daftar');
  });

  it('LP3-AC-7: FAQ is collapsed on page load', () => {
    const { container } = render(<App />);
    const faq = container.querySelector('section#faq');
    const buttons = within(faq).getAllByRole('button');
    expect(buttons).toHaveLength(4);
    for (const b of buttons) {
      expect(b).toHaveAttribute('aria-expanded', 'false');
    }
  });
});
