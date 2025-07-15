import React, { useState } from "react"
import styles from "./charters.module.css"

export default function Charters() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    passengers: "1",
    title: "Mr.",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    phoneCountry: "+1",
    flyingFrequency: "",
    currentSolution: "",
    additionalRequests: "",
    marketingConsent: false,
    privacyConsent: false,
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
  }

  return (
    <div className={styles.container}>

      <div className={styles.header}>
        <div className={styles.cdsIcon}>
            <img src="" alt="" />
        </div>
      </div>


      <div className={styles.content}>
        <h1 className={styles.mainTitle}>Solicita una Cotización para tu Próximo Vuelo Charter</h1>

        <p className={styles.description}>
          Cada vuelo tiene una historia, una necesidad y un propósito diferente. Por eso, en Cruz del Sur diseñamos experiencias de vuelo que combinan eficiencia operativa, confort y precisión a medida.
        </p>

        <p className={styles.description}>
          Contanos los detalles de tu próximo viaje y nuestro equipo te contactará a la brevedad con una propuesta personalizada, pensada para optimizar tu tiempo y responder con exactitud a tus expectativas.
        </p>

        <p className={styles.subDescription}>
          Completá el formulario con toda la información posible. Estamos listos para ayudarte a llegar más alto.
        </p>


        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.flightSearchSection}>
            <h3 className={styles.sectionSubtitle}>Detalles del Vuelo</h3>

            <div className={styles.flightSearch}>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>Desde</label>
                  <input  type="text"  name="from"  value={formData.from}  onChange={handleInputChange}  className={styles.searchInput}  placeholder="Ciudad de origen"/>
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>Hasta</label>
                  <input type="text" name="to" value={formData.to} onChange={handleInputChange} className={styles.searchInput} placeholder="Ciudad de destino"   />
                </div>
              </div>
            </div>

            <div className={styles.flightSearch}>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>Fecha</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={styles.searchInput}   />
                  <span className={styles.addReturn}>Agregar regreso</span>
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>Pasajeros</label>
                  <div className={styles.passengerCounter}>
                    <button
                      type="button"
                      className={styles.counterButton}
                      onClick={() =>setFormData((prev) => ({...prev,passengers: Math.max(1, Number.parseInt(prev.passengers) - 1).toString(),}))}>-
                    </button>
                    <span className={styles.passengerNumber}>{formData.passengers}</span>
                    <button
                      type="button"
                      className={styles.counterButton}
                      onClick={() =>setFormData((prev) => ({...prev,passengers: (Number.parseInt(prev.passengers) + 1).toString(),}))}>+
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className={styles.personalInfoSection}>
            <h3 className={styles.sectionSubtitle}>Información Personal</h3>

            <div className={styles.nameRow}>
              <div className={styles.titleField}>
                <label>Título</label>
                <select name="title" value={formData.title} onChange={handleInputChange} className={styles.select}>
                  <option>Sr.</option>
                  <option>Sra.</option>
                  <option>Srta.</option>
                  <option>Dr.</option>
                </select>
              </div>
              <div className={styles.nameField}>
                <label>Nombre</label>
                <input  type="text"  name="firstName"  value={formData.firstName}  onChange={handleInputChange}  className={styles.input}  placeholder="Ingrese su nombre"/>
              </div>
              <div className={styles.nameField}>
                <label>Apellido</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={styles.input} placeholder="Ingrese su apellido"/>
              </div>
            </div>

            <div className={styles.contactRow}>
              <div className={styles.emailField}>
                <label>Correo Electrónico</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} placeholder="su.correo@ejemplo.com" />
              </div>
              <div className={styles.phoneField}>
                <label>Número de Teléfono</label>
                <div className={styles.phoneGroup}>
                  <select name="phoneCountry" value={formData.phoneCountry} onChange={handleInputChange} className={styles.phoneCountrySelect}>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+54</option>
                    <option>+34</option>
                    <option>+33</option>
                  </select>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}  className={styles.phoneInput}  placeholder="Su número de teléfono"/>
                </div>
              </div>
            </div>

            <div className={styles.preferencesSection}>
              <h4 className={styles.subsectionTitle}>Preferencias de Vuelo</h4>
              <div className={styles.preferencesGrid}>
                <div className={styles.fieldGroup}>
                  <label>¿Con qué frecuencia vuela de forma privada?</label>
                  <select  name="flyingFrequency"  value={formData.flyingFrequency}  onChange={handleInputChange}  className={styles.select}>
                    <option value="">-- Seleccionar frecuencia --</option>
                    <option>Semanal</option>
                    <option>Mensual</option>
                    <option>Trimestral</option>
                    <option>Anual</option>
                    <option>Primera vez</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label>¿Cuál es su solución de vuelo actual?</label>
                  <select  name="currentSolution"  value={formData.currentSolution}  onChange={handleInputChange}  className={styles.select}>
                    <option value="">-- Seleccionar solución --</option>
                    <option>Charter</option>
                    <option>Aerolíneas Comerciales</option>
                    <option>Aeronave Propia</option>
                    <option>Propiedad Compartida</option>
                    <option>Tarjeta Jet</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label>¿Cómo se enteró de Cruz Del Sur?</label>
                  <select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange} className={styles.select}   >
                    <option value="">-- Seleccionar fuente --</option>
                    <option>Búsqueda en Google</option>
                    <option>Redes Sociales</option>
                    <option>Recomendación de un Amigo</option>
                    <option>Publicidad</option>
                    <option>Evento de la Industria</option>
                    <option>Otro</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.requestsSection}>
              <div className={styles.fieldGroup}>
                <label>¿Alguna solicitud adicional en la que podamos ayudarte?</label>
                <p className={styles.fieldHint}> Por ejemplo, requisitos dietéticos, solicitudes especiales, transporte terrestre </p>
                <textarea name="additionalRequests" value={formData.additionalRequests} onChange={handleInputChange} className={styles.largeTextarea} rows={6} placeholder="Por favor describa cualquier requisito o solicitud especial..." />
              </div>
            </div>

            <div className={styles.consentSection}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleInputChange} className={styles.checkbox}/>
                  Acepto recibir comunicaciones por correo electrónico de Cruz Del Sur.
                </label>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>ENVIAR SOLICITUD</button>

            <p className={styles.contact}> ¿Necesitas ayuda? Contáctanos al <span className={styles.phone}>+44 800 955 7500</span> </p>
          </div>
        </form>

      </div>
    </div>
  )
}
