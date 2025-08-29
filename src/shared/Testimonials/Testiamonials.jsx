import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "../../i18n/LanguageContext";
import styles from "./testimonials.module.css";

const Testimonials = ({ imageSrc, altText = "Background", testimonials }) => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });

  const items = testimonials && testimonials.length === 3
    ? testimonials
    : [
        { title: t?.('testimonials.0.title') || 'Excelente servicio', description: t?.('testimonials.0.desc') || 'Muy satisfecho con la atención y los resultados.' },
        { title: t?.('testimonials.1.title') || 'Profesionales', description: t?.('testimonials.1.desc') || 'Equipo profesional y entrega a tiempo.' },
        { title: t?.('testimonials.2.title') || 'Recomendado', description: t?.('testimonials.2.desc') || 'Los recomendaría a otras empresas.' }
      ];

  return (
    <section ref={heroRef} className={styles.section}>
      <motion.div
        className={styles.backgroundWrapper}
        initial={{ scale: 1.05 }}
        animate={isHeroInView ? { scale: 1 } : { scale: 1.05 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        {imageSrc && <img src={imageSrc} alt={altText} className={styles.backgroundImage} loading="eager" />}
        <div className={styles.backgroundOverlay} />
      </motion.div>

      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          <motion.div
            className={`${styles.card} ${styles.cardFull}`}
            initial={{ opacity: 0, y: 30 }}
            animate={isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 1, delay: 0.6, ease: "easeOut" }}
          >
            <div className={styles.contentBox}>
              <motion.h2
                className={styles.heading}
                initial={{ y: 20, opacity: 0 }}
                animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
              >

              </motion.h2>

              <div className={styles.testimonialsRow}>
                {items.map((it, idx) => (
                  <motion.div
                    key={idx}
                    className={styles.testimonialCard}
                    initial={{ y: 20, opacity: 0 }}
                    animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 1 + idx * 0.25, ease: "easeOut" }}
                  >
                    <h3 className={styles.testimonialTitle}>{it.title}</h3>
                    <p className={styles.testimonialDesc}>{it.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

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

export default Testimonials;
