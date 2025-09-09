import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, DESTINATION_EMAIL, FILE_CONFIG } from '../config/emailConfig';

// Inicializar EmailJS
emailjs.init(EMAILJS_CONFIG.publicKey);

// Función para convertir archivo a base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
};

// Función principal para enviar emails con EmailJS
export const sendApplicationEmailJS = async (formData, applicationType) => {
  try {
    // Convertir archivos a base64 si existen
    const attachments = {};
    
    if (formData.cv) {
      attachments.cv = await fileToBase64(formData.cv);
      attachments.cv_name = formData.cv.name;
    }
    
    if (formData.coverLetter) {
      attachments.cover_letter = await fileToBase64(formData.coverLetter);
      attachments.cover_letter_name = formData.coverLetter.name;
    }
    
    if (formData.pilotLicense) {
      attachments.pilot_license = await fileToBase64(formData.pilotLicense);
      attachments.pilot_license_name = formData.pilotLicense.name;
    }
    
    if (formData.validMedical) {
      attachments.valid_medical = await fileToBase64(formData.validMedical);
      attachments.valid_medical_name = formData.validMedical.name;
    }
    
    if (formData.validPassport) {
      attachments.valid_passport = await fileToBase64(formData.validPassport);
      attachments.valid_passport_name = formData.validPassport.name;
    }
    
    if (formData.courseCertificates) {
      attachments.course_certificates = await fileToBase64(formData.courseCertificates);
      attachments.course_certificates_name = formData.courseCertificates.name;
    }
    
    if (formData.professionalPhoto) {
      attachments.professional_photo = await fileToBase64(formData.professionalPhoto);
      attachments.professional_photo_name = formData.professionalPhoto.name;
    }
    
    // Archivos específicos de TCP
    if (formData.nationalId) {
      attachments.national_id = await fileToBase64(formData.nationalId);
      attachments.national_id_name = formData.nationalId.name;
    }
    
    if (formData.fullBodyPhoto) {
      attachments.full_body_photo = await fileToBase64(formData.fullBodyPhoto);
      attachments.full_body_photo_name = formData.fullBodyPhoto.name;
    }
    
    if (formData.passportPhoto) {
      attachments.passport_photo = await fileToBase64(formData.passportPhoto);
      attachments.passport_photo_name = formData.passportPhoto.name;
    }
    
    if (formData.trainingCertificates) {
      attachments.training_certificates = await fileToBase64(formData.trainingCertificates);
      attachments.training_certificates_name = formData.trainingCertificates.name;
    }

    // Preparar datos para el template de EmailJS
    const templateParams = {
      // Información básica
      to_email: DESTINATION_EMAIL, // Email de destino
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.contactPhone,
      subject: `Nueva Aplicación ${applicationType === 'pilot' ? 'Piloto' : 'TCP'} - ${formData.fullName}`,
      
      // Datos personales
      full_name: formData.fullName,
      date_of_birth: formData.dateOfBirth,
      age: formData.age,
      gender: formData.gender,
      nationality: formData.nationality,
      current_address: formData.currentAddress,
      contact_phone: formData.contactPhone,
      email: formData.email,
      linkedin: formData.linkedIn || 'N/A',
      
      // Información específica por tipo
      application_type: applicationType === 'pilot' ? 'Piloto' : 'Tripulante de Cabina (TCP)',
      
      // Datos específicos de piloto
      ...(applicationType === 'pilot' && {
        total_flight_hours: formData.totalFlightHours,
        pic_hours: formData.picHours,
        jet_hours: formData.jetHours,
        multi_engine_hours: formData.multiEngineHours,
        current_license: formData.currentLicense,
        license_number: formData.licenseNumber,
        medical_class: formData.medicalClass,
        icao_english_proficiency: formData.icaoEnglishProficiency,
        type_ratings: formData.typeRatings,
        aviation_experience: formData.aviationExperience,
        has_mcc: formData.hasMCC,
        has_jet_orientation: formData.hasJetOrientation,
      }),
      
      // Datos específicos de TCP
      ...(applicationType === 'tcp' && {
        height: formData.height,
        weight: formData.weight,
        arm_reach: formData.armReach,
        work_experience: formData.workExperience,
        has_initial_tcp_course: formData.hasInitialTCPCourse,
        has_sep: formData.hasSEP,
        has_first_aid_certificate: formData.hasFirstAidCertificate,
        customer_service_skills: formData.customerServiceSkills,
        teamwork_leadership_skills: formData.teamworkLeadershipSkills,
      }),
      
      // Disponibilidad y preferencias
      contract_availability: formData.contractAvailability || 'N/A',
      operation_type_preference: formData.operationTypePreference || 'N/A',
      airline_interest: formData.airlineInterest || 'N/A',
      salary_expectation: formData.salaryExpectation || 'N/A',
      
      // Declaraciones
      has_legal_records: formData.hasLegalRecords || 'N/A',
      legal_records_details: formData.legalRecordsDetails || 'N/A',
      has_medical_denial: formData.hasMedicalDenial || 'N/A',
      medical_denial_details: formData.medicalDenialDetails || 'N/A',
      
      // Archivos adjuntos (como base64)
      ...attachments,
      
      // Metadata
      application_date: new Date().toLocaleDateString('es-ES'),
      application_time: new Date().toLocaleTimeString('es-ES'),
    };

    console.log('Enviando aplicación vía EmailJS...');

    // Enviar email usando EmailJS
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );

    console.log('Email enviado exitosamente:', response);

    return {
      success: true,
      message: 'Aplicación enviada exitosamente',
      messageId: response.text
    };

  } catch (error) {
    console.error('Error enviando email:', error);
    throw new Error(`Error al enviar la aplicación: ${error.message}`);
  }
};

