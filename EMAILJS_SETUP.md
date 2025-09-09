# Configuración de EmailJS para Formularios de Aplicación

## Problema Actual
Los formularios de aplicación no pueden enviar archivos debido a que EmailJS no está configurado correctamente.

## ⚠️ CONFIGURACIÓN REQUERIDA

### 1. Crear cuenta en EmailJS
1. Ve a [https://emailjs.com](https://emailjs.com)
2. Registra una cuenta gratuita
3. Confirma tu email

### 2. Configurar Servicio de Email
1. En el dashboard de EmailJS, ve a **Email Services**
2. Click **Add New Service**
3. Selecciona **Gmail** (recomendado)
4. Sigue las instrucciones para conectar tu cuenta de Gmail
5. Copia el **Service ID** (ej: `service_abc123`)

### 3. Crear Template de Email
1. Ve a **Email Templates**
2. Click **Create New Template**
3. Configura el template con las siguientes variables:

**Subject:** Nueva Aplicación {{application_type}} - {{full_name}}

**Body:**
```
Nueva aplicación recibida:

INFORMACIÓN PERSONAL:
- Nombre: {{full_name}}
- Email: {{email}}
- Teléfono: {{contact_phone}}
- Fecha de nacimiento: {{date_of_birth}}
- Nacionalidad: {{nationality}}

ARCHIVOS ADJUNTOS:
- CV: {{cv_name}}
- Carta de presentación: {{cover_letter_name}}
- Licencia de piloto: {{pilot_license_name}}
- Certificado médico: {{valid_medical_name}}
- Pasaporte: {{valid_passport_name}}
- Foto profesional: {{professional_photo_name}}

--- Datos completos ---
{{message}}
```

4. Copia el **Template ID** (ej: `template_xyz789`)

### 4. Obtener Public Key
1. Ve a **Account** → **General**
2. Copia la **Public Key** (ej: `abcd1234567890`)

### 5. Actualizar Configuración
Edita el archivo `src/features/application/config/emailConfig.js`:

```javascript
export const EMAILJS_CONFIG = {
  serviceId: 'TU_SERVICE_ID_AQUI',      // Del paso 2
  templateId: 'TU_TEMPLATE_ID_AQUI',    // Del paso 3
  publicKey: 'TU_PUBLIC_KEY_AQUI',      // Del paso 4
};

// Email donde se recibirán las aplicaciones
export const DESTINATION_EMAIL = 'careers@cruzdelsur.com';
```

## 🚀 Características Implementadas

### ✅ Validación de Archivos
- **Tamaño máximo:** 2MB por archivo
- **Formatos permitidos:** PDF, DOC, DOCX, JPG, PNG
- **Validación total:** 10MB máximo por envío

### ✅ Manejo de Errores
- Mensajes específicos por tipo de error
- Indicadores visuales de progreso
- Validación en tiempo real

### ✅ Experiencia de Usuario
- Indicador de archivos seleccionados
- Progreso de subida visible
- Mensajes de error claros
- Confirmación de envío exitoso

## 📋 Campos de Archivos por Formulario

### Formulario Piloto
- CV (requerido)
- Carta de presentación (opcional)
- Licencia de piloto (requerido)
- Certificado médico válido (requerido)
- Pasaporte válido (requerido)
- Certificados de cursos (opcional)
- Foto profesional (requerido)

### Formulario TCP
- CV (requerido)
- Carta de presentación (opcional)
- Documento de identidad (requerido)
- Foto cuerpo completo (requerido)
- Foto tamaño pasaporte (requerido)
- Certificados de entrenamiento (opcional)

## 🛠️ Solución de Problemas

### Error: "EmailJS no está configurado"
- Verifica que hayas reemplazado los valores en `emailConfig.js`
- Asegúrate de que el Public Key no sea `YOUR_EMAILJS_PUBLIC_KEY`

### Error: "Archivo muy grande"
- Los archivos deben ser menores a 2MB cada uno
- Reduce la calidad de imágenes o comprime PDFs

### Error: "Tipo de archivo no permitido"
- Solo se permiten: PDF, DOC, DOCX, JPG, PNG
- Convierte el archivo al formato correcto

### Error de conexión
- Verifica tu conexión a internet
- Revisa la configuración de EmailJS en su dashboard

## 📞 Contacto
Si necesitas ayuda con la configuración, contacta al desarrollador.
