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

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navContainer}>
        <div className={styles.navContent}>
          <ul className={styles.leftNavLinks}>
            <li><a href="#/"><FaHome className={styles.homeIcon} /> {t('nav.home')}</a></li>
            <li><a href="#/learning">{t('nav.academy')}</a></li>
            <li><a href="#/recruitment">{t('nav.recruitment')}</a></li>
            <li><a href="#/careers">Careers</a></li>
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
          <li><a href="#/"><FaHome className={styles.homeIcon} /> {t('nav.home')}</a></li>
          <li><a href="#/learning">{t('nav.academy')}</a></li>
          <li><a href="#/recruitment">{t('nav.recruitment')}</a></li>
          <li><a href="#/careers">Careers</a></li>
          <li><a href="#/consulting">{t('nav.consulting')}</a></li>
          <li><a href="#/safety">{t('nav.safety')}</a></li>
          <li><a href="#/flights">{t('nav.flights')} <FaPlane className={styles.planeIcon} /></a></li>
          <li><a href="#/contact">{t('nav.contact')}</a></li>
          <li className={styles.mobileIcons}>
            <a href="#/search" className={styles.iconLink}><FaSearch /> Search</a>
          </li>
          <li className={styles.mobileIcons}>
            <a href="#/cart" className={styles.iconLink}><FaShoppingCart /> Cart</a>
          </li>
          <li className={styles.mobileLangSelector}>
            <LanguageSelector />
          </li>
        </ul>
      </div>
    </nav>
  );
}
