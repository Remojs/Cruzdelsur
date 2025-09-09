import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, DESTINATION_EMAIL, FILE_CONFIG } from '../config/emailConfig';

// Verificar configuración
const isConfigured = () => {
  return EMAILJS_CONFIG.publicKey && 
         EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
         EMAILJS_CONFIG.serviceId && 
         EMAILJS_CONFIG.templateId;
};

// Inicializar EmailJS solo si está configurado
if (isConfigured()) {
  emailjs.init(EMAILJS_CONFIG.publicKey);
} else {
  console.warn('EmailJS no está configurado correctamente. Verifica emailConfig.js');
}

// Función para convertir archivo a base64 con manejo de errores
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    console.log(`Convirtiendo archivo ${file.name} a base64...`);
    
    // Verificar tamaño antes de convertir
    if (file.size > 2 * 1024 * 1024) { // 2MB
      reject(new Error(`Archivo ${file.name} es muy grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Máximo 2MB permitido.`));
      return;
    }
    
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      console.log(`Archivo ${file.name} convertido exitosamente`);
      resolve(reader.result);
    };
    reader.onerror = error => {
      console.error(`Error convirtiendo archivo ${file.name}:`, error);
      reject(new Error(`Error procesando archivo ${file.name}`));
    };
  });
};

// Función principal para enviar emails con EmailJS
export const sendApplicationEmailJS = async (formData, applicationType) => {
  try {
    // Verificar configuración antes de proceder
    if (!isConfigured()) {
      throw new Error('EmailJS no está configurado correctamente. Por favor contacta al administrador del sistema.');
    }
    
    console.log('Iniciando envío de aplicación...', { applicationType, hasFiles: Object.keys(formData).filter(key => formData[key] instanceof File).length });
    
    // Convertir archivos a base64 si existen - con manejo de errores individual
    const attachments = {};
    const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto', 'nationalId', 'fullBodyPhoto', 'passportPhoto', 'trainingCertificates'];
    
    for (const field of fileFields) {
      if (formData[field] && formData[field] instanceof File) {
        try {
          console.log(`Procesando archivo: ${field} - ${formData[field].name}`);
          attachments[field] = await fileToBase64(formData[field]);
          attachments[`${field}_name`] = formData[field].name;
          attachments[`${field}_size`] = `${(formData[field].size / 1024 / 1024).toFixed(2)}MB`;
        } catch (error) {
          console.error(`Error procesando archivo ${field}:`, error);
          // Continuar con otros archivos en lugar de fallar completamente
          attachments[`${field}_error`] = `Error: ${error.message}`;
        }
      }
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
