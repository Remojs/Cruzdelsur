import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './WebinarBanner.module.css';
import WebinarBannerDesktop from '@assets/banners/mentoria-banner.png';
import WebinarBannerMobile from '@assets/banners/mentoria-banner-mobile.png';

export default function WebinarBanner() {
  const { t } = useTranslation();

  const handleRegisterClick = () => {
    // Redirect to Google Forms
    window.open('https://docs.google.com/forms/d/e/1FAIpQLSeMq3SUIQTm0947dfrGZkrX0jG4zFHnX7AEIwZ9mWo8zPVaEQ/viewform', '_blank');
  };

  return (
    <div className={styles.bannerContainer}>
      <div className={styles.bannerImage}>
        <img 
          src={WebinarBannerDesktop} 
          alt="Webinar Banner" 
          className={styles.desktopImage}
        />
        <img 
          src={WebinarBannerMobile} 
          alt="Webinar Banner Mobile" 
          className={styles.mobileImage}
        />
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
