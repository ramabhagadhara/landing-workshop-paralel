import { render, screen, within } from '@testing-library/react';
import Agenda from '../src/components/Agenda.jsx';

const ITEMS = [
  { time: '08.30 – 09.00', title: 'Registrasi dan pembukaan' },
  { time: '09.00 – 10.30', title: 'Dasar komputasi paralel dan terdistribusi' },
  { time: '10.45 – 12.00', title: 'Multi-agent AI untuk otomasi SDLC' },
  { time: '13.00 – 15.00', title: 'Hands-on: membangun pipeline agent paralel' },
];

describe('Agenda', () => {
  it('renders a section with id="agenda"', () => {
    const { container } = render(<Agenda />);
    const section = container.querySelector('section#agenda');
    expect(section).not.toBeNull();
    expect(container.querySelector('main')).toBeNull();
  });

  it('has exactly one heading: level-2 "Agenda"', () => {
    render(<Agenda />);
    expect(screen.getByRole('heading', { level: 2, name: 'Agenda' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading')).toHaveLength(1);
  });

  it('renders one list with exactly four list items carrying data-testid', () => {
    render(<Agenda />);
    const list = screen.getByRole('list');
    const items = within(list).getAllByRole('listitem');
    expect(items).toHaveLength(4);
    expect(screen.getAllByTestId('agenda-item')).toHaveLength(4);
  });

  it('shows each time and title inside its own item, in order', () => {
    render(<Agenda />);
    const items = screen.getAllByTestId('agenda-item');
    ITEMS.forEach(({ time, title }, i) => {
      const timeEl = within(items[i]).getByText(time);
      const titleEl = within(items[i]).getByText(title);
      expect(timeEl).not.toBe(titleEl);
      expect(timeEl.textContent).toBe(time);
      expect(titleEl.textContent).toBe(title);
    });
  });

  it('uses the en dash (U+2013) in times, not a hyphen', () => {
    render(<Agenda />);
    expect(screen.getByText('08.30 – 09.00')).toBeInTheDocument();
    expect(screen.queryByText('08.30 - 09.00')).toBeNull();
  });

  it('contains no links', () => {
    render(<Agenda />);
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });
});
