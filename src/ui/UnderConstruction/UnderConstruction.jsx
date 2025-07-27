import React from 'react';
import styles from './UnderConstruction.module.css';

const UnderConstruction = () => {
  return (
    <div className={styles.constructionContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.contentBox}>
        <div className={styles.iconContainer}>
          <div className={styles.constructionIcon}>🚧</div>
        </div>
        <h1 className={styles.title}>Under Construction</h1>
        <p className={styles.description}>
          We're working hard to bring you this section. Please check back soon for updates and new content.
        </p>
        <div className={styles.statusContainer}>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Status:</span>
            <span className={styles.statusValue}>In Development</span>
          </div>
          <div className={styles.statusItem}>
            <span className={styles.statusLabel}>Expected:</span>
            <span className={styles.statusValue}>Coming Soon</span>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button 
            className={styles.homeButton}
            onClick={() => window.location.href = '/'}
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderConstruction;
