import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './App';

import './index.css';
import { BrowserRouter } from 'react-router-dom';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_AUTH0_CALLBACK_URL;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>

    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri : redirect_uri,
        scope: 'openid profile email',
      }}

      
    >
      <App />
    </Auth0Provider>
    </BrowserRouter>
  </React.StrictMode>
);