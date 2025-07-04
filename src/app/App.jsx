import './App.css';
import logo from './assets/logo.png'
import portrait from './assets/wip-portrait.png'

function App() {
  return (
    <>
      <nav className="navbar">
        <img src={logo} alt="Logo" className="navbar-logo" />
      </nav>

      <main className="section">
        <img src={portrait} alt="Portrait" className="portrait" />
        <p className="">Para contactar con nosotros solicita mas informacion en <span style={{ fontWeight: 'bold' }}>ez@cruzdelsur-aviacion.com</span></p>
        <p className="">To contact us, please request more information at <span style={{ fontWeight: 'bold' }}>ez@cruzdelsur-aviacion.com</span></p>
      </main>

      <footer className="footer">
        <div className="footer-column logo">
          <img src={logo} alt="Logo" />
        </div>
        <div className="footer-column">
          <h4>Links</h4>
          <ul>
            <li><a href="/">Animation</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h4>Recursos</h4>
          <ul>
            <li><a href="/">Portrait</a></li>
          </ul>
        </div>
      </footer>
    </>
  );
}

export default App;
