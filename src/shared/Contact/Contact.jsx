import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './Contact.module.css';
import ContactImg from '@assets/images/Contact.webp';

export default function Contact() {
  const { t, language } = useTranslation();
  
  const handleAboutClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContactClick = () => {
    window.location.href = '#/contact';
  };
  
  return (
    <div className={styles.contactContainer}>
      <div className={styles.textBox}>
        <h3>
          {t('contactSection.title')}
          {language === 'en' && t('contactSection.titleHighlight') && (
            <span className={styles.highlight}> {t('contactSection.titleHighlight')}</span>
          )}
        </h3>
        <p>{t('contactSection.description')}</p>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleAboutClick}>
            {t('contactSection.aboutUs')}
          </button>
          <button className={styles.button} onClick={handleContactClick}>
            {t('contactSection.viewMore')}
          </button>
        </div>
      </div>
      <div className={styles.imageBox} style={{ backgroundImage: `url(${ContactImg})` }}></div>
    </div>
  );
}
