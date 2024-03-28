// components/IndexPage.tsx
import React, { useEffect, useState, useContext } from 'react';
import PathInput from './PathInput';
import { Link } from 'react-router-dom';
import { Redirect } from '../interfaces/Redirect';
import { LoggerContext } from './LoggerContext';




const IndexPage: React.FC = () => {
    const [redirects, setRedirects] = useState<Redirect[]>([]);
    const server_url = import.meta.env.VITE_APP_SERVER_URL;
    const logger = useContext(LoggerContext);
    useEffect(() => {
        fetch(`${server_url}/api/redirects?limit=10`)
            .then(response => response.json())
            .then(data => setRedirects(data))
            .catch(error => logger.error('Error:', error));
    }, []);

    return (
        <div>
            <PathInput />
            {redirects.map((redirect, index) => (
                <li key={index}>
                    { /* <a href={`/go/${redirect.path}`} target="_blank" >{redirect.path}</a> */}
                    <Link 
                    to={{ 
                        pathname: `/go/${redirect.path}`, 
                        state: { url: redirect.url } 
                    }} 
                    target="_blank"
                >
                    {redirect.path}
                </Link>
                </li>
            ))}
        </div>
    );
};

export default IndexPage;