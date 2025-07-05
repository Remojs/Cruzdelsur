import styles from './navbar.module.css';
import logo from '@assets/logos/logo.png';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.navLinks}>
        <li><a href="/contact">Contact</a></li>
        <li><a href="/recruitment">Recruitment</a></li>
        <li><a href="/trainings">Trainings</a></li>
      </ul>

      <img src={logo} alt="Cruz del Sur Logo" className={styles.logo} />
      
      <ul className={styles.navLinks}>
        <li><a href="/charters">Charters</a></li>
        <li><a href="/safety">Safety</a></li>
        <li><a href="/learning">Learning</a></li>
      </ul>
    </nav>
  );
}