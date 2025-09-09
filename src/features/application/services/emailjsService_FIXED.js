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

// Función para convertir archivo a base64 con manejo de errores
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    console.log(`Convirtiendo archivo ${file.name} a base64...`);
    
    // Verificar tamaño antes de convertir (1MB máximo por archivo para EmailJS)
    if (file.size > 1 * 1024 * 1024) { // 1MB
      reject(new Error(`Archivo ${file.name} es muy grande (${(file.size / 1024 / 1024).toFixed(2)}MB). Máximo 1MB por archivo para envío por email.`));
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

// Función principal para enviar emails con EmailJS - DIVIDIDO EN MÚLTIPLES EMAILS
export const sendApplicationEmailJS = async (formData, applicationType) => {
  try {
    // Verificar configuración antes de proceder
    if (!isConfigured()) {
      throw new Error('EmailJS no está configurado correctamente. Por favor contacta al administrador del sistema.');
    }
    
    console.log('Iniciando envío de aplicación...', { applicationType });
    
    // PASO 1: Enviar datos principales SIN archivos
    const mainEmailResult = await sendMainApplicationEmail(formData, applicationType);
    console.log('✅ Email principal enviado:', mainEmailResult);
    
    // PASO 2: Enviar archivos uno por uno en emails separados
    const fileFields = ['cv', 'coverLetter', 'pilotLicense', 'validMedical', 'validPassport', 'courseCertificates', 'professionalPhoto', 'nationalId', 'fullBodyPhoto', 'passportPhoto', 'trainingCertificates'];
    
    const fileResults = [];
    for (const field of fileFields) {
      if (formData[field] && formData[field] instanceof File) {
        try {
          console.log(`Enviando archivo: ${field} - ${formData[field].name}`);
          const result = await sendFileEmail(formData, applicationType, field, formData[field]);
          fileResults.push(result);
          console.log(`✅ Archivo ${field} enviado`);
          
          // Esperar 1 segundo entre archivos para evitar rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000));
        } catch (error) {
          console.error(`❌ Error enviando archivo ${field}:`, error);
          // Continuar con otros archivos
          fileResults.push({ field, error: error.message });
        }
      }
    }
    
    console.log(`✅ Aplicación enviada: 1 email principal + ${fileResults.length} archivos`);
    
    return {
      success: true,
      message: `Aplicación enviada exitosamente en ${1 + fileResults.length} email(s)`,
      mainEmail: mainEmailResult,
      files: fileResults
    };
    
  } catch (error) {
    console.error('Error enviando aplicación:', error);
    throw new Error(`Error al enviar la aplicación: ${error.message}`);
  }
};

// Función para enviar email principal con datos (sin archivos)
const sendMainApplicationEmail = async (formData, applicationType) => {
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
    
    // Mensaje principal
    message: `NUEVA APLICACIÓN RECIBIDA

INFORMACIÓN PERSONAL:
- Nombre: ${formData.fullName}
- Email: ${formData.email}
- Teléfono: ${formData.contactPhone}
- Edad: ${formData.age}
- Nacionalidad: ${formData.nationality}
- Dirección: ${formData.currentAddress}

TIPO DE APLICACIÓN: ${applicationType === 'pilot' ? 'PILOTO' : 'TRIPULANTE DE CABINA (TCP)'}

NOTA: Los archivos adjuntos se enviarán en emails separados.

Aplicación enviada desde: cruzdelsur.com`
  };

  console.log('Enviando email principal...');
  
  const response = await emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams
  );
  
  return {
    success: true,
    messageId: response.text,
    type: 'main'
  };
};

// Función para enviar un archivo individual
const sendFileEmail = async (formData, applicationType, fieldName, file) => {
  // Convertir archivo a base64
  const fileBase64 = await fileToBase64(file);
  
  const templateParams = {
    to_email: DESTINATION_EMAIL,
    from_name: formData.fullName,
    from_email: formData.email,
    subject: `Archivo: ${fieldName} - ${formData.fullName} (${applicationType === 'pilot' ? 'Piloto' : 'TCP'})`,
    
    // Información del archivo
    file_field: fieldName,
    file_name: file.name,
    file_size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
    file_type: file.type,
    
    // Archivo en base64
    file_attachment: fileBase64,
    
    // Datos de identificación
    full_name: formData.fullName,
    application_type: applicationType === 'pilot' ? 'Piloto' : 'TCP',
    
    message: `ARCHIVO ADJUNTO

Aplicante: ${formData.fullName}
Tipo: ${applicationType === 'pilot' ? 'Piloto' : 'TCP'}
Campo: ${fieldName}
Archivo: ${file.name}
Tamaño: ${(file.size / 1024 / 1024).toFixed(2)} MB`
  };

  console.log(`Enviando archivo ${file.name}...`);
  
  const response = await emailjs.send(
    EMAILJS_CONFIG.serviceId,
    EMAILJS_CONFIG.templateId,
    templateParams
  );
  
  return {
    success: true,
    messageId: response.text,
    field: fieldName,
    fileName: file.name,
    type: 'file'
  };
};
