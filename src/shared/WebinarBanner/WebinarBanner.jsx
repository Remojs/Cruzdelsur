import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './WebinarBanner.module.css';
import WebinarPortrait from '@assets/banners/webinar-banner.png';

export default function WebinarBanner() {
  const { t } = useTranslation();

  const handleRegisterClick = () => {
    window.location.href = '#/webinar';
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
