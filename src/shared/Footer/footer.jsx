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
            <img src={fbIcon} alt="Facebook" className={styles.footerIcon} />
            <img src={igIcon} alt="Instagram" className={styles.footerIcon} />
            <img src={twIcon} alt="Twitter" className={styles.footerIcon} />
          </div>
          <div className={styles.logo}>
            <img src={logo} alt="Cruz del Sur Logo" className={styles.logoImage}/>
          </div>
          <div className={styles.logoIconsRight}>
            <img src={lnIcon} alt="LinkedIn" className={styles.footerIcon} />
            <img src={tkIcon} alt="TikTok" className={styles.footerIcon} />
            <img src={ytIcon} alt="YouTube" className={styles.footerIcon} />
          </div>
        </div>
        <div className={styles.footerGrid}>
          <div className={styles.footerColumn}>
            <div className={styles.footerColumnTitle}>Servicios</div>
            <ul className={styles.footerLinkList}>
              <li><a href="#" className={styles.footerLink}>Trainings</a></li>
              <li><a href="#" className={styles.footerLink}>Recruitment</a></li>
              <li><a href="#" className={styles.footerLink}>Learning</a></li>
              <li><a href="#" className={styles.footerLink}>Charters</a></li>
              <li><a href="#" className={styles.footerLink}>Academy</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <div className={styles.footerColumnTitle}>Institucional</div>
            <ul className={styles.footerLinkList}>
              <li><a href="#" className={styles.footerLink}>About Us</a></li>
              <li><a href="#" className={styles.footerLink}>Careers</a></li>
              <li><a href="#" className={styles.footerLink}>Contact</a></li>
              <li><a href="#" className={styles.footerLink}>Webinar</a></li>
              <li><a href="#" className={styles.footerLink}>Safety</a></li>
            </ul>
          </div>
          <div className={styles.footerColumn}>
            <div className={styles.footerColumnTitle}>Legales</div>
            <ul className={styles.footerLinkList}>
              <li><a href="#" className={styles.footerLink}>Términos de uso</a></li>
              <li><a href="#" className={styles.footerLink}>Políticas de privacidad</a></li>
              <li><a href="#" className={styles.footerLink}>Más info</a></li>
            </ul>
          </div>
        </div>
        <div className={styles.copyright}>
          <p>
            Copyright © 2025 Cruz del Sur. All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
}
