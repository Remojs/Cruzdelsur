import React from 'react';
import { useTranslation } from '../../i18n/LanguageContext';
import styles from './LanguageSelector.module.css';

const LanguageSelector = () => {
  const { language, changeLanguage } = useTranslation();

  return (
    <div className={styles.languageSelector}>
      <button 
        className={`${styles.langButton} ${language === 'es' ? styles.active : ''}`}
        onClick={() => changeLanguage('es')}
        title="Español"
      >
        ES
      </button>
      <span className={styles.separator}>|</span>
      <button 
        className={`${styles.langButton} ${language === 'en' ? styles.active : ''}`}
        onClick={() => changeLanguage('en')}
        title="English"
      >
        EN
      </button>
    </div>
  );
};

export default LanguageSelector;
