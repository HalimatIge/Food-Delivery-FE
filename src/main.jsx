import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css' // ✅ Make sure this is Tailwind-enabled
import { AuthProvider } from './context/authcontext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <AuthProvider>
      <App />
    </AuthProvider>
    {/* </BrowserRouter> */}
  </React.StrictMode>
);