// Función alternativa usando Formspree (más simple, sin archivos)
export const sendApplicationFormspree = async (formData, applicationType) => {
  try {
    const response = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: formData.email,
        name: `${formData.firstName} ${formData.lastName}`,
        phone: formData.phone,
        applicationType,
        message: formatApplicationData(formData, applicationType),
      }),
    });

    if (!response.ok) {
      throw new Error('Error en el envío');
    }

    return {
      success: true,
      message: 'Aplicación enviada exitosamente'
    };

  } catch (error) {
    console.error('Error enviando con Formspree:', error);
    throw new Error(`Error al enviar la aplicación: ${error.message}`);
  }
};

// Función helper para formatear datos
const formatApplicationData = (formData, applicationType) => {
  const sections = [];
  
  sections.push('=== INFORMACIÓN PERSONAL ===');
  sections.push(`Nombre: ${formData.firstName} ${formData.lastName}`);
  sections.push(`Fecha de Nacimiento: ${formData.dateOfBirth}`);
  sections.push(`Nacionalidad: ${formData.nationality}`);
  sections.push(`Email: ${formData.email}`);
  sections.push(`Teléfono: ${formData.phone}`);
  sections.push(`Dirección: ${formData.address}, ${formData.city}, ${formData.country}`);
  
  if (applicationType === 'pilot') {
    sections.push('\n=== EXPERIENCIA DE VUELO ===');
    sections.push(`Horas Totales de Vuelo: ${formData.totalFlightHours}`);
    sections.push(`Horas PIC: ${formData.picHours}`);
    sections.push(`Horas SIC: ${formData.sicHours}`);
    sections.push(`Horas Multi-Motor: ${formData.multiEngineHours}`);
    sections.push(`Horas Jet: ${formData.jetHours}`);
    
    sections.push('\n=== LICENCIAS Y CERTIFICACIONES ===');
    sections.push(`Tipo de Licencia: ${formData.licenseType}`);
    sections.push(`Número de Licencia: ${formData.licenseNumber}`);
    sections.push(`Clase Médica: ${formData.medicalClass}`);
    sections.push(`Nivel de Inglés: ${formData.englishProficiency}`);
    sections.push(`Habilitaciones de Tipo: ${formData.typeRatings}`);
    
  } else if (applicationType === 'tcp') {
    sections.push('\n=== INFORMACIÓN FÍSICA ===');
    sections.push(`Altura: ${formData.height} cm`);
    sections.push(`Peso: ${formData.weight} kg`);
    
    sections.push('\n=== EXPERIENCIA ===');
    sections.push(`Experiencia TCP: ${formData.cabinCrewExperience}`);
    sections.push(`Experiencia Atención al Cliente: ${formData.customerServiceExperience}`);
    
    sections.push('\n=== EDUCACIÓN E IDIOMAS ===');
    sections.push(`Educación: ${formData.education}`);
    sections.push(`Idiomas: ${formData.languages}`);
    sections.push(`Capacidad de Natación: ${formData.swimAbility}`);
  }
  
  if (formData.currentEmployer) {
    sections.push('\n=== EMPLEO ACTUAL ===');
    sections.push(`Empleador Actual: ${formData.currentEmployer}`);
    sections.push(`Posición Actual: ${formData.currentPosition}`);
    sections.push(`Razón para Cambio: ${formData.reasonForLeaving}`);
  }
  
  sections.push('\n=== INFORMACIÓN ADICIONAL ===');
  sections.push(`Dispuesto a Reubicarse: ${formData.willingToRelocate}`);
  sections.push(`Base Preferida: ${formData.preferredBase}`);
  sections.push(`Fecha de Disponibilidad: ${formData.availabilityDate}`);
  sections.push(`Expectativa Salarial: ${formData.salaryExpectation}`);
  
  if (formData.additionalInfo) {
    sections.push(`Información Adicional: ${formData.additionalInfo}`);
  }
  
  return sections.join('\n');
};
