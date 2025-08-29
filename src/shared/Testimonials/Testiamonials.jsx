import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslation } from "../../i18n/LanguageContext";
import styles from "./testimonials.module.css";
import { useState } from 'react';

const Testimonials = ({ imageSrc, altText = "Background", testimonials }) => {
  const { t } = useTranslation();
  const heroRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const [modal, setModal] = useState({ open: false, index: 0 });

  const items = testimonials && testimonials.length === 3
    ? testimonials
    : [
        {
          title: t?.('testimonials.0.title') || 'Excelente servicio',
          text: t?.('testimonials.0.text') || 'Confié en la mentoría de Cruz del Sur, y fue una de las decisiones más acertadas que tomé.',
          detail: t?.('testimonials.0.detail') || 'Confié en la mentoría de Cruz del Sur, y fue una de las decisiones más acertadas que tomé.'
        },
        {
          title: t?.('testimonials.1.title') || 'Profesionales',
          text: t?.('testimonials.1.text') || 'Trabajar con Cruz del Sur ha sido una de las mejores decisiones que tomé en mi preparación para una entrevista en Estados Unidos.',
          detail: t?.('testimonials.1.detail') || 'Trabajar con Cruz del Sur ha sido una de las mejores decisiones que tomé en mi preparación para una entrevista con una aerolínea en Estados Unidos.'
        },
        {
          title: t?.('testimonials.2.title') || 'Recomendado',
          text: t?.('testimonials.2.text') || 'Gracias a esta preparación, no solo logré avanzar en todas las instancias, sino que también disfruté del camino.',
          detail: t?.('testimonials.2.detail') || 'Gracias a esta preparación, no solo logré avanzar en todas las instancias, sino que también disfruté del camino.'
        }
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
                    onClick={() => setModal({ open: true, index: idx })}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setModal({ open: true, index: idx }); }}
                  >
                    <h3 className={styles.testimonialTitle}>{it.title}</h3>
                    <div className={styles.testimonialContent}>
                      <p className={styles.testimonialDesc}>"{it.text ?? it.description}"</p>
                    </div>
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
      {modal.open && (
        <div className={styles.modalBackdrop} onClick={() => setModal({ open: false, index: 0 })}>
          <motion.div
            className={styles.modal}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button className={styles.modalClose} onClick={() => setModal({ open: false, index: 0 })} aria-label="Close">×</button>
            <h3 className={styles.modalTitle}>{items[modal.index]?.title}</h3>
            <div className={styles.modalBody}>
              {items[modal.index]?.detail?.split('\n\n').map((p, i) => (
                <p key={i}>"{p}"</p>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default Testimonials;

 
