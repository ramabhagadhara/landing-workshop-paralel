import './Agenda.css';

const AGENDA_ITEMS = [
  { time: '08.30 – 09.00', title: 'Registrasi dan pembukaan' },
  { time: '09.00 – 10.30', title: 'Dasar komputasi paralel dan terdistribusi' },
  { time: '10.45 – 12.00', title: 'Multi-agent AI untuk otomasi SDLC' },
  { time: '13.00 – 15.00', title: 'Hands-on: membangun pipeline agent paralel' },
];

export default function Agenda() {
  return (
    <section id="agenda" className="agenda">
      <h2 className="agenda-heading">Agenda</h2>
      <ul className="agenda-list">
        {AGENDA_ITEMS.map((item) => (
          <li key={item.time} className="agenda-item" data-testid="agenda-item">
            <span className="agenda-time">{item.time}</span>
            <span className="agenda-title">{item.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
