import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ScrollSection.module.css";

const ScrollSection = ({ 
  imageSrc = "/clouds-sunset.png", 
  altText = "Clouds at sunset"
}) => {
  const heroRef = useRef(null);
  const missionRef = useRef(null);
  const isHeroInView = useInView(heroRef, { once: true, amount: 0.3 });
  const isMissionInView = useInView(missionRef, { once: true, amount: 0.3 });

  return (
    <>
      {/* First Section - Hero */}
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
                {/* Logo Placeholder */}
                <div className={styles.logoContainer}>
                  <div className={styles.logoInner}>
                    <svg className={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                </div>

                {/* Company Name */}
                <h1 className={styles.companyName}>
                  <span className={styles.italic}>Cruz del Sur</span>
                </h1>

                {/* Subtitle */}
                <p className={styles.subtitle}>
                  Inspiring Aviation
                </p>
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
                  <p className={styles.paragraph}>
                    Somos una empresa dedicada a inspirar y conectar el mundo de la aviación. Con años de experiencia en
                    el sector, nos especializamos en brindar servicios excepcionales que elevan los estándares de la
                    industria.
                  </p>
                  <p className={styles.paragraph}>
                    Nuestra pasión por volar nos impulsa a crear experiencias únicas que trascienden las nubes y tocan
                    el cielo.
                  </p>
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

      {/* Second Section - Mission (Reversed Layout) */}
      <section
        ref={missionRef}
        className={styles.section}
      >
        {/* Background Image with Zoom Animation - Slightly Dimmed */}
        <motion.div
          className={styles.backgroundWrapper}
          initial={{ scale: 1.1 }}
          animate={isMissionInView ? { scale: 1 } : { scale: 1.1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <img src={imageSrc} alt={altText} className={styles.backgroundImage} loading="lazy" />
          {/* Darker overlay to distinguish from first section */}
          <div className={`${styles.backgroundOverlay} ${styles.darkOverlay}`} />
        </motion.div>

        {/* Content Container */}
        <div className={styles.contentContainer}>
          <div className={styles.contentGrid}>
            {/* Left Box - Mission Section (slides from right) */}
            <motion.div
              className={styles.card}
              initial={{ x: -100, opacity: 0 }}
              animate={isMissionInView ? { x: 0, opacity: 1 } : { x: -100, opacity: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            >
              <div className={styles.contentBox}>
                {/* Heading with upward animation */}
                <motion.h2
                  className={styles.heading}
                  initial={{ y: 30, opacity: 0 }}
                  animate={isMissionInView ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
                  transition={{ duration: 0.8, delay: 1.2, ease: "easeOut" }}
                >
                  <span className={styles.italic}>Nuestra misión</span>
                </motion.h2>

                {/* Description with delayed fade-in */}
                <motion.div
                  className={styles.textContent}
                  initial={{ opacity: 0 }}
                  animate={isMissionInView ? { opacity: 1 } : { opacity: 0 }}
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

            {/* Right Box - Logo and Subtitle (slides from left) */}
            <motion.div
              className={styles.card}
              initial={{ x: 100, opacity: 0 }}
              animate={isMissionInView ? { x: 0, opacity: 1 } : { x: 100, opacity: 0 }}
              transition={{ duration: 1, delay: 0.7, ease: "easeOut" }}
            >
              <div className={styles.centerContent}>
                {/* Logo Placeholder */}
                <div className={styles.logoContainer}>
                  <div className={styles.logoInner}>
                    <svg className={styles.logoIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                </div>

                {/* Company Name */}
                <h3 className={styles.companyName}>
                  <span className={styles.italic}>Cruz del Sur</span>
                </h3>

                {/* Subtitle */}
                <p className={styles.subtitle}>
                  Inspiring Aviation
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ScrollSection;
