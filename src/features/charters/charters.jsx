import React, { useState } from "react"
import { useTranslation } from "../../i18n/LanguageContext"
import styles from "./charters.module.css"

export default function Charters() {
  const { t } = useTranslation()
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
        <h1 className={styles.mainTitle}>{t('flights.title')}</h1>

        <p className={styles.description}>
          {t('flights.description1')}
        </p>

        <p className={styles.description}>
          {t('flights.description2')}
        </p>

        <p className={styles.subDescription}>
          {t('flights.subDescription')}
        </p>


        <form onSubmit={handleSubmit} className={styles.form}>

          <div className={styles.flightSearchSection}>
            <h3 className={styles.sectionSubtitle}>{t('flights.flightDetails')}</h3>

            <div className={styles.flightSearch}>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>{t('flights.from')}</label>
                  <input  type="text"  name="from"  value={formData.from}  onChange={handleInputChange}  className={styles.searchInput}  placeholder={t('flights.fromPlaceholder')}/>
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>{t('flights.to')}</label>
                  <input type="text" name="to" value={formData.to} onChange={handleInputChange} className={styles.searchInput} placeholder={t('flights.toPlaceholder')}   />
                </div>
              </div>
            </div>

            <div className={styles.flightSearch}>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>{t('flights.date')}</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInputChange} className={styles.searchInput}   />
                  <span className={styles.addReturn}>{t('flights.addReturn')}</span>
                </div>
              </div>
              <div className={styles.searchField}>
                <div className={styles.fieldContent}>
                  <label>{t('flights.passengers')}</label>
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
            <h3 className={styles.sectionSubtitle}>{t('flights.personalInfo')}</h3>

            <div className={styles.nameRow}>
              <div className={styles.titleField}>
                <label>{t('flights.titleField')}</label>
                <select name="title" value={formData.title} onChange={handleInputChange} className={styles.select}>
                  <option>{t('flights.titles.mr')}</option>
                  <option>{t('flights.titles.mrs')}</option>
                  <option>{t('flights.titles.miss')}</option>
                  <option>{t('flights.titles.dr')}</option>
                </select>
              </div>
              <div className={styles.nameField}>
                <label>{t('flights.firstName')}</label>
                <input  type="text"  name="firstName"  value={formData.firstName}  onChange={handleInputChange}  className={styles.input}  placeholder={t('flights.firstNamePlaceholder')}/>
              </div>
              <div className={styles.nameField}>
                <label>{t('flights.lastName')}</label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className={styles.input} placeholder={t('flights.lastNamePlaceholder')}/>
              </div>
            </div>

            <div className={styles.contactRow}>
              <div className={styles.emailField}>
                <label>{t('flights.email')}</label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} className={styles.input} placeholder={t('flights.emailPlaceholder')} />
              </div>
              <div className={styles.phoneField}>
                <label>{t('flights.phoneNumber')}</label>
                <div className={styles.phoneGroup}>
                  <select name="phoneCountry" value={formData.phoneCountry} onChange={handleInputChange} className={styles.phoneCountrySelect}>
                    <option>+1</option>
                    <option>+44</option>
                    <option>+54</option>
                    <option>+34</option>
                    <option>+33</option>
                  </select>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange}  className={styles.phoneInput}  placeholder={t('flights.phonePlaceholder')}/>
                </div>
              </div>
            </div>

            <div className={styles.preferencesSection}>
              <h4 className={styles.subsectionTitle}>{t('flights.flightPreferences')}</h4>
              <div className={styles.preferencesGrid}>
                <div className={styles.fieldGroup}>
                  <label>{t('flights.flyingFrequency')}</label>
                  <select  name="flyingFrequency"  value={formData.flyingFrequency}  onChange={handleInputChange}  className={styles.select}>
                    <option value="">{t('flights.frequencies.select')}</option>
                    <option>{t('flights.frequencies.weekly')}</option>
                    <option>{t('flights.frequencies.monthly')}</option>
                    <option>{t('flights.frequencies.quarterly')}</option>
                    <option>{t('flights.frequencies.yearly')}</option>
                    <option>{t('flights.frequencies.firstTime')}</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label>{t('flights.currentSolution')}</label>
                  <select  name="currentSolution"  value={formData.currentSolution}  onChange={handleInputChange}  className={styles.select}>
                    <option value="">{t('flights.solutions.select')}</option>
                    <option>{t('flights.solutions.charter')}</option>
                    <option>{t('flights.solutions.commercial')}</option>
                    <option>{t('flights.solutions.owned')}</option>
                    <option>{t('flights.solutions.shared')}</option>
                    <option>{t('flights.solutions.jetCard')}</option>
                  </select>
                </div>

                <div className={styles.fieldGroup}>
                  <label>{t('flights.hearAbout')}</label>
                  <select name="hearAbout" value={formData.hearAbout} onChange={handleInputChange} className={styles.select}   >
                    <option value="">{t('flights.sources.select')}</option>
                    <option>{t('flights.sources.google')}</option>
                    <option>{t('flights.sources.social')}</option>
                    <option>{t('flights.sources.friend')}</option>
                    <option>{t('flights.sources.advertising')}</option>
                    <option>{t('flights.sources.event')}</option>
                    <option>{t('flights.sources.other')}</option>
                  </select>
                </div>
              </div>
            </div>

            <div className={styles.requestsSection}>
              <div className={styles.fieldGroup}>
                <label>{t('flights.additionalRequests')}</label>
                <p className={styles.fieldHint}> {t('flights.requestsHint')} </p>
                <textarea name="additionalRequests" value={formData.additionalRequests} onChange={handleInputChange} className={styles.largeTextarea} rows={6} placeholder={t('flights.requestsPlaceholder')} />
              </div>
            </div>

            <div className={styles.consentSection}>
              <div className={styles.checkboxGroup}>
                <label className={styles.checkboxLabel}>
                  <input type="checkbox" name="marketingConsent" checked={formData.marketingConsent} onChange={handleInputChange} className={styles.checkbox}/>
                  {t('flights.marketingConsent')}
                </label>
              </div>
            </div>

            <button type="submit" className={styles.submitButton}>{t('flights.submitButton')}</button>

            <p className={styles.contact}> {t('flights.helpText')} <span className={styles.phone}>{t('flights.contactPhone')}</span> </p>
          </div>
        </form>

      </div>
    </div>
  )
}
