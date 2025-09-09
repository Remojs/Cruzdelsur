// Configuración de EmailJS - REEMPLAZA CON TUS VALORES REALES
// 
// Para obtener estos valores:
// 1. Ve a https://emailjs.com
// 2. Crea una cuenta
// 3. Configura tu servicio de email (Gmail recomendado)
// 4. Crea un template de email
// 5. Copia los IDs correspondientes aquí

export const EMAILJS_CONFIG = {
  // Tu Service ID de EmailJS 
  serviceId: 'service_33d9i1y', 
  
  // Tu Template ID de EmailJS 
  templateId: 'template_rkzw2gj',
  
  // Tu Public Key de EmailJS (necesitas obtener este de tu cuenta)
  publicKey: 'xxxxxxxxxxxxxxx', // Reemplaza con tu Public Key
};

// Email de destino para las aplicaciones
export const DESTINATION_EMAIL = 'careers@cruzdelsur.com';

// Configuración de archivos
export const FILE_CONFIG = {
  maxSize: 2 * 1024 * 1024, // 2MB por archivo (límite de EmailJS)
  maxTotalSize: 10 * 1024 * 1024, // 10MB total por email (límite de EmailJS)
  allowedTypes: [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    'image/jpeg',
    'image/png',
    'image/jpg',
  ],
  allowedExtensions: ['.pdf', '.doc', '.docx', '.xls', '.xlsx', '.jpg', '.jpeg', '.png'],
};

// Instrucciones de configuración:
/*
PASOS PARA CONFIGURAR EMAILJS:

1. CREAR CUENTA
   - Ve a https://emailjs.com
   - Regístrate con tu email
   - Confirma tu cuenta

2. CONFIGURAR SERVICIO
   - En dashboard, ve a "Email Services"
   - Haz clic en "Add New Service"
   - Selecciona Gmail (recomendado)
   - Conecta tu cuenta de Gmail
   - Copia el SERVICE_ID

3. CREAR TEMPLATE
   - Ve a "Email Templates"
   - Haz clic en "Create New Template"
   - Configura:
     * To Email: careers@cruzdelsur.com
     * Subject: {{subject}}
     * From Name: {{from_name}}
     * Reply To: {{from_email}}
   - Usa el contenido del archivo EMAILJS_SETUP.md
   - Copia el TEMPLATE_ID

4. OBTENER PUBLIC KEY
   - Ve a "Account" > "General"
   - Copia tu Public Key

5. REEMPLAZAR VALORES
   - Reemplaza 'service_xxxxxxx' con tu SERVICE_ID
   - Reemplaza 'template_xxxxxxx' con tu TEMPLATE_ID
   - Reemplaza 'xxxxxxxxxxxxxxx' con tu PUBLIC_KEY

6. TESTING
   - Usa el test de EmailJS para verificar
   - Envía una aplicación de prueba

COSTOS:
- Gratis: 200 emails/mes
- Personal: $15/mes - 1,000 emails
- Professional: $30/mes - 10,000 emails

LÍMITES DE ARCHIVOS:
- 2MB por archivo máximo
- 10MB total por email
- Formatos soportados: PDF, DOC, DOCX, JPG, PNG
*/
