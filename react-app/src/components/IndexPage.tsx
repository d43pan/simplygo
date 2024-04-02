// components/IndexPage.tsx
import React, { useEffect, useState, useContext } from 'react';
import PathInput from './PathInput';
import { Link } from 'react-router-dom';
import { useTopTenRedirects } from '../hooks/useRedirects';

import { LoggerContext } from './LoggerContext';


const IndexPage: React.FC = () => {
    const redirects = useTopTenRedirects();
    const logger = useContext(LoggerContext);

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