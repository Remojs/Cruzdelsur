import React, { useState } from 'react';
import { useTranslation } from '../../../i18n/LanguageContext';
import FormField from './FormField';
import { sendApplicationEmailJS } from '../services/emailjsService';
import styles from '../application.module.css';

const TCPForm = ({ onBack }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // 1. Información Personal
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    nationality: '',
    hasOtherNationality: '',
    otherNationality: '',
    hasValidPassport: '',
    passportExpiryDate: '',
    idNumber: '',
    currentAddress: '',
    contactPhone: '',
    email: '',
    linkedIn: '',
    availableForRelocation: '',
    relocationPreferences: '',
    
    // 2. Requisitos Físicos
    height: '',
    weight: '',
    armReach: '',
    hasVisibleTattoos: '',
    tattooDetails: '',
    hasVisiblePiercings: '',
    piercingDetails: '',
    hasCorrectiveLenses: '',
    correctiveLensesType: '',
    hasMedicalFitness: '',
    lastMedicalExamDate: '',
    
    // 3. Formación Académica
    educationLevel: '',
    institution: '',
    degreeTitle: '',
    graduationDate: '',
    
    // 4. Idiomas
    englishLevel: '',
    englishCertification: '',
    otherLanguages: '',
    
    // 5. Experiencia Laboral en Aviación / Hospitalidad / Atención al Cliente
    workExperience: '',
    
    // 6. Entrenamiento y Certificados de Tripulante de Cabina
    hasInitialTCPCourse: '',
    initialTCPDate: '',
    initialTCPCenter: '',
    hasSEP: '',
    sepDate: '',
    sepCenter: '',
    hasFirstAidCertificate: '',
    firstAidDate: '',
    firstAidCenter: '',
    hasDangerousGoodsCertificate: '',
    dangerousGoodsDate: '',
    dangerousGoodsCenter: '',
    hasSecurityTraining: '',
    securityTrainingDate: '',
    securityTrainingCenter: '',
    otherRelevantCertificates: '',
    
    // 7. Experiencia de Vuelo (si ya es TCP)
    totalFlightHours: '',
    aircraftTypesOperated: '',
    lastEmployerAirline: '',
    lastDutyDate: '',
    
    // 8. Habilidades y Competencias
    customerServiceSkills: '',
    conflictManagementSkills: '',
    teamworkLeadershipSkills: '',
    multiculturalAdaptationSkills: '',
    otherSkills: '',
    
    // 10. Disponibilidad y Preferencias
    contractAvailability: '',
    operationTypePreference: '',
    airlineInterest: '',
    willingnessToRelocate: '',
    relocationCountryPreferences: '',
    salaryExpectation: '',
    
    // 11. Declaraciones y Consentimiento
    hasLegalRecords: '',
    legalRecordsDetails: '',
    hasMedicalDenial: '',
    medicalDenialDetails: '',
    dataUsageConsent: false,
    informationAccuracy: false,
    
    // 9. Documentación Adjunta
    cv: null,
    coverLetter: null,
    validPassport: null,
    nationalId: null,
    fullBodyPhoto: null,
    passportPhoto: null,
    trainingCertificates: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (name, file) => {
    setFormData(prev => ({ ...prev, [name]: file }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'fullName', 'dateOfBirth', 'age', 'gender', 'nationality', 'hasOtherNationality',
      'hasValidPassport', 'idNumber', 'currentAddress', 'contactPhone', 'email',
      'availableForRelocation', 'height', 'weight', 'armReach', 'hasVisibleTattoos',
      'hasVisiblePiercings', 'hasCorrectiveLenses', 'hasMedicalFitness',
      'educationLevel', 'institution', 'englishLevel', 'customerServiceSkills',
      'conflictManagementSkills', 'teamworkLeadershipSkills', 'multiculturalAdaptationSkills',
      'contractAvailability', 'operationTypePreference', 'willingnessToRelocate'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = t('application.validation.required');
      }
    });

    // Checkbox validation
    if (!formData.dataUsageConsent) {
      newErrors.dataUsageConsent = t('application.validation.required');
    }
    if (!formData.informationAccuracy) {
      newErrors.informationAccuracy = t('application.validation.required');
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      newErrors.email = t('application.validation.invalidEmail');
    }

    // Phone validation
    const phoneRegex = /^[+]?[\d\s\-()]{8,}$/;
    if (formData.contactPhone && !phoneRegex.test(formData.contactPhone)) {
      newErrors.contactPhone = t('application.validation.invalidPhone');
    }

    // Height validation (cm)
    if (formData.height && (isNaN(formData.height) || formData.height < 150 || formData.height > 200)) {
      newErrors.height = t('application.validation.invalidHeight');
    }

    // Weight validation (kg)
    if (formData.weight && (isNaN(formData.weight) || formData.weight < 40 || formData.weight > 150)) {
      newErrors.weight = t('application.validation.invalidWeight');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Use EmailJS to send the application directly from frontend
      await sendApplicationEmailJS(formData, 'tcp');
      
      console.log('TCP application submitted successfully:', formData);
      setSubmitSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(t('application.submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className={styles.formContainer}>
        <div className={styles.successMessage}>
          <h2>{t('application.successTitle')}</h2>
          <p>{t('application.successMessage')}</p>
          <button onClick={onBack} className={styles.submitButton}>
            {t('application.backToSelection')}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.formContainer}>
      <h1 className={styles.formTitle}>{t('application.tcp.formTitle')}</h1>
      <p className={styles.formSubtitle}>{t('application.tcp.formSubtitle')}</p>
      
      <form onSubmit={handleSubmit}>
        {/* 1. Información Personal */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.personalInfo')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.tcp.fields.fullName')}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
              required
            />
            
            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.dateOfBirth')}
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={errors.dateOfBirth}
                required
              />
              <FormField
                label={t('application.tcp.fields.age')}
                name="age"
                type="number"
                value={formData.age}
                onChange={handleInputChange}
                error={errors.age}
                required
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.gender')}
                name="gender"
                type="select"
                value={formData.gender}
                onChange={handleInputChange}
                error={errors.gender}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'male', label: t('application.common.male') },
                  { value: 'female', label: t('application.common.female') },
                  { value: 'other', label: t('application.common.other') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.nationality')}
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                error={errors.nationality}
                required
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasOtherNationality')}
                name="hasOtherNationality"
                type="select"
                value={formData.hasOtherNationality}
                onChange={handleInputChange}
                error={errors.hasOtherNationality}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.otherNationality')}
                name="otherNationality"
                value={formData.otherNationality}
                onChange={handleInputChange}
                error={errors.otherNationality}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasValidPassport')}
                name="hasValidPassport"
                type="select"
                value={formData.hasValidPassport}
                onChange={handleInputChange}
                error={errors.hasValidPassport}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.passportExpiryDate')}
                name="passportExpiryDate"
                type="date"
                value={formData.passportExpiryDate}
                onChange={handleInputChange}
                error={errors.passportExpiryDate}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.idNumber')}
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              error={errors.idNumber}
              required
            />

            <FormField
              label={t('application.tcp.fields.currentAddress')}
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleInputChange}
              error={errors.currentAddress}
              required
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.contactPhone')}
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleInputChange}
                error={errors.contactPhone}
                required
              />
              <FormField
                label={t('application.tcp.fields.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
            </div>

            <FormField
              label={t('application.tcp.fields.linkedIn')}
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleInputChange}
              error={errors.linkedIn}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.availableForRelocation')}
                name="availableForRelocation"
                type="select"
                value={formData.availableForRelocation}
                onChange={handleInputChange}
                error={errors.availableForRelocation}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.relocationPreferences')}
                name="relocationPreferences"
                value={formData.relocationPreferences}
                onChange={handleInputChange}
                error={errors.relocationPreferences}
              />
            </div>
          </div>
        </div>

        {/* 2. Requisitos Físicos */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.physicalRequirements')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.height')}
                name="height"
                type="number"
                value={formData.height}
                onChange={handleInputChange}
                error={errors.height}
                placeholder={t('application.tcp.placeholders.heightCm')}
                required
              />
              <FormField
                label={t('application.tcp.fields.weight')}
                name="weight"
                type="number"
                value={formData.weight}
                onChange={handleInputChange}
                error={errors.weight}
                placeholder={t('application.tcp.placeholders.weightKg')}
                required
              />
            </div>

            <FormField
              label={t('application.tcp.fields.armReach')}
              name="armReach"
              type="number"
              value={formData.armReach}
              onChange={handleInputChange}
              error={errors.armReach}
              placeholder={t('application.tcp.placeholders.armReachCm')}
              required
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasVisibleTattoos')}
                name="hasVisibleTattoos"
                type="select"
                value={formData.hasVisibleTattoos}
                onChange={handleInputChange}
                error={errors.hasVisibleTattoos}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
            </div>

            {formData.hasVisibleTattoos === 'yes' && (
              <FormField
                label={t('application.tcp.fields.tattooDetails')}
                name="tattooDetails"
                type="textarea"
                value={formData.tattooDetails}
                onChange={handleInputChange}
                error={errors.tattooDetails}
                placeholder={t('application.tcp.placeholders.tattooDetails')}
              />
            )}

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasVisiblePiercings')}
                name="hasVisiblePiercings"
                type="select"
                value={formData.hasVisiblePiercings}
                onChange={handleInputChange}
                error={errors.hasVisiblePiercings}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
            </div>

            {formData.hasVisiblePiercings === 'yes' && (
              <FormField
                label={t('application.tcp.fields.piercingDetails')}
                name="piercingDetails"
                type="textarea"
                value={formData.piercingDetails}
                onChange={handleInputChange}
                error={errors.piercingDetails}
                placeholder={t('application.tcp.placeholders.piercingDetails')}
              />
            )}

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasCorrectiveLenses')}
                name="hasCorrectiveLenses"
                type="select"
                value={formData.hasCorrectiveLenses}
                onChange={handleInputChange}
                error={errors.hasCorrectiveLenses}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.correctiveLensesType')}
                name="correctiveLensesType"
                value={formData.correctiveLensesType}
                onChange={handleInputChange}
                error={errors.correctiveLensesType}
                placeholder={t('application.tcp.placeholders.correctiveLensesType')}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasMedicalFitness')}
                name="hasMedicalFitness"
                type="select"
                value={formData.hasMedicalFitness}
                onChange={handleInputChange}
                error={errors.hasMedicalFitness}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.lastMedicalExamDate')}
                name="lastMedicalExamDate"
                type="date"
                value={formData.lastMedicalExamDate}
                onChange={handleInputChange}
                error={errors.lastMedicalExamDate}
              />
            </div>
          </div>
        </div>

        {/* 3. Formación Académica */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.education')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.tcp.fields.educationLevel')}
              name="educationLevel"
              type="select"
              value={formData.educationLevel}
              onChange={handleInputChange}
              error={errors.educationLevel}
              options={[
                { value: '', label: t('application.select') },
                { value: 'secondary', label: t('application.common.secondary') },
                { value: 'university', label: t('application.common.university') },
                { value: 'postgraduate', label: t('application.common.postgraduate') }
              ]}
              required
            />

            <FormField
              label={t('application.tcp.fields.institution')}
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              error={errors.institution}
              required
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.degreeTitle')}
                name="degreeTitle"
                value={formData.degreeTitle}
                onChange={handleInputChange}
                error={errors.degreeTitle}
              />
              <FormField
                label={t('application.tcp.fields.graduationDate')}
                name="graduationDate"
                type="date"
                value={formData.graduationDate}
                onChange={handleInputChange}
                error={errors.graduationDate}
              />
            </div>
          </div>
        </div>

        {/* 4. Idiomas */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.languages')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.englishLevel')}
                name="englishLevel"
                type="select"
                value={formData.englishLevel}
                onChange={handleInputChange}
                error={errors.englishLevel}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'basic', label: t('application.common.basic') },
                  { value: 'intermediate', label: t('application.common.intermediate') },
                  { value: 'advanced', label: t('application.common.advanced') },
                  { value: 'fluent', label: t('application.common.fluent') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.englishCertification')}
                name="englishCertification"
                value={formData.englishCertification}
                onChange={handleInputChange}
                error={errors.englishCertification}
                placeholder={t('application.tcp.placeholders.englishCertification')}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.otherLanguages')}
              name="otherLanguages"
              type="textarea"
              value={formData.otherLanguages}
              onChange={handleInputChange}
              error={errors.otherLanguages}
              placeholder={t('application.tcp.placeholders.otherLanguages')}
            />
          </div>
        </div>

        {/* 5. Experiencia Laboral en Aviación / Hospitalidad / Atención al Cliente */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.workExperience')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.tcp.fields.workExperience')}
              name="workExperience"
              type="textarea"
              value={formData.workExperience}
              onChange={handleInputChange}
              error={errors.workExperience}
              placeholder={t('application.tcp.placeholders.workExperience')}
            />
          </div>
        </div>

        {/* 6. Entrenamiento y Certificados de Tripulante de Cabina */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.training')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasInitialTCPCourse')}
                name="hasInitialTCPCourse"
                type="select"
                value={formData.hasInitialTCPCourse}
                onChange={handleInputChange}
                error={errors.hasInitialTCPCourse}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.tcp.fields.initialTCPDate')}
                name="initialTCPDate"
                type="date"
                value={formData.initialTCPDate}
                onChange={handleInputChange}
                error={errors.initialTCPDate}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.initialTCPCenter')}
              name="initialTCPCenter"
              value={formData.initialTCPCenter}
              onChange={handleInputChange}
              error={errors.initialTCPCenter}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasSEP')}
                name="hasSEP"
                type="select"
                value={formData.hasSEP}
                onChange={handleInputChange}
                error={errors.hasSEP}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.tcp.fields.sepDate')}
                name="sepDate"
                type="date"
                value={formData.sepDate}
                onChange={handleInputChange}
                error={errors.sepDate}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.sepCenter')}
              name="sepCenter"
              value={formData.sepCenter}
              onChange={handleInputChange}
              error={errors.sepCenter}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasFirstAidCertificate')}
                name="hasFirstAidCertificate"
                type="select"
                value={formData.hasFirstAidCertificate}
                onChange={handleInputChange}
                error={errors.hasFirstAidCertificate}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.tcp.fields.firstAidDate')}
                name="firstAidDate"
                type="date"
                value={formData.firstAidDate}
                onChange={handleInputChange}
                error={errors.firstAidDate}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.firstAidCenter')}
              name="firstAidCenter"
              value={formData.firstAidCenter}
              onChange={handleInputChange}
              error={errors.firstAidCenter}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasDangerousGoodsCertificate')}
                name="hasDangerousGoodsCertificate"
                type="select"
                value={formData.hasDangerousGoodsCertificate}
                onChange={handleInputChange}
                error={errors.hasDangerousGoodsCertificate}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.tcp.fields.dangerousGoodsDate')}
                name="dangerousGoodsDate"
                type="date"
                value={formData.dangerousGoodsDate}
                onChange={handleInputChange}
                error={errors.dangerousGoodsDate}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.dangerousGoodsCenter')}
              name="dangerousGoodsCenter"
              value={formData.dangerousGoodsCenter}
              onChange={handleInputChange}
              error={errors.dangerousGoodsCenter}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasSecurityTraining')}
                name="hasSecurityTraining"
                type="select"
                value={formData.hasSecurityTraining}
                onChange={handleInputChange}
                error={errors.hasSecurityTraining}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.tcp.fields.securityTrainingDate')}
                name="securityTrainingDate"
                type="date"
                value={formData.securityTrainingDate}
                onChange={handleInputChange}
                error={errors.securityTrainingDate}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.securityTrainingCenter')}
              name="securityTrainingCenter"
              value={formData.securityTrainingCenter}
              onChange={handleInputChange}
              error={errors.securityTrainingCenter}
            />

            <FormField
              label={t('application.tcp.fields.otherRelevantCertificates')}
              name="otherRelevantCertificates"
              type="textarea"
              value={formData.otherRelevantCertificates}
              onChange={handleInputChange}
              error={errors.otherRelevantCertificates}
              placeholder={t('application.tcp.placeholders.otherRelevantCertificates')}
            />
          </div>
        </div>

        {/* 7. Experiencia de Vuelo (si ya es TCP) */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.flightExperience')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.tcp.fields.totalFlightHours')}
              name="totalFlightHours"
              type="number"
              value={formData.totalFlightHours}
              onChange={handleInputChange}
              error={errors.totalFlightHours}
            />

            <FormField
              label={t('application.tcp.fields.aircraftTypesOperated')}
              name="aircraftTypesOperated"
              value={formData.aircraftTypesOperated}
              onChange={handleInputChange}
              error={errors.aircraftTypesOperated}
              placeholder={t('application.tcp.placeholders.aircraftTypesOperated')}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.lastEmployerAirline')}
                name="lastEmployerAirline"
                value={formData.lastEmployerAirline}
                onChange={handleInputChange}
                error={errors.lastEmployerAirline}
              />
              <FormField
                label={t('application.tcp.fields.lastDutyDate')}
                name="lastDutyDate"
                type="date"
                value={formData.lastDutyDate}
                onChange={handleInputChange}
                error={errors.lastDutyDate}
              />
            </div>
          </div>
        </div>

        {/* 8. Habilidades y Competencias */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.skills')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.customerServiceSkills')}
                name="customerServiceSkills"
                type="select"
                value={formData.customerServiceSkills}
                onChange={handleInputChange}
                error={errors.customerServiceSkills}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'excellent', label: t('application.common.excellent') },
                  { value: 'good', label: t('application.common.good') },
                  { value: 'basic', label: t('application.common.basic') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.conflictManagementSkills')}
                name="conflictManagementSkills"
                type="select"
                value={formData.conflictManagementSkills}
                onChange={handleInputChange}
                error={errors.conflictManagementSkills}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'excellent', label: t('application.common.excellent') },
                  { value: 'good', label: t('application.common.good') },
                  { value: 'basic', label: t('application.common.basic') }
                ]}
                required
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.teamworkLeadershipSkills')}
                name="teamworkLeadershipSkills"
                type="select"
                value={formData.teamworkLeadershipSkills}
                onChange={handleInputChange}
                error={errors.teamworkLeadershipSkills}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'excellent', label: t('application.common.excellent') },
                  { value: 'good', label: t('application.common.good') },
                  { value: 'basic', label: t('application.common.basic') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.multiculturalAdaptationSkills')}
                name="multiculturalAdaptationSkills"
                type="select"
                value={formData.multiculturalAdaptationSkills}
                onChange={handleInputChange}
                error={errors.multiculturalAdaptationSkills}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'excellent', label: t('application.common.excellent') },
                  { value: 'good', label: t('application.common.good') },
                  { value: 'basic', label: t('application.common.basic') }
                ]}
                required
              />
            </div>

            <FormField
              label={t('application.tcp.fields.otherSkills')}
              name="otherSkills"
              type="textarea"
              value={formData.otherSkills}
              onChange={handleInputChange}
              error={errors.otherSkills}
              placeholder={t('application.tcp.placeholders.otherSkills')}
            />
          </div>
        </div>

        {/* 9. Documentación Adjunta */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.documents')}</h3>
          <p className={styles.fileWarning}>
            {t('application.tcp.fileWarning')}
          </p>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.tcp.fields.cv')}
              name="cv"
              type="file"
              onChange={handleFileChange}
              error={errors.cv}
              accept=".pdf,.doc,.docx"
              required
            />

            <FormField
              label={t('application.tcp.fields.coverLetter')}
              name="coverLetter"
              type="file"
              onChange={handleFileChange}
              error={errors.coverLetter}
              accept=".pdf,.doc,.docx"
            />

            <FormField
              label={t('application.tcp.fields.validPassport')}
              name="validPassport"
              type="file"
              onChange={handleFileChange}
              error={errors.validPassport}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />

            <FormField
              label={t('application.tcp.fields.nationalId')}
              name="nationalId"
              type="file"
              onChange={handleFileChange}
              error={errors.nationalId}
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <FormField
              label={t('application.tcp.fields.fullBodyPhoto')}
              name="fullBodyPhoto"
              type="file"
              onChange={handleFileChange}
              error={errors.fullBodyPhoto}
              accept=".jpg,.jpeg,.png"
              required
            />

            <FormField
              label={t('application.tcp.fields.passportPhoto')}
              name="passportPhoto"
              type="file"
              onChange={handleFileChange}
              error={errors.passportPhoto}
              accept=".jpg,.jpeg,.png"
              required
            />

            <FormField
              label={t('application.tcp.fields.trainingCertificates')}
              name="trainingCertificates"
              type="file"
              onChange={handleFileChange}
              error={errors.trainingCertificates}
              accept=".pdf,.jpg,.jpeg,.png"
            />
          </div>
        </div>

        {/* 10. Disponibilidad y Preferencias */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.availability')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.tcp.fields.contractAvailability')}
              name="contractAvailability"
              type="select"
              value={formData.contractAvailability}
              onChange={handleInputChange}
              error={errors.contractAvailability}
              options={[
                { value: '', label: t('application.select') },
                { value: 'immediate', label: t('application.tcp.options.immediate') },
                { value: '1month', label: t('application.tcp.options.oneMonth') },
                { value: '3months', label: t('application.tcp.options.threeMonths') },
                { value: 'other', label: t('application.tcp.options.other') }
              ]}
              required
            />

            <FormField
              label={t('application.tcp.fields.operationTypePreference')}
              name="operationTypePreference"
              type="select"
              value={formData.operationTypePreference}
              onChange={handleInputChange}
              error={errors.operationTypePreference}
              options={[
                { value: '', label: t('application.select') },
                { value: 'longHaul', label: t('application.tcp.options.longHaul') },
                { value: 'mediumHaul', label: t('application.tcp.options.mediumHaul') },
                { value: 'shortHaul', label: t('application.tcp.options.shortHaul') },
                { value: 'charter', label: t('application.tcp.options.charter') },
                { value: 'corporate', label: t('application.tcp.options.corporate') },
                { value: 'privateJet', label: t('application.tcp.options.privateJet') }
              ]}
              required
            />

            <FormField
              label={t('application.tcp.fields.airlineInterest')}
              name="airlineInterest"
              type="textarea"
              value={formData.airlineInterest}
              onChange={handleInputChange}
              error={errors.airlineInterest}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.willingnessToRelocate')}
                name="willingnessToRelocate"
                type="select"
                value={formData.willingnessToRelocate}
                onChange={handleInputChange}
                error={errors.willingnessToRelocate}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
                required
              />
              <FormField
                label={t('application.tcp.fields.relocationCountryPreferences')}
                name="relocationCountryPreferences"
                value={formData.relocationCountryPreferences}
                onChange={handleInputChange}
                error={errors.relocationCountryPreferences}
              />
            </div>

            <FormField
              label={t('application.tcp.fields.salaryExpectation')}
              name="salaryExpectation"
              value={formData.salaryExpectation}
              onChange={handleInputChange}
              error={errors.salaryExpectation}
              placeholder={t('application.tcp.placeholders.salaryExpectation')}
            />
          </div>
        </div>

        {/* 11. Declaraciones y Consentimiento */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.tcp.sections.declarations')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasLegalRecords')}
                name="hasLegalRecords"
                type="select"
                value={formData.hasLegalRecords}
                onChange={handleInputChange}
                error={errors.hasLegalRecords}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
            </div>

            {formData.hasLegalRecords === 'yes' && (
              <FormField
                label={t('application.tcp.fields.legalRecordsDetails')}
                name="legalRecordsDetails"
                type="textarea"
                value={formData.legalRecordsDetails}
                onChange={handleInputChange}
                error={errors.legalRecordsDetails}
              />
            )}

            <div className={styles.formRow}>
              <FormField
                label={t('application.tcp.fields.hasMedicalDenial')}
                name="hasMedicalDenial"
                type="select"
                value={formData.hasMedicalDenial}
                onChange={handleInputChange}
                error={errors.hasMedicalDenial}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
            </div>

            {formData.hasMedicalDenial === 'yes' && (
              <FormField
                label={t('application.tcp.fields.medicalDenialDetails')}
                name="medicalDenialDetails"
                type="textarea"
                value={formData.medicalDenialDetails}
                onChange={handleInputChange}
                error={errors.medicalDenialDetails}
              />
            )}

            <FormField
              label={t('application.tcp.fields.dataUsageConsent')}
              name="dataUsageConsent"
              type="checkbox"
              checked={formData.dataUsageConsent}
              onChange={(name, checked) => handleInputChange(name, checked)}
              error={errors.dataUsageConsent}
              required
            />

            <FormField
              label={t('application.tcp.fields.informationAccuracy')}
              name="informationAccuracy"
              type="checkbox"
              checked={formData.informationAccuracy}
              onChange={(name, checked) => handleInputChange(name, checked)}
              error={errors.informationAccuracy}
              required
            />
          </div>
        </div>

        <div className={styles.formActions}>
          <button type="button" onClick={onBack} className={styles.backButton}>
            {t('application.back')}
          </button>
          <button type="submit" className={styles.submitButton} disabled={isSubmitting}>
            {isSubmitting ? t('application.submitting') : t('application.submit')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default TCPForm;
