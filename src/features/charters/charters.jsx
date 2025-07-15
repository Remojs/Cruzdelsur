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
            <h3 className={styles.sectionSubtitle}>Flight Details</h3>

            <div className={styles.flightSearch}>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>From</label>
                  <input  type="text"  name="from"  value={formData.from}  onChange={handleInputChange}  className={styles.searchInput}  placeholder="Departure city"/>
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>To</label>
                  <input type="text" name="to" value={formData.to} onChange={handleInputChange} className={styles.searchInput} placeholder="Destination city"   />
                </div>
              </div>
            </div>

            <div className={styles.flightSearch}>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>Date</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={styles.searchInput}   />
                  <span className={styles.addReturn}>Add return</span>
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>Passengers</label>
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
            <h3 className={styles.sectionSubtitle}>Personal Information</h3>

            <div className={styles.nameRow}>
              <div className={styles.titleField}>
                <label>Title</label>
                <select name="title" value={formData.title} onChange={handleInputChange} className={styles.select}>
                  <option>Mr.</option>
                  <option>Mrs.</option>
                  <option>Ms.</option>
                  <option>Dr.</option>
                </select>
              </div>
              <div className={styles.nameField}>
                <label>First Name</label>
                <input  type="text"  name="firstName"  value={formData.firstName}  onChange={handleInputChange}  className={styles.input}  placeholder="Enter your first name"/>
              </div>
              <div className={styles.nameField}>
                <label>Last Name</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={styles.input} placeholder="Enter your last name"/>
              </div>
            </div>

            <div className={styles.contactRow}>
              <div className={styles.emailField}>
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} placeholder="your.email@example.com" />
              </div>
              <div className={styles.phoneField}>
                <label>Phone Number</label>
                <div className={styles.phoneGroup}>
                  <select name="phoneCountry" value={formData.phoneCountry} onChange={handleInputChange} className={styles.phoneCountrySelect}>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+54</option>
                    <option>+34</option>
                    <option>+33</option>
                  </select>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}  className={styles.phoneInput}  placeholder="Your phone number"/>
                </div>
              </div>
            </div>

            <div className={styles.preferencesSection}>
              <h4 className={styles.subsectionTitle}>Flight Preferences</h4>
              <div className={styles.preferencesGrid}>
                <div className={styles.fieldGroup}>
                  <label>How often do you fly privately?</label>
                  <select  name="flyingFrequency"  value={formData.flyingFrequency}  onChange={handleInputChange}  className={styles.select}>
                    <option value="">-- Select frequency --</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                    <option>Quarterly</option>
                    <option>Annually</option>
                    <option>First time</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label>What is your current flying solution?</label>
                  <select  name="currentSolution"  value={formData.currentSolution}  onChange={handleInputChange}  className={styles.select}>
                    <option value="">-- Select solution --</option>
                    <option>Charter</option>
                    <option>Commercial Airlines</option>
                    <option>Own Aircraft</option>
                    <option>Fractional Ownership</option>
                    <option>Jet Card</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label>How did you hear about Cruz Del Sur?</label>
                  <select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange} className={styles.select}   >
                    <option value="">-- Select source --</option>
                    <option>Google Search</option>
                    <option>Social Media</option>
                    <option>Referral from Friend</option>
                    <option>Advertisement</option>
                    <option>Industry Event</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.requestsSection}>
              <div className={styles.fieldGroup}>
                <label>Any additional requests that we may assist you with?</label>
                <p className={styles.fieldHint}> For example, dietary requirements, special requests, ground transportation </p>
                <textarea name="additionalRequests" value={formData.additionalRequests} onChange={handleInputChange} className={styles.largeTextarea} rows={6} placeholder="Please describe any special requirements or requests..." />
              </div>
            </div>

            <div className={styles.consentSection}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleInputChange} className={styles.checkbox}/>
                  I agree to receive email communications from Cruz Del Sur.
                </label>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>SUBMIT REQUEST</button>

            <p className={styles.contact}> Need help? Contact us at <span className={styles.phone}>+44 800 955 7500</span> </p>
          </div>
        </form>

      </div>
    </div>
  )
}
