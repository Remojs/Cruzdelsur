import styles from './navbar.module.css';
import logo from '@assets/logos/logo.png';
import { FaHome, FaShoppingCart, FaSearch, FaBars, FaTimes, FaPlane } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import LanguageSelector from '../../components/LanguageSelector/LanguageSelector';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 990) {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Efecto para controlar el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.width = '100%';
    } else {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    }

    // Cleanup function para restaurar el scroll al desmontar
    return () => {
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.body.style.width = '';
    };
  }, [mobileMenuOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        {/* Language Selector for medium screens (left side) */}
        <div className={styles.leftIconContainer}>
          <LanguageSelector />
        </div>
        
        <div className={styles.navContent}>
          <ul className={styles.leftNavLinks}>
            <li><a href="#/"><FaHome className={styles.homeIcon} /> {t('nav.home')}</a></li>
            <li><a href="#/learning">{t('nav.academy')}</a></li>
            <li><a href="#/recruitment">{t('nav.recruitment')}</a></li>
            <li><a href="#/careers">{t('nav.careers')}</a></li>
          </ul>

          <img src={logo} alt="Cruz del Sur Logo" className={styles.logo} />
          
          <ul className={styles.rightNavLinks}>
            <li><a href="#/consulting">{t('nav.consulting')}</a></li>
            <li><a href="#/safety">{t('nav.safety')}</a></li>
            <li><a href="#/contact">{t('nav.contact')}</a></li>
            <li><a href="#/flights">{t('nav.flights')} <FaPlane className={styles.planeIcon} /></a></li>
          </ul>
        </div>
        
        <div className={styles.iconContainer}>
          <LanguageSelector />
          <a href="#/search" className={styles.iconLink}><FaSearch /></a>
          <a href="#/cart" className={styles.iconLink}><FaShoppingCart /></a>
        </div>
        
        {/* Mobile Logo - Only visible on mobile */}
        <img src={logo} alt="Cruz del Sur Logo" className={styles.mobileLogo} />
        
        <button 
          className={styles.mobileMenuButton} 
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.open : ''}`}>
        <ul className={styles.mobileMenuLinks}>
          <li><a href="#/" onClick={closeMobileMenu}><FaHome className={styles.homeIcon} /> {t('nav.home')}</a></li>
          <li><a href="#/learning" onClick={closeMobileMenu}>{t('nav.academy')}</a></li>
          <li><a href="#/recruitment" onClick={closeMobileMenu}>{t('nav.recruitment')}</a></li>
          <li><a href="#/careers" onClick={closeMobileMenu}>Careers</a></li>
          <li><a href="#/consulting" onClick={closeMobileMenu}>{t('nav.consulting')}</a></li>
          <li><a href="#/safety" onClick={closeMobileMenu}>{t('nav.safety')}</a></li>
          <li><a href="#/flights" onClick={closeMobileMenu}>{t('nav.flights')} <FaPlane className={styles.planeIcon} /></a></li>
          <li><a href="#/contact" onClick={closeMobileMenu}>{t('nav.contact')}</a></li>
          <li className={styles.mobileIcons}>
            <a href="#/search" onClick={closeMobileMenu} className={styles.iconLink}><FaSearch /> Search</a>
          </li>
          <li className={styles.mobileIcons}>
            <a href="#/cart" onClick={closeMobileMenu} className={styles.iconLink}><FaShoppingCart /> Cart</a>
          </li>
          <li className={styles.mobileLangSelector}>
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </nav>
  );
}
