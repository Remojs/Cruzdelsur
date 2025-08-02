import styles from "./footer.module.css";
import logo from "@assets/logos/logo.png";
import fbIcon from "@assets/icons/fb.png";
import igIcon from "@assets/icons/ig.png";
import twIcon from "@assets/icons/tw.png";
import lnIcon from "@assets/icons/ln.png";
import tkIcon from "@assets/icons/tk.png";
import ytIcon from "@assets/icons/yt.png";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoRow}>
          <div className={styles.logoIconsLeft}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <img src={fbIcon} alt="Facebook" className={styles.footerIcon} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <img src={igIcon} alt="Instagram" className={styles.footerIcon} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <img src={twIcon} alt="Twitter" className={styles.footerIcon} />
            </a>
          </div>
          <div className={styles.logo}>
            <img src={logo} alt="Cruz del Sur Logo" className={styles.logoImage}/>
          </div>
          <div className={styles.logoIconsRight}>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <img src={lnIcon} alt="LinkedIn" className={styles.footerIcon} />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer">
              <img src={tkIcon} alt="TikTok" className={styles.footerIcon} />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              <img src={ytIcon} alt="YouTube" className={styles.footerIcon} />
            </a>
          </div>
        </div>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <div className={styles.footerColumnTitle}>Servicios</div>
            <ul className={styles.footerLinkList}>
              <li><a href="/trainings" className={styles.footerLink}>Trainings</a></li>
              <li><a href="/recruitment" className={styles.footerLink}>Recruitment</a></li>
              <li><a href="/learning" className={styles.footerLink}>Learning</a></li>
              <li><a href="/charters" className={styles.footerLink}>Charters</a></li>
              <li><a href="/academy" className={styles.footerLink}>Academy</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <div className={styles.footerColumnTitle}>Institucional</div>
            <ul className={styles.footerLinkList}>
              <li><a href="/about" className={styles.footerLink}>About Us</a></li>
              <li><a href="/careers" className={styles.footerLink}>Careers</a></li>
              <li><a href="/contact" className={styles.footerLink}>Contact</a></li>
              <li><a href="/webinar" className={styles.footerLink}>Webinar</a></li>
              <li><a href="/safety" className={styles.footerLink}>Safety</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <div className={styles.footerColumnTitle}>Legales</div>
            <ul className={styles.footerLinkList}>
              <li><a href="/terminos" className={styles.footerLink}>Términos de uso</a></li>
              <li><a href="/privacidad" className={styles.footerLink}>Políticas de privacidad</a></li>
              <li><a href="/info" className={styles.footerLink}>Más info</a></li>
            </ul>
          </div>
        </div>
        {/* Sección de stats comentada por pedido del usuario
        <div className={styles.statsSection}>
          ...stats content...
        </div>
        */}
        <div className={styles.copyright}>
          <p>
            Copyright © 2025 Cruz del Sur. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
