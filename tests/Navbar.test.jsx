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

  it('contains exactly three links in order with the exact hrefs', () => {
    render(<Navbar />);
    const nav = screen.getByRole('navigation', { name: 'Navigasi utama' });
    const links = within(nav).getAllByRole('link');
    expect(links).toHaveLength(3);
    expect(links.map((l) => l.textContent)).toEqual(['Tentang', 'Agenda', 'Daftar']);
    expect(links.map((l) => l.getAttribute('href'))).toEqual([
      '#tentang',
      '#agenda',
      '#daftar',
    ]);
  });

  it('finds each link by its accessible name', () => {
    render(<Navbar />);
    expect(screen.getByRole('link', { name: 'Tentang' })).toHaveAttribute('href', '#tentang');
    expect(screen.getByRole('link', { name: 'Agenda' })).toHaveAttribute('href', '#agenda');
    expect(screen.getByRole('link', { name: 'Daftar' })).toHaveAttribute('href', '#daftar');
  });

  it('renders the links as a list and contains no headings', () => {
    render(<Navbar />);
    const list = screen.getByRole('list');
    expect(within(list).getAllByRole('listitem')).toHaveLength(3);
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
  });
});
