import {createRoot} from 'react-dom/client';
import App from './App';
import React from "react";
import {BrowserRouter} from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

const localStorageKey = 'depth'; // Nombre de la variable en el localStorage
const defaultValue = '1'; // Valor predeterminado si la variable no existe

// Verificar si la variable ya existe en el localStorage
const storedValue = localStorage.getItem(localStorageKey);

// Si no existe, inicializarla con el valor predeterminado
if (!storedValue) {
  localStorage.setItem(localStorageKey, defaultValue);
}

// 👇️ wrap App in Router

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
