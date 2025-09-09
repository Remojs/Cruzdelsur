import emailjs from '@emailjs/browser';
import { EMAILJS_CONFIG, DESTINATION_EMAIL, FILE_CONFIG } from '../config/emailConfig';

// Verificar configuración
const isConfigured = () => {
  return EMAILJS_CONFIG.publicKey && 
         EMAILJS_CONFIG.publicKey !== 'YOUR_EMAILJS_PUBLIC_KEY' &&
         EMAILJS_CONFIG.publicKey !== 'TU_PUBLIC_KEY_AQUI' &&
         EMAILJS_CONFIG.serviceId && 
         EMAILJS_CONFIG.templateId;
};

// Inicializar EmailJS solo si está configurado
if (isConfigured()) {
  emailjs.init(EMAILJS_CONFIG.publicKey);
} else {
  console.warn('EmailJS no está configurado correctamente. Verifica emailConfig.js');
}

// NUEVA ESTRATEGIA: Solo enviar datos, informar sobre archivos
export const sendApplicationEmailJS = async (formData, applicationType) => {
  try {
    // Verificar configuración antes de proceder
    if (!isConfigured()) {
      throw new Error('EmailJS no está configurado correctamente. Por favor contacta al administrador del sistema.');
    }
    
    console.log('Iniciando envío de aplicación...', { applicationType });
    
    // Recopilar información de archivos (sin adjuntarlos)
    const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto', 'nationalId', 'fullBodyPhoto', 'passportPhoto', 'trainingCertificates'];
    
    const attachedFiles = [];
    let totalSize = 0;
    
    for (const field of fileFields) {
      if (formData[field] && formData[field] instanceof File) {
        const file = formData[field];
        attachedFiles.push({
          field: field,
          name: file.name,
          size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
          type: file.type
        });
        totalSize += file.size;
      }
    }
    
    console.log(`Archivos a reportar: ${attachedFiles.length}, Tamaño total: ${(totalSize / 1024 / 1024).toFixed(2)} MB`);
    
    // Crear lista de archivos para el email
    const filesList = attachedFiles.length > 0 
      ? attachedFiles.map(file => `• ${file.field}: ${file.name} (${file.size})`).join('\n')
      : 'Ningún archivo adjunto';
    
    // Preparar datos para el template de EmailJS
    const templateParams = {
      to_email: DESTINATION_EMAIL,
      from_name: formData.fullName,
      from_email: formData.email,
      phone: formData.contactPhone,
      subject: `Nueva Aplicación ${applicationType === 'pilot' ? 'Piloto' : 'TCP'} - ${formData.fullName}`,
      
      // Datos principales
      full_name: formData.fullName,
      date_of_birth: formData.dateOfBirth,
      age: formData.age,
      gender: formData.gender,
      nationality: formData.nationality,
      current_address: formData.currentAddress,
      contact_phone: formData.contactPhone,
      email: formData.email,
      linkedin: formData.linkedIn || 'N/A',
      
      application_type: applicationType === 'pilot' ? 'Piloto' : 'Tripulante de Cabina (TCP)',
      
      // Información de archivos (sin adjuntar)
      files_count: attachedFiles.length,
      files_total_size: `${(totalSize / 1024 / 1024).toFixed(2)} MB`,
      files_list: filesList,
      
      // Mensaje completo
      message: createApplicationMessage(formData, applicationType, attachedFiles, totalSize)
    };

    console.log('Enviando aplicación vía EmailJS...');
    
    const response = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams
    );
    
    console.log('✅ Aplicación enviada exitosamente:', response);
    
    // Guardar archivos localmente si es posible
    if (attachedFiles.length > 0) {
      console.log('📎 Archivos disponibles para descarga:', attachedFiles);
      saveFilesLocally(formData, attachedFiles);
    }
    
    return {
      success: true,
      message: `Aplicación enviada exitosamente. ${attachedFiles.length} archivo(s) reportado(s).`,
      messageId: response.text,
      filesReported: attachedFiles.length
    };
    
  } catch (error) {
    console.error('Error enviando aplicación:', error);
    throw new Error(`Error al enviar la aplicación: ${error.message}`);
  }
};

