import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from './translations';

// Crear el contexto
const LanguageContext = createContext();

// Hook personalizado para usar las traducciones
export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

// Función helper para obtener texto anidado
const getNestedText = (obj, path) => {
  return path.split('.').reduce((current, key) => current?.[key], obj);
};

// Provider del contexto
export const LanguageProvider = ({ children }) => {
  // Obtener idioma guardado o usar español por defecto
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('cruzdelsur-language');
    return savedLanguage || 'es';
  });

  // Guardar idioma en localStorage cuando cambie
  useEffect(() => {
    localStorage.setItem('cruzdelsur-language', language);
  }, [language]);

  // Función para cambiar idioma
  const changeLanguage = (newLanguage) => {
    if (translations[newLanguage]) {
      setLanguage(newLanguage);
    }
  };

  // Función para obtener traducción (t = translate)
  const t = (key, defaultText = '') => {
    const text = getNestedText(translations[language], key);
    return text || defaultText || key;
  };

  // Función para obtener el idioma actual
  const getCurrentLanguage = () => language;

  // Función para verificar si está en español
  const isSpanish = () => language === 'es';

  // Función para verificar si está en inglés
  const isEnglish = () => language === 'en';

  const value = {
    language,
    changeLanguage,
    t,
    getCurrentLanguage,
    isSpanish,
    isEnglish,
    availableLanguages: Object.keys(translations)
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export default LanguageContext;
