import React from 'react';
import { FILE_CONFIG } from '../config/emailConfig';
import styles from '../application.module.css';

const FormField = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onFileChange,
  error,
  required = false,
  fullWidth = false,
  placeholder,
  options = [],
  accept,
  ...props
}) => {
  const validateFile = (file) => {
    // Validar tamaño
    if (file.size > FILE_CONFIG.maxSize) {
      const sizeMB = (FILE_CONFIG.maxSize / (1024 * 1024)).toFixed(1);
      return `El archivo "${file.name}" es muy grande. Máximo ${sizeMB}MB permitido. Tamaño actual: ${(file.size / (1024 * 1024)).toFixed(2)}MB`;
    }

    // Validar tipo por extensión (más confiable)
    const fileName = file.name.toLowerCase();
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.jpg', '.jpeg', '.png'];
    const hasValidExtension = allowedExtensions.some(ext => fileName.endsWith(ext));
    
    if (!hasValidExtension) {
      return `Tipo de archivo no permitido. Solo se permiten: ${allowedExtensions.join(', ')}`;
    }

    return null;
  };

  const handleChange = (e) => {
    if (type === 'file') {
      const file = e.target.files[0];
      if (file) {
        const validationError = validateFile(file);
        if (validationError) {
          alert(validationError);
          e.target.value = ''; // Limpiar input
          return;
        }
      }
      
      if (onFileChange) {
        onFileChange(name, file);
      } else if (onChange) {
        onChange(name, file);
      }
    } else {
      onChange(name, e.target.value);
    }
  };

  const renderInput = () => {
    switch (type) {
      case 'textarea':
        return (
          <textarea
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${styles.textarea} ${error ? styles.error : ''}`}
            {...props}
          />
        );

      case 'select':
        return (
          <select
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            className={`${styles.select} ${error ? styles.error : ''}`}
            {...props}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );

      case 'file':
        return (
          <div className={styles.fileUpload}>
            <input
              type="file"
              id={name}
              name={name}
              onChange={handleChange}
              accept={accept}
              className={styles.fileInput}
              {...props}
            />
            <label htmlFor={name} className={`${styles.fileLabel} ${value ? styles.fileLabelSelected : ''}`}>
              <span className={styles.fileIcon}>📁</span>
              {value ? `📄 ${value.name}` : 'Seleccionar archivo'}
            </label>
            
            {value && (
              <div className={styles.fileInfo}>
                <div className={styles.fileDetails}>
                  <span className={styles.checkIcon}>✅</span>
                  <div className={styles.fileText}>
                    <div className={styles.fileName}>{value.name}</div>
                    <div className={styles.fileSize}>
                      Tamaño: {(value.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <div className={styles.fileType}>
                      Tipo: {value.name.split('.').pop().toUpperCase()}
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className={styles.removeFile}
                    onClick={(e) => {
                      e.preventDefault();
                      if (onChange) onChange(name, null);
                      document.getElementById(name).value = '';
                    }}
                    title="Eliminar archivo"
                  >
                    ❌
                  </button>
                </div>
              </div>
            )}
            
            {!value && (
              <div className={styles.fileHint}>
                <div>📄 Formatos: PDF, DOC, DOCX, JPG, PNG</div>
                <div>📏 Máximo: 2MB por archivo</div>
              </div>
            )}
          </div>
        );

      default:
        return (
          <input
            type={type}
            id={name}
            name={name}
            value={value}
            onChange={handleChange}
            placeholder={placeholder}
            className={`${styles.input} ${error ? styles.error : ''}`}
            {...props}
          />
        );
    }
  };

  return (
    <div className={`${styles.formGroup} ${fullWidth ? styles.formGroupFull : ''}`}>
      <label htmlFor={name} className={styles.label}>
        {label}
        {required && <span className={styles.required}> *</span>}
      </label>
      {renderInput()}
      {error && <div className={styles.errorMessage}>{error}</div>}
    </div>
  );
};

export default FormField;
