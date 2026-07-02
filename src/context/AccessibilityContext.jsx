// src/context/AccessibilityContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const AccessibilityContext = createContext();

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return context;
};

export const AccessibilityProvider = ({ children }) => {
  // Состояние для высокого контраста
  const [highContrast, setHighContrast] = useState(() => {
    return localStorage.getItem('accessibility-highContrast') === 'true';
  });

  // Состояние для размера шрифта
  const [fontSize, setFontSize] = useState(() => {
    return localStorage.getItem('accessibility-fontSize') || 'normal';
  });

  // Применяем класс high-contrast к body
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-highContrast', highContrast);
  }, [highContrast]);

  // Применяем класс для шрифта
  useEffect(() => {
    document.body.classList.remove('font-large', 'font-xlarge');
    if (fontSize === 'large') document.body.classList.add('font-large');
    if (fontSize === 'xlarge') document.body.classList.add('font-xlarge');
    localStorage.setItem('accessibility-fontSize', fontSize);
  }, [fontSize]);

  const toggleHighContrast = () => setHighContrast(prev => !prev);

  const increaseFontSize = () => {
    if (fontSize === 'normal') setFontSize('large');
    else if (fontSize === 'large') setFontSize('xlarge');
  };

  const decreaseFontSize = () => {
    if (fontSize === 'xlarge') setFontSize('large');
    else if (fontSize === 'large') setFontSize('normal');
  };

  const resetFontSize = () => setFontSize('normal');

  const value = {
    highContrast,
    fontSize,
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};