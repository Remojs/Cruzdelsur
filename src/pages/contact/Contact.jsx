import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    area: '',
    mensaje: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // Configuración de EmailJS
      const serviceID = 'service_h8z0l4d';
      const templateID = 'template_qnbea27';
      const publicKey = 'sU3TGIfm5GNx7fQWs';

      const templateParams = {
        from_name: formData.nombre,
        from_email: formData.correo,
        phone: formData.telefono,
        area: areas.find(a => a.value === formData.area)?.label || formData.area,
        message: formData.mensaje,
        to_email: 'cruzdelsur-aviacion@outlook.com'
      };

      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        area: '',
        mensaje: ''
      });
      
    } catch (error) {
      console.error('Error sending email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const areas = [
    { value: '', label: 'Selecciona un área' },
    { value: 'consulting', label: 'Consulting' },
    { value: 'recruitment', label: 'Recruitment' },
    { value: 'safety', label: 'Safety' },
    { value: 'academy', label: 'Academy' },
    { value: 'flights', label: 'Flights' },
    { value: 'learning', label: 'Learning' },
    { value: 'general', label: 'Consulta General' }
  ];

  return (
    <div className={styles.contactContainer}>
      <div className={styles.backgroundImage}></div>
      <div className={styles.contentBox}>
        <div className={styles.iconContainer}>
          <svg className={styles.contactIcon} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 4V6H9V4L3 7V9H21ZM21 10H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V10Z"/>
          </svg>
        </div>
        <h1 className={styles.title}>Contáctanos</h1>
        <p className={styles.description}>
          Estamos aquí para ayudarte. Completa el formulario y nos pondremos en contacto contigo lo antes posible.
        </p>
        
        <form className={styles.contactForm} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="nombre" className={styles.label}>Nombre *</label>
            <input
              type="text"
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Ingresa tu nombre completo"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="correo" className={styles.label}>Correo Electrónico *</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="tu@email.com"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="telefono" className={styles.label}>Teléfono</label>
            <input
              type="tel"
              id="telefono"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={styles.input}
              placeholder="+54 11 1234-5678"
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="area" className={styles.label}>Área de Interés *</label>
            <select
              id="area"
              name="area"
              value={formData.area}
              onChange={handleChange}
              required
              className={styles.select}
            >
              {areas.map(area => (
                <option key={area.value} value={area.value}>
                  {area.label}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="mensaje" className={styles.label}>Mensaje *</label>
            <textarea
              id="mensaje"
              name="mensaje"
              value={formData.mensaje}
              onChange={handleChange}
              required
              className={styles.textarea}
              placeholder="Cuéntanos cómo podemos ayudarte..."
              rows="5"
            />
          </div>

          <div className={styles.buttonContainer}>
            <button 
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              <span className={styles.buttonIcon}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                </svg>
              </span>
              {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
            </button>
          </div>
          
          {submitStatus === 'success' && (
            <div className={styles.successMessage}>
              ¡Mensaje enviado correctamente! Nos pondremos en contacto contigo pronto.
            </div>
          )}
          
          {submitStatus === 'error' && (
            <div className={styles.errorMessage}>
              Error al enviar el mensaje. Por favor, intenta nuevamente.
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Contact;
