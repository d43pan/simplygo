import { useEffect, useState } from 'react';

function App() {
  const [redirects, setRedirects] = useState([]);
  const server_url = import.meta.env.VITE_APP_SERVER_URL
  useEffect(() => {
    fetch(`${server_url}/api/redirects?limit=10`)
      .then(response => response.json())
      .then(data => setRedirects(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h1>Recent Redirects</h1>
      {redirects.map((redirect, index) => (
        <p key={index}>{redirect.path} &gt; {redirect.url}</p>
      ))}
    </div>
  );
}

export default App;