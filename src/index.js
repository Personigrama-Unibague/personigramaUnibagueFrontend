import {createRoot} from 'react-dom/client';
import App from './App';
import React from "react";
import {BrowserRouter} from 'react-router-dom';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

// 👇️ wrap App in Router

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
