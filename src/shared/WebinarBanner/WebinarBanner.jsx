import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './WebinarBanner.module.css';
import WebinarPortrait from '@assets/banners/webinar-banner.png';

export default function WebinarBanner() {
  const { t } = useTranslation();

  const handleRegisterClick = () => {
    // Navegar al webinar
    window.location.href = '#/webinar';
    
    // Pequeño delay para asegurar que la página se cargue antes del scroll
    setTimeout(() => {
      const registrationSection = document.querySelector('.registrationSection');
      if (registrationSection) {
        registrationSection.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }, 300);
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}>
        <img src={WebinarPortrait} alt="Webinar Banner" />
        <div className={styles.overlay}></div>
      </div>
      <button 
        className={styles.registerButton}
        onClick={handleRegisterClick}
      >
        {t('home.webinarBanner.registerButton')}
      </button>
    </div>
  );
}
