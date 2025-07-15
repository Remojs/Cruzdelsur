import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import styles from "./ReverseScrollSection.module.css";
import logo from '@assets/logos/logo-complete.png';

const ReverseScrollSection = ({ 
  imageSrc, 
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
                <p className={styles.paragraph}>Somos un equipo interdisciplinario de expertos con vasta experiencia profesional en la industria Aerocomercial, aviación ejecutiva y Organismos gubernamentales de aviación. Managers, Reclutadores, Psicólogos aeronáuticos, Investigadores, Auditores, Gestores, Consultores, Pilotos, Tripulantes de cabina, Instructores, unidos por una misma convicción:</p>
                <p className={styles.paragraph}>Que cada desafío en esta industria merece una respuesta hecha a medida. Única. Asertiva. Práctica. Efectiva. Técnicamente Precisa. Profunda. Humana. Valiosa. Significativa.</p>
                <p className={styles.paragraph}>Desde el diseño de Modelos y estrategias de optimización de campañas de reclutamiento, hasta la mejora estadística de los departamentos de Safety, a partir de auditorías, desarrollo e implementación de programas customizados. Experiencias de crecimiento y transformación a partir de programas de Mentoría de perfil y búsqueda laboral. La gestión de la adquisición-venta de aeronaves, así como la promoción de Vuelos Ejecutivos, merecen un capítulo aparte.  Trabajamos con un equipo especialmente dedicado según el perfil de cada proyecto y servicio que brindamos.</p>
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
