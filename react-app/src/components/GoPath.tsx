import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import CreateRedirect from './CreateRedirect';
import LoadingDots from './LoadingDots';
import { LoggerContext } from './LoggerContext';


const GoPath: React.FC = () => {
        const { path } = useParams();
        const location = useLocation<{ url?: string }>();
        const [url, setUrl] = useState(location.state?.url || null);
        const [loading, setLoading] = useState(true); // Set initial loading state to true

        const server_url = import.meta.env.VITE_APP_SERVER_URL;
        const navigate = useNavigate();
        const logger = useContext(LoggerContext);



        useEffect(() => {
                if (url) {
                        window.location.href = url;
                }
                setLoading(true);
                if (!path) {
                navigate('/');
                } else {
                        setLoading(true); // Set loading to true before making the fetch request
                        fetch(`${server_url}/api/redirects/${path}`)
                            .then(response => response.json())
                            .then(data => {
                                if (data.url) {
                                    setUrl(data.url);
                                } else {
                                    setLoading(false); // Stop loading if path doesn't exist in the database
                                }
                            })
                            .catch(error => {
                                logger.error('Error:', error);
                                setLoading(false);
                            });
                }
        }, [path, navigate, server_url, url]);

return loading ? <LoadingDots /> : (
    url ? null : (
        <div>
            <div>What should <strong>{path}</strong> redirect to?</div>
            <CreateRedirect />
        </div>
    )
);
};

export default GoPath;