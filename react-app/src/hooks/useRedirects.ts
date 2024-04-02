import { useState, useEffect } from 'react';
import { Redirect } from '../interfaces/Redirect';

const server_url = import.meta.env.VITE_APP_SERVER_URL;

export const useTopTenRedirects = () => {
  const [redirects, setRedirects] = useState<Redirect[]>([]);

  useEffect(() => {
    fetch(`${server_url}/api/redirects?limit=10`)
      .then(response => response.json())
      .then(data => setRedirects(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return redirects;
};