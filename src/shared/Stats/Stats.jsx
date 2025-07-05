import React from 'react';
import styles from './Stats.module.css';

export default function Stats() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.grayBox}>
        <div className={styles.grayStatsBox}>
            <h3>Tailored Aviation & Talent Solutions for Latin America</h3>
                <p>Driven by strategic vision and deep market knowledge, Cruz del Sur combines world-class charter services with custom recruitment solutions for the aviation industry. Our mission is to deliver end-to-end support that elevates your operations and enhances every aspect of the flight and hiring experience.</p>
                <div className={styles.stats}>
                <div className={styles.stat}>
                    <h4>+8</h4>
                    <span>STATS IN TIME</span>
                </div>
                <div className={styles.stat}>
                    <h4>738</h4>
                    <span>STATS IN TIME</span>
                </div>
                <div className={styles.stat}>
                    <h4>48</h4>
                    <span>STATS IN TIME</span>
                </div>
                <div className={styles.stat}>
                    <h4>+500</h4>
                    <span>STATS IN TIME</span>
                </div>
                </div>
        </div>
      </div>
      <div className={styles.blackBox}></div>
    </div>
  );
}