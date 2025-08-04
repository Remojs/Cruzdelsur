import React from 'react';
import styles from './SectionCard.module.css';

export default function SectionCard({ title, image, link, index, description }) {
  const getTitleClass = () => {
    // Aplicar color #0f3a79 a las cards 2 y 4 (índices 1 y 3)
    if (index === 1 || index === 3) {
      return `${styles.title} ${styles.blueTitle}`;
    }
    return styles.title;
  };

  return (
    <a href={link} className={styles.card} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}></div>
      <h2 className={getTitleClass()}>{title}</h2>
      <div className={styles.hoverText} style={{ backgroundImage: `url(${image})` }}>
        <div className={styles.hoverOverlay}></div>
        <div className={styles.hoverContent}>
          <h3 className={styles.hoverTitle}>{title}</h3>
          <p className={styles.hoverDescription}>{description}</p>
        </div>
      </div>
    </a>
  );
}
