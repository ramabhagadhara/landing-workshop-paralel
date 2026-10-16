import { useState } from 'react';
import './Faq.css';

export const FAQ_ITEMS = [
  { question: 'Apakah workshop ini gratis?', answer: 'Ya, gratis untuk mahasiswa dan dosen.' },
  { question: 'Perlu membawa laptop?', answer: 'Ya, untuk sesi hands-on.' },
  { question: 'Apakah ada sertifikat?', answer: 'Ya, sertifikat elektronik dikirim lewat email.' },
  { question: 'Bagaimana jika berhalangan hadir?', answer: 'Rekaman sesi akan dibagikan ke peserta terdaftar.' },
];

export default function Faq({ items } = {}) {
  const list = Array.isArray(items) ? items : FAQ_ITEMS;
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => {
    setOpenIndex((prev) => (prev === i ? null : i));
  };

  return (
    <section id="faq" className="faq">
      <h2 className="faq-heading">Pertanyaan Umum</h2>
      <div className="faq-list">
        {list.map((item, i) => {
          const open = openIndex === i;
          return (
            <div key={i} className="faq-item">
              <h3 className="faq-question-heading">
                <button
                  type="button"
                  id={`faq-question-${i}`}
                  className="faq-question"
                  aria-expanded={open ? 'true' : 'false'}
                  aria-controls={`faq-panel-${i}`}
                  onClick={() => toggle(i)}
                >
                  <span className="faq-question-text">{item.question}</span>
                  <span className="faq-icon" aria-hidden="true"></span>
                </button>
              </h3>
              <div id={`faq-panel-${i}`} className="faq-panel" hidden={!open}>
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
