import { render, screen } from '@testing-library/react';
import Footer from '../src/components/Footer.jsx';

describe('Footer', () => {
  it('renders a footer element with role contentinfo', () => {
    const { container } = render(<Footer />);
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer.tagName).toBe('FOOTER');
    expect(container.firstChild).toBe(footer);
  });

  it('shows the exact copyright text', () => {
    render(<Footer />);
    expect(
      screen.getByText('© 2026 ParaLab · Program Studi Informatika')
    ).toBeInTheDocument();
  });

  it('contains exactly one link, the mailto contact email', () => {
    render(<Footer />);
    const links = screen.getAllByRole('link');
    expect(links).toHaveLength(1);
    const email = screen.getByRole('link', { name: 'paralab@kampus.ac.id' });
    expect(email).toHaveAttribute('href', 'mailto:paralab@kampus.ac.id');
  });

  it('renders no headings, buttons or main landmark', () => {
    render(<Footer />);
    expect(screen.queryAllByRole('heading')).toHaveLength(0);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
    expect(screen.queryByRole('main')).toBeNull();
  });
});
