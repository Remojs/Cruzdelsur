import React from 'react';
import styles from './TextSection.module.css';

const TextSection = ({ imageSrc, altText, reversed, title, heading, paragraphs }) => {
  return (
    <div className={reversed ? styles.contentGridReversed : styles.contentGrid}>
      <div className={styles.imageColumn}>
        <img src={imageSrc} alt={altText} className={styles.heroImage} loading="lazy" />
      </div>

      <div className={styles.contentColumn}>
        <h2 className={styles.sectionTitle}>{title}</h2>

        <h3 className={styles.mainHeading}>{heading}</h3>

        <div className={styles.textContent}>
          {paragraphs.map((paragraph, index) => (
            <p key={index} className={styles.paragraph}>{paragraph}</p>
          ))}
        </div>

        <button className={styles.ctaButton}>READ MORE</button>
      </div>
    </div>
  );
};

export default TextSection;
