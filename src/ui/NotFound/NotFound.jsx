import React from 'react';
import styles from './NotFound.module.css';

const NotFound = () => {
  return (
    <div className={styles.notFoundContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.contentBox}>
        <div className={styles.errorCode}>404</div>
        <h1 className={styles.title}>Page Not Found</h1>
        <p className={styles.description}>
          Sorry, the page you are looking for doesn't exist or has been moved.
        </p>
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

export default NotFound;
