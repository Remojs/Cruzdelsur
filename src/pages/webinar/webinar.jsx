import React from "react";
import styles from "./webinar.module.css";
import webinarBanner from "@assets/banners/webinar banner.png";

export default function Webinar() {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted");
  };

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBackground}>
          <img src={webinarBanner} alt="Webinar Background" className={styles.heroImage} />
          <div className={styles.heroOverlay}>
            <div className={styles.heroContent}>
              <button
                className={styles.readMoreButton}
                onClick={() => {
                  const el = document.getElementById('que-aprenderas');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                LEER MÁS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Exclusive Webinar Section */}
      <section className={styles.webinarSection}>
        <div className={styles.sectionContent}>
          <div className={styles.webinarHeader}>
            <div className={styles.badge}>WEBINAR EXCLUSIVO</div>
            <h2 className={styles.webinarTitle}>El Futuro de la Aviación Privada: Tendencias, Tecnología y Sostenibilidad</h2>
            <p className={styles.webinarDescription}>
              Únete a los líderes de la industria mientras exploramos el panorama en evolución de la aviación privada, desde tecnología de vanguardia hasta soluciones de vuelo sostenibles que están transformando la industria.
            </p>
          </div>

          <div className={styles.webinarDetails}>
            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#b38d2f" strokeWidth="2" />
                  <line x1="16" y1="2" x2="16" y2="6" stroke="#b38d2f" strokeWidth="2" />
                  <line x1="8" y1="2" x2="8" y2="6" stroke="#b38d2f" strokeWidth="2" />
                  <line x1="3" y1="10" x2="21" y2="10" stroke="#b38d2f" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Fecha</strong>
                <span>15 de agosto</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#b38d2f" strokeWidth="2" />
                  <polyline points="12,6 12,12 16,14" stroke="#b38d2f" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Hora</strong>
                <span>15:00 a 16:00 (GMT-3 Argentina)</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" stroke="#b38d2f" strokeWidth="2" />
                  <line x1="8" y1="21" x2="16" y2="21" stroke="#b38d2f" strokeWidth="2" />
                  <line x1="12" y1="17" x2="12" y2="21" stroke="#b38d2f" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Formato</strong>
                <span>Evento Online en Vivo</span>
              </div>
            </div>

            <div className={styles.detailItem}>
              <div className={styles.detailIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M2 17L12 22L22 17" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M2 12L12 17L22 12" stroke="#b38d2f" strokeWidth="2" />
                </svg>
              </div>
              <div className={styles.detailContent}>
                <strong>Duración</strong>
                <span>90 Minutos + Preguntas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What You'll Learn Section */}
      <section className={styles.learningSection} id="que-aprenderas">
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Qué Aprenderás</h2>
          <div className={styles.learningGrid}>
            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M8 40L16 32L24 40L32 28L40 36"
                    stroke="#b38d2f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M40 28V36H32"
                    stroke="#b38d2f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <rect x="4" y="4" width="40" height="40" rx="2" stroke="#b38d2f" strokeWidth="2" />
                </svg>
              </div>
              <h3>Actualidad del mercado</h3>
              <p>
                Análisis profundo de las tendencias actuales del sector aeronáutico, oportunidades de crecimiento emergentes, nuevos nichos de mercado y comportamiento del consumidor post-pandemia. Comprenderás las dinámicas económicas que están redefiniendo la industria de la aviación y cómo posicionarte estratégicamente en este contexto cambiante.
              </p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path d="M12 20C12 16.6863 14.6863 14 18 14H30C33.3137 14 36 16.6863 36 20V28C36 31.3137 33.3137 34 30 34H18C14.6863 34 12 31.3137 12 28V20Z" stroke="#b38d2f" strokeWidth="2"/>
                  <path d="M24 20V28" stroke="#b38d2f" strokeWidth="2"/>
                  <path d="M18 24H30" stroke="#b38d2f" strokeWidth="2"/>
                  <circle cx="24" cy="8" r="4" stroke="#b38d2f" strokeWidth="2"/>
                  <path d="M16 40C16 36.6863 18.6863 34 22 34H26C29.3137 34 32 36.6863 32 40V44H16V40Z" stroke="#b38d2f" strokeWidth="2"/>
                </svg>
              </div>
              <h3>Storytelling</h3>
              <p>
                Técnicas avanzadas de narrativa personal y profesional para construir una marca personal sólida en el sector aeronáutico. Aprenderás a comunicar tu experiencia de manera convincente, desarrollar tu propuesta de valor única y crear conexiones auténticas que impulsen tu carrera. Incluye estrategias para redes sociales profesionales y presentaciones impactantes.
              </p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="28" rx="2" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M16 8V16" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M32 8V16" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M8 24H40" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M14 30H26" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M14 34H22" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round"/>
                  <circle cx="34" cy="32" r="2" fill="#b38d2f" />
                </svg>
              </div>
              <h3>Preparación de CV</h3>
              <p>
                Metodología especializada para crear currículums vitae que destaquen en la industria aeronáutica. Conocerás las expectativas específicas de reclutadores del sector, formatos optimizados, palabras clave estratégicas y cómo presentar experiencia técnica de manera atractiva. Incluye templates exclusivos y técnicas de optimización para sistemas ATS utilizados por las principales empresas aeronáuticas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section - Commented out until speakers are confirmed 
      <section className={styles.speakersSection}>
        <div className={styles.sectionContent}>
          <h2 className={styles.sectionTitle}>Ponentes Destacados</h2>
          <div className={styles.speakersGrid}>
            <div className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                <span>JD</span>
              </div>
              <h3>John Davidson</h3>
              <p className={styles.speakerTitle}>CEO, AeroTech Solutions</p>
              <p className={styles.speakerBio}>
                Más de 20 años en tecnología de aviación, ex ejecutivo de Boeing, experto líder en aviación sostenible.
              </p>
            </div>
            <div className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                <span>SM</span>
              </div>
              <h3>Sarah Mitchell</h3>
              <p className={styles.speakerTitle}>Directora de Innovación, SkyVentures</p>
              <p className={styles.speakerBio}>
                Pionera en desarrollo de aeronaves eléctricas, graduada del MIT, 15 años en ingeniería aeroespacial.
              </p>
            </div>
            <div className={styles.speakerCard}>
              <div className={styles.speakerAvatar}>
                <span>RC</span>
              </div>
              <h3>Robert Chen</h3>
              <p className={styles.speakerTitle}>Analista de Mercado de Aviación</p>
              <p className={styles.speakerBio}>
                Investigador de mercado líder, autor publicado sobre tendencias de aviación, consultor para aerolíneas principales.
              </p>
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Registration Form Section */}
      <section className={styles.registrationSection}>
        <div className={styles.sectionContent}>
          <div className={styles.registrationContainer}>
            <div className={styles.registrationInfo}>
              <h2>Reserva Tu Lugar</h2>
              <p>
                No te pierdas esta oportunidad exclusiva de obtener perspectivas de líderes de la industria y conectar con profesionales de aviación de todo el mundo.
              </p>
              <div className={styles.benefits}>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#b38d2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Preguntas y respuestas en vivo con expertos de la industria</span>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#b38d2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Recursos descargables y reportes</span>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#b38d2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Grabación disponible durante 30 días</span>
                </div>
                <div className={styles.benefit}>
                  <div className={styles.checkIcon}>
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M16.6667 5L7.5 14.1667L3.33333 10"
                        stroke="#b38d2f"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  <span>Oportunidades de networking</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.registrationForm}>
              <h3>¡Regístrate Ahora - Es Gratis!</h3>

              <div className={styles.consentGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  Acepto recibir comunicaciones sobre eventos y novedades de Cruz del Sur
                </label>
                
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" className={styles.checkbox} />
                  He leído y acepto los términos y condiciones y política de privacidad
                </label>
              </div>

              <button type="submit" className={styles.registerButton}>
                Reservar mi lugar
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
