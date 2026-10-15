import Navbar from './Navbar.jsx';
import Hero from './Hero.jsx';
import Agenda from './Agenda.jsx';
import Pendaftaran from './Pendaftaran.jsx';
import Footer from './Footer.jsx';
import './App.css';

export default function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="app-main">
        <Hero />
        <Agenda />
        <Pendaftaran />
      </main>
      <Footer />
    </div>
  );
}
