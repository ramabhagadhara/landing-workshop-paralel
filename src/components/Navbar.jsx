import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Navigasi utama">
      <span className="navbar-logo">ParaLab Workshop</span>
      <ul className="navbar-links">
        <li><a className="navbar-link" href="#tentang">Tentang</a></li>
        <li><a className="navbar-link" href="#agenda">Agenda</a></li>
        <li><a className="navbar-link" href="#faq">FAQ</a></li>
        <li><a className="navbar-link" href="#daftar">Daftar</a></li>
      </ul>
    </nav>
  );
}
