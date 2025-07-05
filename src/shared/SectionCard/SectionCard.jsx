import React from 'react';
import styles from './SectionCard.module.css';

export default function SectionCard({ title, image, link }) {
  return (
    <a href={link} className={styles.card} style={{ backgroundImage: `url(${image})` }}>
      <div className={styles.overlay}></div>
      <h2 className={styles.title}>{title}</h2>
    </a>
  );
}
