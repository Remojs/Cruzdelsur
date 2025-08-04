import React from 'react';
import styles from './Contact.module.css';
import ContactImg from '@assets/images/Contact.webp';

export default function Contact() {
  return (
    <div className={styles.contactContainer}>
      <div className={styles.textBox}>
        <h3>CONTACT <span className={styles.highlight}>US</span></h3>
        <p>Driven by strategic vision and deep market knowledge, Cruz del Sur combines world-class charter services.</p>
        <div className={styles.buttons}>
          <button className={styles.button}>ABOUT US</button>
          <button className={styles.button}>VIEW MORE</button>
        </div>
      </div>
      <div className={styles.imageBox} style={{ backgroundImage: `url(${ContactImg})` }}></div>
    </div>
  );
}
