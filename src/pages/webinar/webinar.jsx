import React, { useState } from "react";
import styles from "./webinar.module.css";
import webinarBanner from "@assets/banners/webinar banner.png";

export default function Webinar() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    position: "",
    phone: "",
    interests: [],
    marketingConsent: false,
  });

  const [isRegistered, setIsRegistered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleInterestChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Registration submitted:", formData);
    setIsRegistered(true);
  };

  if (isRegistered) {
    return (
      <div className={styles.container}>
        <div className={styles.successMessage}>
          <div className={styles.successIcon}>
            <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
              <circle cx="40" cy="40" r="40" fill="#b38d2f" />
              <path
                d="M25 40L35 50L55 30"
                stroke="white"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <h1>Registration Confirmed!</h1>
          <p>Thank you for registering for our exclusive webinar.</p>
          <p>You'll receive a confirmation email with the webinar link shortly.</p>
          <button onClick={() => setIsRegistered(false)} className={styles.backButton}>
            Register Another Attendee
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Banner Section */}
      <section className={styles.banner}>
        <div className={styles.bannerBackground}>
          <img src={webinarBanner} alt="Webinar Banner" className={styles.bannerImage} />
          <div className={styles.bannerOverlay}>
            <div className={styles.bannerContent}>
              <div className={styles.bannerText}>
                <h1 className={styles.bannerTitle}>
                  EMPODERANDO LA AVIACIÓN
                  <br />
                  <span className={styles.bannerSubtext}>profesionales con</span>
                  <br />
                  <span className={styles.bannerScript}>Confianza y Estrategia</span>
                </h1>
                <p className={styles.bannerDescription}>
                  Desde la planificación operativa hasta el servicio premium a bordo, diseñamos cada experiencia de vuelo para satisfacer sus necesidades únicas.
                </p>
                <div className={styles.bannerFeatures}>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#b38d2f" strokeWidth="2" />
                        <path d="M8 12L11 15L16 9" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span>Experiencia Regional</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#b38d2f" strokeWidth="2" />
                        <polyline points="12,6 12,12 16,14" stroke="#b38d2f" strokeWidth="2" />
                      </svg>
                    </div>
                    <span>Puntualidad</span>
                  </div>
                  <div className={styles.featureItem}>
                    <div className={styles.featureIcon}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="#b38d2f" strokeWidth="2" />
                        <path d="M9 12L11 14L15 10" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                    </div>
                    <span>Servicio de Calidad</span>
                  </div>
                </div>
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
                <span>15 de Marzo, 2024</span>
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
                <span>2:00 PM - 3:30 PM EST</span>
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
                  <path d="M24 4L44 14V34L24 44L4 34V14L24 4Z" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M24 4V44" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M4 14L24 24L44 14" stroke="#b38d2f" strokeWidth="2" />
                </svg>
              </div>
              <h3>Innovación y Tecnología</h3>
              <p>
                Descubre los últimos avances tecnológicos en diseño de aeronaves, aviónica y sistemas de gestión de vuelo.
              </p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 8C30.6274 8 36 13.3726 36 20C36 26.6274 30.6274 32 24 32C17.3726 32 12 26.6274 12 20C12 13.3726 17.3726 8 24 8Z"
                    stroke="#b38d2f"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 40C8 33.3726 13.3726 28 20 28H28C34.6274 28 40 33.3726 40 40V44H8V40Z"
                    stroke="#b38d2f"
                    strokeWidth="2"
                  />
                </svg>
              </div>
              <h3>Aviación Sostenible</h3>
              <p>
                Aprende sobre iniciativas ecológicas, combustibles de aviación sostenibles y opciones de vuelo carbono neutro.
              </p>
            </div>

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
              <h3>Tendencias del Mercado</h3>
              <p>Comprende las dinámicas actuales del mercado, oportunidades de crecimiento y preferencias emergentes de los clientes.</p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M24 4C35.0457 4 44 12.9543 44 24C44 35.0457 35.0457 44 24 44C12.9543 44 4 35.0457 4 24C4 12.9543 12.9543 4 24 4Z"
                    stroke="#b38d2f"
                    strokeWidth="2"
                  />
                  <path
                    d="M18 24L22 28L30 20"
                    stroke="#b38d2f"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3>Seguridad y Regulaciones</h3>
              <p>Mantente actualizado sobre los últimos protocolos de seguridad, cambios regulatorios y requisitos de cumplimiento.</p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <rect x="8" y="12" width="32" height="28" rx="2" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M16 8V16" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M32 8V16" stroke="#b38d2f" strokeWidth="2" />
                  <path d="M8 24H40" stroke="#b38d2f" strokeWidth="2" />
                  <circle cx="20" cy="32" r="2" fill="#b38d2f" />
                  <circle cx="28" cy="32" r="2" fill="#b38d2f" />
                </svg>
              </div>
              <h3>Gestión de Flota</h3>
              <p>Optimiza las operaciones con estrategias avanzadas de gestión de flota y herramientas de transformación digital.</p>
            </div>

            <div className={styles.learningItem}>
              <div className={styles.learningIcon}>
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <path
                    d="M20 6C20 4.89543 20.8954 4 22 4H26C27.1046 4 28 4.89543 28 6V10H20V6Z"
                    stroke="#b38d2f"
                    strokeWidth="2"
                  />
                  <path
                    d="M8 10H40V38C40 40.2091 38.2091 42 36 42H12C9.79086 42 8 40.2091 8 38V10Z"
                    stroke="#b38d2f"
                    strokeWidth="2"
                  />
                  <path d="M18 20V30" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round" />
                  <path d="M24 18V30" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round" />
                  <path d="M30 22V30" stroke="#b38d2f" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
              <h3>Experiencia del Cliente</h3>
              <p>Mejora la satisfacción del pasajero a través de servicios personalizados y tecnologías innovadoras de cabina.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Speakers Section */}
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

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Nombre *</label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Apellido *</label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={styles.input}
                    required
                  />
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Empresa</label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={handleInputChange}
                    className={styles.input}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label>Cargo</label>
                  <select
                    name="position"
                    value={formData.position}
                    onChange={handleInputChange}
                    className={styles.select}
                  >
                    <option value="">Seleccionar Cargo</option>
                    <option>CEO/Presidente</option>
                    <option>VP/Director</option>
                    <option>Gerente</option>
                    <option>Piloto</option>
                    <option>Ingeniero</option>
                    <option>Consultor</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>

              <div className={styles.formGroup}>
                <label>Número de Teléfono</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label>Áreas de Interés (Selecciona todas las que apliquen)</label>
                <div className={styles.interestsGrid}>
                  {[
                    "Tecnología Aeronáutica",
                    "Aviación Sostenible",
                    "Análisis de Mercado",
                    "Seguridad y Regulaciones",
                    "Gestión de Flota",
                    "Experiencia del Cliente",
                  ].map((interest) => (
                    <label key={interest} className={styles.checkboxLabel}>
                      <input
                        type="checkbox"
                        checked={formData.interests.includes(interest)}
                        onChange={() => handleInterestChange(interest)}
                        className={styles.checkbox}
                      />
                      {interest}
                    </label>
                  ))}
                </div>
              </div>

              <div className={styles.consentGroup}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    name="marketingConsent"
                    checked={formData.marketingConsent}
                    onChange={handleInputChange}
                    className={styles.checkbox}
                  />
                  Acepto recibir actualizaciones sobre futuros webinars y perspectivas de la industria de aviación.
                </label>
              </div>

              <button type="submit" className={styles.registerButton}>
                Registrarse al Webinar Gratuito
              </button>

              <p className={styles.disclaimer}>
                Al registrarte, aceptas nuestra política de privacidad. Respetamos tu privacidad y nunca compartiremos tu información.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
