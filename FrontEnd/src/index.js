import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = '';
const clientId = '';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain={domain}
    clientId={clientId}
    
    authorizationParams={
      {
        redirectUri:window.location.origin,
        audience:"http://localhost:5000"
      }
    }
    scope='openid profile email'
  >
    <App />
  </Auth0Provider>
  </React.StrictMode>
);


