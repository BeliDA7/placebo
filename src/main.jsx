import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AccessibilityProvider } from './context/AccessibilityContext.jsx';
import './index.css'
import App from './App.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AccessibilityProvider>
      <BrowserRouter>
       <App />
      </BrowserRouter>
    </AccessibilityProvider>
  </React.StrictMode>,
);


// main.jsx — точка входа React-приложения. Она выполняет:
// Импорт всех необходимых зависимостей (React, ReactDOM, роутер, контексты, стили).
// Монтирование корневого компонента <App /> в DOM-элемент #root.
// Оборачивание приложения в сервисные провайдеры:
// StrictMode — подсвечивает потенциальные проблемы в разработке.
// AccessibilityProvider — делает настройки доступности глобальными.
// BrowserRouter — включает клиентскую маршрутизацию.