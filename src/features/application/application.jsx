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
          <div className={styles.buttonContainer}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFormSelection('pilot')}
              className={`${styles.selectionButton} ${styles.pilotButton}`}
            >
              <div className={styles.cardImage}></div>
              <div className={styles.cardLabel}>
                <h3>Piloto</h3>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleFormSelection('tcp')}
              className={`${styles.selectionButton} ${styles.tcpButton}`}
            >
              <div className={styles.cardImage}></div>
              <div className={styles.cardLabel}>
                <h3>Tripulante de cabina<br />de pasajeros</h3>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => window.location.href = '/under-construction'}
              className={`${styles.selectionButton} ${styles.otherButton}`}
            >
              <div className={styles.cardImage}></div>
              <div className={styles.cardLabel}>
                <h3>Otras Areas</h3>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Application;
