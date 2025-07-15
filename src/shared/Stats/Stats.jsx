import React from 'react';
import styles from './Stats.module.css';

export default function Stats() {
  return (
    <div className={styles.statsContainer}>
      <div className={styles.grayBox}>
        <div className={styles.grayStatsBox}>
          <h3 className={styles.bulletTitle}>Lo que nos define</h3>
          <ul className={styles.bulletList}>
            <li className={styles.bulletItem}><b>Rigurosidad operativa + sensibilidad cultural:</b> Porque la excelencia técnica no tiene sentido sin un entendimiento profundo de las personas y los contextos.</li>
            <li className={styles.bulletItem}><b>Escucha activa + pensamiento estratégico:</b> Porque no creemos en soluciones enlatadas. Cada cliente es único, y cada proyecto también debe serlo.</li>
            <li className={styles.bulletItem}><b>Red global + conocimiento local:</b> Porque trabajamos a nivel global, pero buscamos el valor estratégico y particular de lo que se construye en cada lugar.</li>
            <li className={styles.bulletItem}><b>Visión de futuro + ejecución viable:</b> Porque acompañamos procesos de transformación con herramientas concretas, innovadoras y prácticas.</li>
          </ul>
        </div>
      </div>
      <div className={styles.blackBox}></div>
    </div>
  );
}