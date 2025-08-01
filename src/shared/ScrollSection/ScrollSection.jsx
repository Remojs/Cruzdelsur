import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ScrollSection.module.css";
import logo from '@assets/logos/logo-complete.png';

const ScrollSection = ({ 
  imageSrc, 
  altText = "Clouds at sunset"
}) => {
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  return (
    <section ref={heroRef} className={styles.section}>
      {/* Background Image with Zoom Animation */}
      <motion.div
        className={styles.backgroundWrapper}
        initial={{ scale: 1.1 }}
        animate={isHeroInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img src={imageSrc} alt={altText} className={styles.backgroundImage} loading="eager" />
        {/* Overlay for better text readability */}
        <div className={styles.backgroundOverlay} />
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          {/* Left Box - Logo and Subtitle */}
          <motion.div
            className={styles.card}
            initial={{ x: -100, opacity: 0 }}
            animate={isHeroInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className={styles.centerContent}>
              {/* Logo */}
              <div className={styles.logoContainer}>
                <img src={logo} alt="Cruz del Sur Logo" className={styles.logo} />
              </div>
            </div>
          </motion.div>

          {/* Right Box - About Section */}
          <motion.div
            className={styles.card}
            initial={{ x: 100, opacity: 0 }}
            animate={isHeroInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <div className={styles.contentBox}>
              {/* Heading with upward animation */}
              <motion.h2
                className={styles.heading}
                initial={{ y: 30, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                <span className={styles.italic}>Quiénes somos</span>
              </motion.h2>

              {/* Description with delayed fade-in */}
              <motion.div
                className={styles.textContent}
                initial={{ opacity: 0 }}
                animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
              >
                <p className={styles.paragraph}>En el firmamento austral, la constelación Cruz del Sur ha guiado a exploradores y navegantes durante siglos. Hoy, su esencia nos inspira para acompañar y guiar a quienes navegan los cielos, lideran, transforman y sueñan en el mundo de la aviación.</p>
                <p className={styles.paragraph}>En un mundo donde la aviación evoluciona y se redefine constantemente, Cruz del Sur nace para marcar un rumbo. Somos una consultora global estratégica, que no solo interpreta el presente de la industria: la desafía, la transforma y la inspira.</p>
                <p className={styles.paragraph}>Construimos conexiones estratégicas entre personas, ideas, y objetivos. Desarrollamos proyectos de alto impacto. Articulamos oferta y demanda con precisión, optimizando tiempos, procesos y recursos clave. Diseñamos soluciones con precisión técnica, visión global y una profunda valoración del capital humano. Y lo hacemos con la certeza de que cada proyecto en el que trabajamos tiene el potencial de abrir un nuevo horizonte, elevarse y llegar a destino con éxito. Porque creemos que cada iniciativa bien dirigida no solo resuelve una necesidad: abre caminos, transforma escenarios y expande posibilidades.</p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className={styles.scrollIndicator}
        initial={{ opacity: 0, y: -20 }}
        animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 1, delay: 2.5, ease: "easeOut" }}
      >
        <div className={styles.scrollContainer}>
          <span className={styles.scrollText}>Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg className={styles.scrollArrow} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default ScrollSection;
