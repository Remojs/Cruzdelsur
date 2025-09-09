import React, { useState } from 'react';
import { useTranslation } from '../../../i18n/LanguageContext';
import FormField from './FormField';
import { sendApplicationEmailJS } from '../services/emailjsService';
import styles from '../application.module.css';

const PilotForm = ({ onBack }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    // 1. Información Personal
    fullName: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    nationality: '',
    hasValidPassport: '',
    passportExpiryDate: '',
    hasOtherNationality: '',
    otherNationality: '',
    idNumber: '',
    currentAddress: '',
    contactPhone: '',
    email: '',
    linkedIn: '',
    availableForRelocation: '',
    relocationPreferences: '',
    
    // 2. Licencias y Certificaciones
    currentLicense: '',
    licenseCountry: '',
    licenseNumber: '',
    licenseIssueDate: '',
    licenseExpiryDate: '',
    currentEndorsements: '',
    medicalClass: '',
    medicalIssueDate: '',
    medicalExpiryDate: '',
    additionalLicense: '',
    additionalLicenseCountry: '',
    additionalLicenseNumber: '',
    additionalLicenseIssueDate: '',
    additionalLicenseExpiryDate: '',
    additionalEndorsements: '',
    additionalMedicalClass: '',
    additionalMedicalIssueDate: '',
    additionalMedicalExpiryDate: '',
    icaoEnglishProficiency: '',
    englishProficiencyExpiry: '',
    
    // 3. Experiencia de Vuelo
    totalFlightHours: '',
    picHours: '',
    jetHours: '',
    propellerTurbopropHours: '',
    multiEngineHours: '',
    simulatorHours: '',
    simulatorType: '',
    lastCommercialOperation: '',
    lastCommercialOperationAirline: '',
    lastFlightIn90Days: '',
    lastFlightAircraftType: '',
    
    // 4. Habilitaciones por Tipo de Aeronave
    typeRatings: '',
    typeRatingIssueDate: '',
    typeRatingExpiryDate: '',
    recentExperienceHours: '',
    recentExperienceLast12Months: '',
    
    // 5. Formación Académica
    educationLevel: '',
    institution: '',
    degreeTitle: '',
    graduationDate: '',
    
    // 6. Idiomas
    englishLevel: '',
    englishCertification: '',
    otherLanguages: '',
    
    // 7. Experiencia Laboral en Aviación
    aviationExperience: '',
    
    // 8. Cursos y Entrenamientos Especializados
    hasMCC: '',
    mccDate: '',
    mccCenter: '',
    hasJetOrientation: '',
    jetOrientationDate: '',
    jetOrientationCenter: '',
    loftCrmSmsTraining: '',
    otherRelevantCourses: '',
    
    // 10. Disponibilidad y Preferencias
    contractAvailability: '',
    operationTypePreference: '',
    airlineInterest: '',
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
    pilotLicense: null,
    validMedical: null,
    validPassport: null,
    courseCertificates: null,
    professionalPhoto: null
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [uploadProgress, setUploadProgress] = useState('');

  // Función para calcular tamaño total de archivos
  const calculateTotalFileSize = () => {
    const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto'];
    return fileFields.reduce((total, field) => {
      if (formData[field] && formData[field] instanceof File) {
        return total + formData[field].size;
      }
      return total;
    }, 0);
  };

  // Función para obtener lista de archivos adjuntos
  const getAttachedFiles = () => {
    const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto'];
    return fileFields.filter(field => formData[field] && formData[field] instanceof File)
                    .map(field => ({ field, file: formData[field] }));
  };

  const handleInputChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleFileChange = (name, file) => {
    console.log(`Archivo seleccionado para ${name}:`, file ? file.name : 'ninguno');
    setFormData(prev => ({ ...prev, [name]: file }));
    
    // Limpiar error de ese campo si había uno
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Required fields validation
    const requiredFields = [
      'fullName', 'dateOfBirth', 'age', 'gender', 'nationality', 'hasValidPassport',
      'idNumber', 'currentAddress', 'contactPhone', 'email', 'availableForRelocation',
      'currentLicense', 'licenseCountry', 'licenseNumber', 'licenseIssueDate',
      'licenseExpiryDate', 'medicalClass', 'medicalIssueDate', 'medicalExpiryDate',
      'icaoEnglishProficiency', 'totalFlightHours', 'picHours',
      'educationLevel', 'institution', 'englishLevel', 'contractAvailability'
    ];
    
    requiredFields.forEach(field => {
      if (!formData[field]) {
        newErrors[field] = t('application.validation.required');
      }
    });

    // Required files validation
    const requiredFiles = ['cv', 'pilotLicense', 'validMedical', 'validPassport', 'professionalPhoto'];
    requiredFiles.forEach(file => {
      if (!formData[file]) {
        newErrors[file] = t('application.validation.missingRequiredFile');
      }
    });

    // File size validation (2MB = 2 * 1024 * 1024 bytes)
    const maxFileSize = 2 * 1024 * 1024;
    const maxTotalSize = 10 * 1024 * 1024;
    let totalSize = 0;

    const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto'];
    
    fileFields.forEach(field => {
      if (formData[field]) {
        const file = formData[field];
        if (file.size > maxFileSize) {
          newErrors[field] = t('application.validation.fileTooLarge');
        }
        totalSize += file.size;
      }
    });

    if (totalSize > maxTotalSize) {
      newErrors.totalFileSize = t('application.validation.totalSizeTooLarge');
    }

    // File type validation
    const fileTypeValidation = {
      cv: ['pdf', 'doc', 'docx'],
      coverLetter: ['pdf', 'doc', 'docx'],
      pilotLicense: ['pdf', 'jpg', 'jpeg', 'png'],
      validMedical: ['pdf', 'jpg', 'jpeg', 'png'],
      validPassport: ['pdf', 'jpg', 'jpeg', 'png'],
      courseCertificates: ['pdf', 'jpg', 'jpeg', 'png'],
      professionalPhoto: ['jpg', 'jpeg', 'png']
    };

    Object.keys(fileTypeValidation).forEach(field => {
      if (formData[field]) {
        const file = formData[field];
        const extension = file.name.split('.').pop().toLowerCase();
        if (!fileTypeValidation[field].includes(extension)) {
          newErrors[field] = t('application.validation.invalidFileType');
        }
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

    // Flight hours validation
    if (formData.totalFlightHours && (isNaN(formData.totalFlightHours) || formData.totalFlightHours < 0)) {
      newErrors.totalFlightHours = t('application.validation.invalidHours');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setSubmitError('');
    setUploadProgress('');
    
    if (!validateForm()) {
      setSubmitError(t('application.validation.formIncomplete'));
      return;
    }

    setIsSubmitting(true);
    setUploadProgress('Preparando archivos...');
    
    try {
      // Contar archivos a procesar
      const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto'];
      const attachedFiles = fileFields.filter(field => formData[field] instanceof File);
      
      if (attachedFiles.length > 0) {
        setUploadProgress(`Procesando ${attachedFiles.length} archivo(s)...`);
      }
      
      // Use EmailJS to send the application directly from frontend
      await sendApplicationEmailJS(formData, 'pilot');
      
      console.log('Pilot application submitted successfully:', formData);
      setSubmitSuccess(true);
      
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Determinar tipo de error para mensaje más específico
      let errorMessage = t('application.submitError');
      if (error.message.includes('archivo')) {
        errorMessage = `Error con archivos: ${error.message}`;
      } else if (error.message.includes('network') || error.message.includes('Network')) {
        errorMessage = 'Error de conexión. Verifica tu internet e intenta nuevamente.';
      }
      
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
      setUploadProgress('');
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
      {/* Sección de Bienvenida */}
      <div className={styles.welcomeSection}>
        <h2 className={styles.welcomeTitle}>{t('application.pilot.welcomeTitle')}</h2>
        <div className={styles.welcomeText}>
          {t('application.pilot.welcomeText').split('\n').map((paragraph, index) => (
            <p key={index} className={styles.welcomeParagraph}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
      
      <h1 className={styles.formTitle}>{t('application.pilot.formTitle')}</h1>
      <p className={styles.formSubtitle}>{t('application.pilot.formSubtitle')}</p>
      
      <form onSubmit={handleSubmit}>
        {/* 1. Información Personal */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.personalInfo')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.pilot.fields.fullName')}
              name="fullName"
              value={formData.fullName}
              onChange={handleInputChange}
              error={errors.fullName}
              required
            />
            
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.dateOfBirth')}
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleInputChange}
                error={errors.dateOfBirth}
                required
              />
              <FormField
                label={t('application.pilot.fields.age')}
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
                label={t('application.pilot.fields.gender')}
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
                label={t('application.pilot.fields.nationality')}
                name="nationality"
                value={formData.nationality}
                onChange={handleInputChange}
                error={errors.nationality}
                required
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.hasValidPassport')}
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
                label={t('application.pilot.fields.passportExpiryDate')}
                name="passportExpiryDate"
                type="date"
                value={formData.passportExpiryDate}
                onChange={handleInputChange}
                error={errors.passportExpiryDate}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.hasOtherNationality')}
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
              />
              <FormField
                label={t('application.pilot.fields.otherNationality')}
                name="otherNationality"
                value={formData.otherNationality}
                onChange={handleInputChange}
                error={errors.otherNationality}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.idNumber')}
              name="idNumber"
              value={formData.idNumber}
              onChange={handleInputChange}
              error={errors.idNumber}
              required
            />

            <FormField
              label={t('application.pilot.fields.currentAddress')}
              name="currentAddress"
              value={formData.currentAddress}
              onChange={handleInputChange}
              error={errors.currentAddress}
              required
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.contactPhone')}
                name="contactPhone"
                type="tel"
                value={formData.contactPhone}
                onChange={handleInputChange}
                error={errors.contactPhone}
                required
              />
              <FormField
                label={t('application.pilot.fields.email')}
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                error={errors.email}
                required
              />
            </div>

            <FormField
              label={t('application.pilot.fields.linkedIn')}
              name="linkedIn"
              value={formData.linkedIn}
              onChange={handleInputChange}
              error={errors.linkedIn}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.availableForRelocation')}
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
                label={t('application.pilot.fields.relocationPreferences')}
                name="relocationPreferences"
                value={formData.relocationPreferences}
                onChange={handleInputChange}
                error={errors.relocationPreferences}
              />
            </div>
          </div>
        </div>

        {/* 2. Licencias y Certificaciones */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.licenses')}</h3>
          <div className={styles.formGrid}>
            <h4>{t('application.pilot.subsections.primaryLicense')}</h4>
            
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.currentLicense')}
                name="currentLicense"
                type="select"
                value={formData.currentLicense}
                onChange={handleInputChange}
                error={errors.currentLicense}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'PPL', label: 'PPL' },
                  { value: 'CPL', label: 'CPL' },
                  { value: 'ATPL', label: 'ATPL' },
                  { value: 'MPL', label: 'MPL' }
                ]}
                required
              />
              <FormField
                label={t('application.pilot.fields.licenseCountry')}
                name="licenseCountry"
                value={formData.licenseCountry}
                onChange={handleInputChange}
                error={errors.licenseCountry}
                required
              />
            </div>

            <FormField
              label={t('application.pilot.fields.licenseNumber')}
              name="licenseNumber"
              value={formData.licenseNumber}
              onChange={handleInputChange}
              error={errors.licenseNumber}
              required
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.licenseIssueDate')}
                name="licenseIssueDate"
                type="date"
                value={formData.licenseIssueDate}
                onChange={handleInputChange}
                error={errors.licenseIssueDate}
                required
              />
              <FormField
                label={t('application.pilot.fields.licenseExpiryDate')}
                name="licenseExpiryDate"
                type="date"
                value={formData.licenseExpiryDate}
                onChange={handleInputChange}
                error={errors.licenseExpiryDate}
                required
              />
            </div>

            <FormField
              label={t('application.pilot.fields.currentEndorsements')}
              name="currentEndorsements"
              type="textarea"
              value={formData.currentEndorsements}
              onChange={handleInputChange}
              error={errors.currentEndorsements}
              placeholder={t('application.pilot.placeholders.endorsements')}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.medicalClass')}
                name="medicalClass"
                type="select"
                value={formData.medicalClass}
                onChange={handleInputChange}
                error={errors.medicalClass}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'class1', label: t('application.pilot.options.class1') },
                  { value: 'class2', label: t('application.pilot.options.class2') }
                ]}
                required
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.medicalIssueDate')}
                name="medicalIssueDate"
                type="date"
                value={formData.medicalIssueDate}
                onChange={handleInputChange}
                error={errors.medicalIssueDate}
                required
              />
              <FormField
                label={t('application.pilot.fields.medicalExpiryDate')}
                name="medicalExpiryDate"
                type="date"
                value={formData.medicalExpiryDate}
                onChange={handleInputChange}
                error={errors.medicalExpiryDate}
                required
              />
            </div>

            <h4>{t('application.pilot.subsections.additionalLicense')}</h4>
            
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.additionalLicense')}
                name="additionalLicense"
                type="select"
                value={formData.additionalLicense}
                onChange={handleInputChange}
                error={errors.additionalLicense}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'PPL', label: 'PPL' },
                  { value: 'CPL', label: 'CPL' },
                  { value: 'ATPL', label: 'ATPL' },
                  { value: 'MPL', label: 'MPL' }
                ]}
              />
              <FormField
                label={t('application.pilot.fields.additionalLicenseCountry')}
                name="additionalLicenseCountry"
                value={formData.additionalLicenseCountry}
                onChange={handleInputChange}
                error={errors.additionalLicenseCountry}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.additionalLicenseNumber')}
              name="additionalLicenseNumber"
              value={formData.additionalLicenseNumber}
              onChange={handleInputChange}
              error={errors.additionalLicenseNumber}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.additionalLicenseIssueDate')}
                name="additionalLicenseIssueDate"
                type="date"
                value={formData.additionalLicenseIssueDate}
                onChange={handleInputChange}
                error={errors.additionalLicenseIssueDate}
              />
              <FormField
                label={t('application.pilot.fields.additionalLicenseExpiryDate')}
                name="additionalLicenseExpiryDate"
                type="date"
                value={formData.additionalLicenseExpiryDate}
                onChange={handleInputChange}
                error={errors.additionalLicenseExpiryDate}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.additionalEndorsements')}
              name="additionalEndorsements"
              type="textarea"
              value={formData.additionalEndorsements}
              onChange={handleInputChange}
              error={errors.additionalEndorsements}
              placeholder={t('application.pilot.placeholders.endorsements')}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.additionalMedicalClass')}
                name="additionalMedicalClass"
                type="select"
                value={formData.additionalMedicalClass}
                onChange={handleInputChange}
                error={errors.additionalMedicalClass}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'class1', label: t('application.pilot.options.class1') },
                  { value: 'class2', label: t('application.pilot.options.class2') }
                ]}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.additionalMedicalIssueDate')}
                name="additionalMedicalIssueDate"
                type="date"
                value={formData.additionalMedicalIssueDate}
                onChange={handleInputChange}
                error={errors.additionalMedicalIssueDate}
              />
              <FormField
                label={t('application.pilot.fields.additionalMedicalExpiryDate')}
                name="additionalMedicalExpiryDate"
                type="date"
                value={formData.additionalMedicalExpiryDate}
                onChange={handleInputChange}
                error={errors.additionalMedicalExpiryDate}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.icaoEnglishProficiency')}
                name="icaoEnglishProficiency"
                type="select"
                value={formData.icaoEnglishProficiency}
                onChange={handleInputChange}
                error={errors.icaoEnglishProficiency}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'level4', label: t('application.pilot.options.level4') },
                  { value: 'level5', label: t('application.pilot.options.level5') },
                  { value: 'level6', label: t('application.pilot.options.level6') }
                ]}
                required
              />
              <FormField
                label={t('application.pilot.fields.englishProficiencyExpiry')}
                name="englishProficiencyExpiry"
                type="date"
                value={formData.englishProficiencyExpiry}
                onChange={handleInputChange}
                error={errors.englishProficiencyExpiry}
              />
            </div>
          </div>
        </div>

        {/* 3. Experiencia de Vuelo */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.flightExperience')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.totalFlightHours')}
                name="totalFlightHours"
                type="number"
                value={formData.totalFlightHours}
                onChange={handleInputChange}
                error={errors.totalFlightHours}
                required
              />
              <FormField
                label={t('application.pilot.fields.picHours')}
                name="picHours"
                type="number"
                value={formData.picHours}
                onChange={handleInputChange}
                error={errors.picHours}
                required
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.jetHours')}
                name="jetHours"
                type="number"
                value={formData.jetHours}
                onChange={handleInputChange}
                error={errors.jetHours}
              />
              <FormField
                label={t('application.pilot.fields.propellerTurbopropHours')}
                name="propellerTurbopropHours"
                type="number"
                value={formData.propellerTurbopropHours}
                onChange={handleInputChange}
                error={errors.propellerTurbopropHours}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.multiEngineHours')}
              name="multiEngineHours"
              type="number"
              value={formData.multiEngineHours}
              onChange={handleInputChange}
              error={errors.multiEngineHours}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.simulatorHours')}
                name="simulatorHours"
                type="number"
                value={formData.simulatorHours}
                onChange={handleInputChange}
                error={errors.simulatorHours}
              />
              <FormField
                label={t('application.pilot.fields.simulatorType')}
                name="simulatorType"
                value={formData.simulatorType}
                onChange={handleInputChange}
                error={errors.simulatorType}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.lastCommercialOperation')}
                name="lastCommercialOperation"
                type="date"
                value={formData.lastCommercialOperation}
                onChange={handleInputChange}
                error={errors.lastCommercialOperation}
              />
              <FormField
                label={t('application.pilot.fields.lastCommercialOperationAirline')}
                name="lastCommercialOperationAirline"
                value={formData.lastCommercialOperationAirline}
                onChange={handleInputChange}
                error={errors.lastCommercialOperationAirline}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.lastFlightIn90Days')}
                name="lastFlightIn90Days"
                type="select"
                value={formData.lastFlightIn90Days}
                onChange={handleInputChange}
                error={errors.lastFlightIn90Days}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.pilot.fields.lastFlightAircraftType')}
                name="lastFlightAircraftType"
                value={formData.lastFlightAircraftType}
                onChange={handleInputChange}
                error={errors.lastFlightAircraftType}
              />
            </div>
          </div>
        </div>

        {/* 4. Habilitaciones por Tipo de Aeronave */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.typeRatings')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.pilot.fields.typeRatings')}
              name="typeRatings"
              value={formData.typeRatings}
              onChange={handleInputChange}
              error={errors.typeRatings}
              placeholder={t('application.pilot.placeholders.typeRatings')}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.typeRatingIssueDate')}
                name="typeRatingIssueDate"
                type="date"
                value={formData.typeRatingIssueDate}
                onChange={handleInputChange}
                error={errors.typeRatingIssueDate}
              />
              <FormField
                label={t('application.pilot.fields.typeRatingExpiryDate')}
                name="typeRatingExpiryDate"
                type="date"
                value={formData.typeRatingExpiryDate}
                onChange={handleInputChange}
                error={errors.typeRatingExpiryDate}
              />
            </div>

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.recentExperienceHours')}
                name="recentExperienceHours"
                type="number"
                value={formData.recentExperienceHours}
                onChange={handleInputChange}
                error={errors.recentExperienceHours}
              />
              <FormField
                label={t('application.pilot.fields.recentExperienceLast12Months')}
                name="recentExperienceLast12Months"
                type="number"
                value={formData.recentExperienceLast12Months}
                onChange={handleInputChange}
                error={errors.recentExperienceLast12Months}
              />
            </div>
          </div>
        </div>

        {/* 5. Formación Académica */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.education')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.pilot.fields.educationLevel')}
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
              label={t('application.pilot.fields.institution')}
              name="institution"
              value={formData.institution}
              onChange={handleInputChange}
              error={errors.institution}
              required
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.degreeTitle')}
                name="degreeTitle"
                value={formData.degreeTitle}
                onChange={handleInputChange}
                error={errors.degreeTitle}
              />
              <FormField
                label={t('application.pilot.fields.graduationDate')}
                name="graduationDate"
                type="date"
                value={formData.graduationDate}
                onChange={handleInputChange}
                error={errors.graduationDate}
              />
            </div>
          </div>
        </div>

        {/* 6. Idiomas */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.languages')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.englishLevel')}
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
                label={t('application.pilot.fields.englishCertification')}
                name="englishCertification"
                value={formData.englishCertification}
                onChange={handleInputChange}
                error={errors.englishCertification}
                placeholder={t('application.pilot.placeholders.englishCertification')}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.otherLanguages')}
              name="otherLanguages"
              type="textarea"
              value={formData.otherLanguages}
              onChange={handleInputChange}
              error={errors.otherLanguages}
              placeholder={t('application.pilot.placeholders.otherLanguages')}
            />
          </div>
        </div>

        {/* 7. Experiencia Laboral en Aviación */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.aviationExperience')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.pilot.fields.aviationExperience')}
              name="aviationExperience"
              type="textarea"
              value={formData.aviationExperience}
              onChange={handleInputChange}
              error={errors.aviationExperience}
              placeholder={t('application.pilot.placeholders.aviationExperience')}
            />
          </div>
        </div>

        {/* 8. Cursos y Entrenamientos Especializados */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.specializedTraining')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.hasMCC')}
                name="hasMCC"
                type="select"
                value={formData.hasMCC}
                onChange={handleInputChange}
                error={errors.hasMCC}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.pilot.fields.mccDate')}
                name="mccDate"
                type="date"
                value={formData.mccDate}
                onChange={handleInputChange}
                error={errors.mccDate}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.mccCenter')}
              name="mccCenter"
              value={formData.mccCenter}
              onChange={handleInputChange}
              error={errors.mccCenter}
            />

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.hasJetOrientation')}
                name="hasJetOrientation"
                type="select"
                value={formData.hasJetOrientation}
                onChange={handleInputChange}
                error={errors.hasJetOrientation}
                options={[
                  { value: '', label: t('application.select') },
                  { value: 'yes', label: t('application.common.yes') },
                  { value: 'no', label: t('application.common.no') }
                ]}
              />
              <FormField
                label={t('application.pilot.fields.jetOrientationDate')}
                name="jetOrientationDate"
                type="date"
                value={formData.jetOrientationDate}
                onChange={handleInputChange}
                error={errors.jetOrientationDate}
              />
            </div>

            <FormField
              label={t('application.pilot.fields.jetOrientationCenter')}
              name="jetOrientationCenter"
              value={formData.jetOrientationCenter}
              onChange={handleInputChange}
              error={errors.jetOrientationCenter}
            />

            <FormField
              label={t('application.pilot.fields.loftCrmSmsTraining')}
              name="loftCrmSmsTraining"
              type="textarea"
              value={formData.loftCrmSmsTraining}
              onChange={handleInputChange}
              error={errors.loftCrmSmsTraining}
              placeholder={t('application.pilot.placeholders.loftCrmSmsTraining')}
            />

            <FormField
              label={t('application.pilot.fields.otherRelevantCourses')}
              name="otherRelevantCourses"
              type="textarea"
              value={formData.otherRelevantCourses}
              onChange={handleInputChange}
              error={errors.otherRelevantCourses}
            />
          </div>
        </div>

        {/* 9. Documentación Adjunta */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.documents')}</h3>
          <p className={styles.fileWarning}>
            {t('application.pilot.fileWarning')}
          </p>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.pilot.fields.cv')}
              name="cv"
              type="file"
              value={formData.cv}
              onChange={handleFileChange}
              error={errors.cv}
              accept=".pdf,.doc,.docx"
              required
            />

            <FormField
              label={t('application.pilot.fields.coverLetter')}
              name="coverLetter"
              type="file"
              value={formData.coverLetter}
              onChange={handleFileChange}
              error={errors.coverLetter}
              accept=".pdf,.doc,.docx"
            />

            <FormField
              label={t('application.pilot.fields.pilotLicense')}
              name="pilotLicense"
              type="file"
              value={formData.pilotLicense}
              onChange={handleFileChange}
              error={errors.pilotLicense}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />

            <FormField
              label={t('application.pilot.fields.validMedical')}
              name="validMedical"
              type="file"
              value={formData.validMedical}
              onChange={handleFileChange}
              error={errors.validMedical}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />

            <FormField
              label={t('application.pilot.fields.validPassport')}
              name="validPassport"
              type="file"
              value={formData.validPassport}
              onChange={handleFileChange}
              error={errors.validPassport}
              accept=".pdf,.jpg,.jpeg,.png"
              required
            />

            <FormField
              label={t('application.pilot.fields.courseCertificates')}
              name="courseCertificates"
              type="file"
              value={formData.courseCertificates}
              onChange={handleFileChange}
              error={errors.courseCertificates}
              accept=".pdf,.jpg,.jpeg,.png"
            />

            <FormField
              label={t('application.pilot.fields.professionalPhoto')}
              name="professionalPhoto"
              type="file"
              value={formData.professionalPhoto}
              onChange={handleFileChange}
              error={errors.professionalPhoto}
              accept=".jpg,.jpeg,.png"
              required
            />
          </div>
        </div>

        {/* Resumen de Archivos Adjuntos */}
        <div className={styles.filesSummary}>
          <h4 className={styles.filesSummaryTitle}>📎 Resumen de Archivos Adjuntos</h4>
          {getAttachedFiles().length > 0 ? (
            <div className={styles.filesSummaryContent}>
              <div className={styles.filesSummaryHeader}>
                <span>📁 {getAttachedFiles().length} archivo(s) seleccionado(s)</span>
                <span className={calculateTotalFileSize() > 10 * 1024 * 1024 ? styles.sizeWarning : styles.sizeInfo}>
                  📏 {(calculateTotalFileSize() / 1024 / 1024).toFixed(2)} MB / 10 MB
                </span>
              </div>
              
              <div className={styles.filesList}>
                {getAttachedFiles().map(({ field, file }) => (
                  <div key={field} className={styles.fileItem}>
                    <span className={styles.fileItemIcon}>
                      {file.name.toLowerCase().includes('pdf') ? '📄' : 
                       file.name.toLowerCase().match(/\.(jpg|jpeg|png)$/) ? '🖼️' : '📝'}
                    </span>
                    <div className={styles.fileItemInfo}>
                      <div className={styles.fileItemName}>{file.name}</div>
                      <div className={styles.fileItemSize}>{(file.size / 1024 / 1024).toFixed(2)} MB</div>
                    </div>
                  </div>
                ))}
              </div>
              
              {calculateTotalFileSize() > 10 * 1024 * 1024 && (
                <div className={styles.fileSizeWarning}>
                  ⚠️ El tamaño total excede el límite de 10MB. Reduce el tamaño de algunos archivos.
                </div>
              )}
            </div>
          ) : (
            <div className={styles.noFilesMessage}>
              📝 Ningún archivo seleccionado aún
            </div>
          )}
        </div>

        {/* 10. Disponibilidad y Preferencias */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.availability')}</h3>
          <div className={styles.formGrid}>
            <FormField
              label={t('application.pilot.fields.contractAvailability')}
              name="contractAvailability"
              type="select"
              value={formData.contractAvailability}
              onChange={handleInputChange}
              error={errors.contractAvailability}
              options={[
                { value: '', label: t('application.select') },
                { value: 'immediate', label: t('application.pilot.options.immediate') },
                { value: '1month', label: t('application.pilot.options.oneMonth') },
                { value: '3months', label: t('application.pilot.options.threeMonths') },
                { value: 'other', label: t('application.pilot.options.other') }
              ]}
              required
            />

            <FormField
              label={t('application.pilot.fields.operationTypePreference')}
              name="operationTypePreference"
              type="select"
              value={formData.operationTypePreference}
              onChange={handleInputChange}
              error={errors.operationTypePreference}
              options={[
                { value: '', label: t('application.select') },
                { value: 'longHaul', label: t('application.pilot.options.longHaul') },
                { value: 'mediumHaul', label: t('application.pilot.options.mediumHaul') },
                { value: 'shortHaul', label: t('application.pilot.options.shortHaul') },
                { value: 'charter', label: t('application.pilot.options.charter') },
                { value: 'cargo', label: t('application.pilot.options.cargo') },
                { value: 'executive', label: t('application.pilot.options.executive') }
              ]}
            />

            <FormField
              label={t('application.pilot.fields.airlineInterest')}
              name="airlineInterest"
              type="textarea"
              value={formData.airlineInterest}
              onChange={handleInputChange}
              error={errors.airlineInterest}
            />

            <FormField
              label={t('application.pilot.fields.salaryExpectation')}
              name="salaryExpectation"
              value={formData.salaryExpectation}
              onChange={handleInputChange}
              error={errors.salaryExpectation}
              placeholder={t('application.pilot.placeholders.salaryExpectation')}
            />
          </div>
        </div>

        {/* 11. Declaraciones y Consentimiento */}
        <div className={styles.formSection}>
          <h3 className={styles.sectionTitle}>{t('application.pilot.sections.declarations')}</h3>
          <div className={styles.formGrid}>
            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.hasLegalRecords')}
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
                label={t('application.pilot.fields.legalRecordsDetails')}
                name="legalRecordsDetails"
                type="textarea"
                value={formData.legalRecordsDetails}
                onChange={handleInputChange}
                error={errors.legalRecordsDetails}
              />
            )}

            <div className={styles.formRow}>
              <FormField
                label={t('application.pilot.fields.hasMedicalDenial')}
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
                label={t('application.pilot.fields.medicalDenialDetails')}
                name="medicalDenialDetails"
                type="textarea"
                value={formData.medicalDenialDetails}
                onChange={handleInputChange}
                error={errors.medicalDenialDetails}
              />
            )}

            <FormField
              label={t('application.pilot.fields.dataUsageConsent')}
              name="dataUsageConsent"
              type="checkbox"
              checked={formData.dataUsageConsent}
              onChange={(name, checked) => handleInputChange(name, checked)}
              error={errors.dataUsageConsent}
              required
            />

            <FormField
              label={t('application.pilot.fields.informationAccuracy')}
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
        
        {/* Upload Progress */}
        {uploadProgress && (
          <div className={styles.progressMessage}>
            <span className={styles.spinner}>⏳</span>
            {uploadProgress}
          </div>
        )}
        
        {/* Error Messages */}
        {submitError && (
          <div className={styles.errorMessage}>
            {submitError}
          </div>
        )}
        
        {errors.totalFileSize && (
          <div className={styles.errorMessage}>
            {errors.totalFileSize}
          </div>
        )}
        
        {Object.keys(errors).length > 0 && !submitError && (
          <div className={styles.errorMessage}>
            {t('application.validation.formIncomplete')} ({Object.keys(errors).length} {t('application.validation.errorsFound')})
          </div>
        )}
      </form>
    </div>
  );
};

export default PilotForm;
