import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ReverseScrollSection.module.css";
import logo from '@assets/logos/logo.png';

const ReverseScrollSection = ({ 
  imageSrc = "/clouds-sunset.png", 
  altText = "Clouds at sunset"
}) => {
  const sectionRef = useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.3 });

  return (
    <section ref={sectionRef} className={styles.section}>
      {/* Background Image with Zoom Animation */}
      <motion.div
        className={styles.backgroundWrapper}
        initial={{ scale: 1.1 }}
        animate={isSectionInView ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img src={imageSrc} alt={altText} className={styles.backgroundImage} loading="lazy" />
        {/* Overlay for better text readability - slightly darker */}
        <div className={`${styles.backgroundOverlay} ${styles.darkOverlay}`} />
      </motion.div>

      {/* Content Container */}
      <div className={styles.contentContainer}>
        <div className={styles.contentGrid}>
          {/* Left Box - Text Content */}
          <motion.div
            className={styles.card}
            initial={{ x: -100, opacity: 0 }}
            animate={isSectionInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
          >
            <div className={styles.contentBox}>
              {/* Heading with upward animation */}
              <motion.h2
                className={styles.heading}
                initial={{ y: 30, opacity: 0 }}
                animate={isSectionInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
              >
                <span className={styles.italic}>Nuestra misión</span>
              </motion.h2>

              {/* Description with delayed fade-in */}
              <motion.div
                className={styles.textContent}
                initial={{ opacity: 0 }}
                animate={isSectionInView ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 1, delay: 1.8, ease: "easeOut" }}
              >
                <p className={styles.paragraph}>
                  Nuestra misión es revolucionar la industria de la aviación a través de la innovación, la excelencia
                  operacional y un compromiso inquebrantable con la seguridad y la calidad.
                </p>
                <p className={styles.paragraph}>
                  Trabajamos incansablemente para crear soluciones que no solo cumplan con los más altos estándares,
                  sino que también inspiren a las futuras generaciones de aviadores.
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Box - Logo */}
          <motion.div
            className={styles.card}
            initial={{ x: 100, opacity: 0 }}
            animate={isSectionInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
          >
            <div className={styles.centerContent}>
              {/* Logo */}
              <div className={styles.logoContainer}>
                <img src={logo} alt="Cruz del Sur Logo" className={styles.logo} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ReverseScrollSection;
