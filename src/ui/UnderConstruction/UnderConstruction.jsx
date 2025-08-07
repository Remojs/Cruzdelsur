import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './UnderConstruction.module.css';
import constructionImage from '@assets/images/underconstruction.png'; // Adjust the path as necessary

const UnderConstruction = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.constructionContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.contentBox}>
        <div className={styles.iconContainer}>
          <img src={constructionImage} alt="Under Construction" className={styles.constructionIcon} />
        </div>
        <h1 className={styles.title}>Área en construcción</h1>
        <p className={styles.description}>
          Algunas secciones de nuestro sitio web aún están en desarrollo, pero nuestro equipo está activo trabajando y a la espera de tu mensaje. 
        </p>
        <div className={styles.statusContainer}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Estado:</span>
            <span className={styles.statusValue}>En desarrollo</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Esperado:</span>
            <span className={styles.statusValue}>Próximamente</span>
          </div>
        </div>
        <p className={styles.contactText}>
          Escribinos tu consulta, inquietud o solicitud
        </p>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.homeButton}
            onClick={() => navigate('/')}
          >
            <span className={styles.buttonIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
              </svg>
            </span>
            Home
          </button>
          <button 
            className={styles.contactButton}
            onClick={() => navigate('/contact')}
          >
            <span className={styles.buttonIcon}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
              </svg>
            </span>
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