// Función para crear mensaje completo de la aplicación
const createApplicationMessage = (formData, applicationType, attachedFiles, totalSize) => {
  let message = `NUEVA APLICACIÓN RECIBIDA

=== INFORMACIÓN PERSONAL ===
• Nombre Completo: ${formData.fullName}
• Email: ${formData.email}
• Teléfono: ${formData.contactPhone}
• Fecha de Nacimiento: ${formData.dateOfBirth}
• Edad: ${formData.age} años
• Género: ${formData.gender}
• Nacionalidad: ${formData.nationality}
• Dirección: ${formData.currentAddress}
• LinkedIn: ${formData.linkedIn || 'No proporcionado'}

=== TIPO DE APLICACIÓN ===
${applicationType === 'pilot' ? '✈️ PILOTO' : '🧑‍✈️ TRIPULANTE DE CABINA (TCP)'}

`;

  // Información específica de piloto
  if (applicationType === 'pilot') {
    message += `=== INFORMACIÓN DE VUELO ===
• Licencia Actual: ${formData.currentLicense || 'N/A'}
• País de Licencia: ${formData.licenseCountry || 'N/A'}
• Número de Licencia: ${formData.licenseNumber || 'N/A'}
• Horas de Vuelo Totales: ${formData.totalFlightHours || 'N/A'}
• Horas como PIC: ${formData.picHours || 'N/A'}
• Certificado Médico: ${formData.medicalClass || 'N/A'}
• Inglés ICAO: ${formData.icaoEnglishProficiency || 'N/A'}

`;
  }

  // Información de archivos
  message += `=== ARCHIVOS ADJUNTOS ===
Total de archivos: ${attachedFiles.length}
Tamaño total: ${(totalSize / 1024 / 1024).toFixed(2)} MB

`;

  if (attachedFiles.length > 0) {
    message += `Lista de archivos:\n`;
    attachedFiles.forEach(file => {
      message += `• ${getFieldDisplayName(file.field)}: ${file.name} (${file.size})\n`;
    });
  } else {
    message += `No se adjuntaron archivos.\n`;
  }

  message += `
=== DISPONIBILIDAD ===
• Disponibilidad para Contrato: ${formData.contractAvailability || 'N/A'}
• Disponible para Reubicación: ${formData.availableForRelocation || 'N/A'}

=== EDUCACIÓN ===
• Nivel Educativo: ${formData.educationLevel || 'N/A'}
• Institución: ${formData.institution || 'N/A'}
• Nivel de Inglés: ${formData.englishLevel || 'N/A'}

---
📧 Aplicación enviada desde: cruzdelsur.com
📅 Fecha: ${new Date().toLocaleString('es-ES')}

NOTA: Los archivos están disponibles para revisión. Contactar al aplicante para obtener los documentos.`;

  return message;
};

// Función para obtener nombres legibles de campos
const getFieldDisplayName = (field) => {
  const fieldNames = {
    cv: 'Currículum Vitae',
    coverLetter: 'Carta de Presentación',
    pilotLicense: 'Licencia de Piloto',
    validMedical: 'Certificado Médico',
    validPassport: 'Pasaporte',
    courseCertificates: 'Certificados de Cursos',
    professionalPhoto: 'Foto Profesional',
    nationalId: 'Documento de Identidad',
    fullBodyPhoto: 'Foto Cuerpo Completo',
    passportPhoto: 'Foto Tamaño Pasaporte',
    trainingCertificates: 'Certificados de Entrenamiento'
  };
  return fieldNames[field] || field;
};

// Función para guardar archivos localmente (para futuro procesamiento)
const saveFilesLocally = (formData, attachedFiles) => {
  try {
    // Crear objeto con información de archivos para descarga manual
    const filesInfo = {
      applicant: formData.fullName,
      email: formData.email,
      timestamp: new Date().toISOString(),
      files: attachedFiles.map(file => ({
        field: file.field,
        name: file.name,
        size: file.size,
        displayName: getFieldDisplayName(file.field)
      }))
    };
    
    // Guardar información en localStorage para referencia
    const storageKey = `application_${Date.now()}_${formData.fullName.replace(/\s+/g, '_')}`;
    localStorage.setItem(storageKey, JSON.stringify(filesInfo));
    
    console.log('📁 Información de archivos guardada localmente:', storageKey);
    console.log('📋 Para procesar manualmente:', filesInfo);
    
  } catch (error) {
    console.warn('No se pudo guardar información de archivos localmente:', error);
  }
};
