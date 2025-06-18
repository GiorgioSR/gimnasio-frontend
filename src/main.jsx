import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
// No necesitamos './index.css' por ahora, MUI se encargará del estilo.

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);