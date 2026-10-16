import { render, screen, within } from '@testing-library/react';
import Navbar from '../src/components/Navbar.jsx';

describe('Navbar', () => {
  it('renders a navigation landmark named "Navigasi utama"', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Navigasi utama' });
    expect(nav).toBeInTheDocument();
    expect(nav.tagName).toBe('NAV');
  });

  it('shows the logo text "ParaLab Workshop" and it is not a link', () => {
    render(<Navbar />);
    const logo = screen.getByText('ParaLab Workshop');
    expect(logo).toBeInTheDocument();
    expect(logo.closest('a')).toBeNull();
    expect(screen.queryByRole('link', { name: 'ParaLab Workshop' })).toBeNull();
  });

  it('contains exactly four links in order with the exact hrefs (LP3-AC-2)', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Navigasi utama' });
    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(4);
    expect(links.map((l) => l.textContent)).toEqual(['Tentang', 'Agenda', 'FAQ', 'Daftar']);
    expect(links.map((l) => l.getAttribute('href'))).toEqual([
      '#tentang',
      '#agenda',
      '#faq',
      '#daftar',
    ]);
  });

  it('finds each link, including the new FAQ link, by its accessible name', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'Tentang' })).toHaveAttribute('href', '#tentang');
    expect(screen.getByRole('link', { name: 'Agenda' })).toHaveAttribute('href', '#agenda');
    expect(screen.getByRole('link', { name: 'FAQ' })).toHaveAttribute('href', '#faq');
    expect(screen.getByRole('link', { name: 'Daftar' })).toHaveAttribute('href', '#daftar');
  });

  it('renders the links as a list of four items and contains no headings', () => {
    render(<Navbar />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    items.forEach((item) => {
      expect(within(item).getAllByRole('link')).toHaveLength(1);
    });
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
  });
});
