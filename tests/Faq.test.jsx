import { render, screen, within, fireEvent } from '@testing-library/react';
import Faq, { FAQ_ITEMS } from '../src/components/Faq.jsx';

const QUESTIONS = [
  'Apakah workshop ini gratis?',
  'Perlu membawa laptop?',
  'Apakah ada sertifikat?',
  'Bagaimana jika berhalangan hadir?',
];
const ANSWERS = [
  'Ya, gratis untuk mahasiswa dan dosen.',
  'Ya, untuk sesi hands-on.',
  'Ya, sertifikat elektronik dikirim lewat email.',
  'Rekaman sesi akan dibagikan ke peserta terdaftar.',
];

const panelOf = (btn) => document.getElementById(btn.getAttribute('aria-controls'));

function expectOnlyOpen(index) {
  const buttons = screen.getAllByRole('button');
  const expanded = buttons.filter((b) => b.getAttribute('aria-expanded') === 'true');
  expect(expanded.length).toBeLessThanOrEqual(1);
  buttons.forEach((btn, i) => {
    const panel = panelOf(btn);
    if (i === index) {
      expect(btn).toHaveAttribute('aria-expanded', 'true');
      expect(panel).not.toHaveAttribute('hidden');
      expect(screen.getByText(ANSWERS[i])).toBeVisible();
    } else {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
      expect(panel).toHaveAttribute('hidden');
      expect(screen.getByText(ANSWERS[i])).not.toBeVisible();
    }
  });
}

describe('Faq', () => {
  it('renders section#faq with h2 "Pertanyaan Umum" and one h3 per question wrapping its button', () => {
    const { container } = render(<Faq />);
    expect(container.querySelector('section#faq')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2, name: 'Pertanyaan Umum' })).toBeInTheDocument();
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(1);
    expect(screen.getAllByRole('heading', { level: 3 })).toHaveLength(4);
    expect(container.querySelectorAll('h1, h4, h5, h6')).toHaveLength(0);
    QUESTIONS.forEach((q) => {
      const h3 = screen.getByRole('heading', { level: 3, name: q });
      expect(within(h3).getByRole('button', { name: q })).toBeInTheDocument();
    });
    expect(screen.queryAllByRole('link')).toHaveLength(0);
  });

  it('renders exactly four type="button" questions in order with a decorative, empty icon', () => {
    render(<Faq />);
    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(4);
    expect(buttons.map((b) => b.textContent)).toEqual(QUESTIONS);
    buttons.forEach((btn, i) => {
      expect(btn).toHaveAttribute('type', 'button');
      expect(screen.getByRole('button', { name: QUESTIONS[i] })).toBe(btn);
      const icon = btn.querySelector('[aria-hidden="true"]');
      expect(icon).not.toBeNull();
      expect(icon.textContent).toBe('');
    });
    expect(FAQ_ITEMS).toEqual(QUESTIONS.map((question, i) => ({ question, answer: ANSWERS[i] })));
  });

  it('starts collapsed with aria-controls pointing to unique hidden panels holding the paired answer', () => {
    render(<Faq />);
    const buttons = screen.getAllByRole('button');
    const ids = buttons.map((b) => b.getAttribute('aria-controls'));
    expect(new Set(ids).size).toBe(4);
    buttons.forEach((btn, i) => {
      expect(btn).toHaveAttribute('aria-expanded', 'false');
      const panel = panelOf(btn);
      expect(panel).not.toBeNull();
      expect(panel).toHaveAttribute('hidden');
      expect(panel.textContent).toBe(ANSWERS[i]);
      expect(within(panel).getByText(ANSWERS[i])).toBeInTheDocument();
      expect(screen.getByText(ANSWERS[i])).not.toBeVisible();
    });
  });

  it('opens a question, switches to another, and closes on a second click', () => {
    render(<Faq />);
    fireEvent.click(screen.getByRole('button', { name: 'Apakah workshop ini gratis?' }));
    expectOnlyOpen(0);

    fireEvent.click(screen.getByRole('button', { name: 'Apakah ada sertifikat?' }));
    expectOnlyOpen(2);

    fireEvent.click(screen.getByRole('button', { name: 'Apakah ada sertifikat?' }));
    expectOnlyOpen(-1);
  });

  it('keeps at most one open after any click sequence and never changes the URL hash', () => {
    render(<Faq />);
    const hashBefore = window.location.hash;
    const sequence = [0, 1, 1, 3, 2];
    let open = null;
    sequence.forEach((i) => {
      fireEvent.click(screen.getAllByRole('button')[i]);
      open = open === i ? null : i;
      expectOnlyOpen(open === null ? -1 : open);
      expect(window.location.hash).toBe(hashBefore);
    });
  });

  it('renders custom items instead of the defaults with the same accordion behaviour', () => {
    render(
      <Faq
        items={[
          { question: 'Q1?', answer: 'A1.' },
          { question: 'Q2?', answer: 'A2.' },
        ]}
      />,
    );
    const buttons = screen.getAllByRole('button');
    expect(buttons.map((b) => b.textContent)).toEqual(['Q1?', 'Q2?']);
    QUESTIONS.forEach((q) => expect(screen.queryByText(q)).not.toBeInTheDocument());
    expect(screen.getByText('A1.')).not.toBeVisible();
    expect(screen.getByText('A2.')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Q2?' }));
    expect(screen.getByText('A2.')).toBeVisible();
    expect(screen.getByText('A1.')).not.toBeVisible();

    fireEvent.click(screen.getByRole('button', { name: 'Q1?' }));
    expect(screen.getByText('A1.')).toBeVisible();
    expect(screen.getByText('A2.')).not.toBeVisible();
    expect(screen.getByRole('button', { name: 'Q2?' })).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(screen.getByRole('button', { name: 'Q1?' }));
    expect(screen.getByText('A1.')).not.toBeVisible();
    expect(screen.getByText('A2.')).not.toBeVisible();
  });
});
