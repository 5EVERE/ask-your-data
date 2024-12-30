import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App'; // Import the main App component
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter for routing
import api from './store/api/api'; // Import the custom Axios API instance
import './i18n';
// Attach the Axios API instance to the global object
(global as any).api = api;

/**
 * Create a React root and render the App component.
 */
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement // Target the root HTML element
);

root.render(
  <React.StrictMode>
    {/* Wrap the App component with BrowserRouter for routing */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
