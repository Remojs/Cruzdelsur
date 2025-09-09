import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../../i18n/LanguageContext';
import PilotForm from './components/PilotForm';
import TCPForm from './components/TCPForm';
import styles from './application.module.css';

const Application = () => {
  const { t } = useTranslation();
  const [selectedForm, setSelectedForm] = useState(null);

  const handleFormSelection = (formType) => {
    setSelectedForm(formType);
  };

  const handleBackToSelection = () => {
    setSelectedForm(null);
  };

  if (selectedForm) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <button 
            onClick={handleBackToSelection}
            className={styles.backButton}
            aria-label={t('application.back')}
          >
            ← {t('application.back')}
          </button>
        </div>
        {selectedForm === 'pilot' && <PilotForm onBack={handleBackToSelection} />}
        {selectedForm === 'tcp' && <TCPForm onBack={handleBackToSelection} />}
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className={styles.introSection}
        >
          <h1 className={styles.title}>{t('application.title')}</h1>
          <p className={styles.description}>{t('application.description')}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={styles.selectionSection}
        >
          <h2 className={styles.selectionTitle}>{t('application.selectPosition')}</h2>
          <div className={styles.buttonContainer}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFormSelection('pilot')}
              className={`${styles.selectionButton} ${styles.pilotButton}`}
            >
              <div className={styles.buttonContent}>
                <div className={styles.buttonIcon}>✈️</div>
                <div className={styles.buttonText}>
                  <h3>{t('application.pilot.title')}</h3>
                  <p>{t('application.pilot.description')}</p>
                </div>
              </div>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFormSelection('tcp')}
              className={`${styles.selectionButton} ${styles.tcpButton}`}
            >
              <div className={styles.buttonContent}>
                <div className={styles.buttonIcon}>👥</div>
                <div className={styles.buttonText}>
                  <h3>{t('application.tcp.title')}</h3>
                  <p>{t('application.tcp.description')}</p>
                </div>
              </div>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Application;
