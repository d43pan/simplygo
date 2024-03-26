import { useState, useContext } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LoggerContext } from './LoggerContext';

const CreateRedirect: React.FC = () => {
    const [url, setUrl] = useState('');
    const [errorType, setErrorType] = useState<string | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const server_url = import.meta.env.VITE_APP_SERVER_URL;
    const logger = useContext(LoggerContext);
    const { path } = useParams(); // Get the path from the route parameters

    const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newUrl = e.target.value;
        setUrl(newUrl);
        isValidUrl(newUrl); // Validate the new URL
    };

    const isValidUrl = (string: string) => {
        try {
            new URL(string);
            const tldPattern = /\.[a-z]{2,}$/i; // Regular expression to check for TLD
            if (!tldPattern.test(string)) {
                setErrorType('missingTld');
                return false;
            }
            logger.info('valid url:', string)
            setErrorType(null); // Clear the error type if the URL is valid
            return true;
        } catch (_) {
            logger.info('not valid url: ', string)
            if (!string.startsWith('http://') && !string.startsWith('https://')) {
                setErrorType('missingProtocol');
            } else {
                setErrorType('invalidUrl');
            }
            return false;  
        }
    }

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (location.pathname.startsWith('/go/') && (!url || !isValidUrl(url))) {
            return;
        }

        // ... rest of the code
    };

    const getErrorMessage = () => {
        switch (errorType) {
            case 'missingProtocol':
                return (
                    <span>
                        ⚠️  &nbsp;&nbsp;<a href="#" onClick={() => {
                            const newUrl = 'http://' + url;
                            setUrl(newUrl);
                            isValidUrl(newUrl); // Validate the new URL
                        }}>Add "http"</a>
                    </span>
                );
            case 'invalidUrl':
                return 'Please enter a valid URL';
            case 'missingTld':
                return 'URL must include a top-level domain (e.g., .com, .net, .org)';
            default:
                return null;
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            {errorType && <div>{getErrorMessage()}</div>}
            {location.pathname.startsWith('/go/') && (
                <label>
                    URL:
                    <input type="text" value={url} onChange={handleUrlChange} />
                </label>
            )}
            <button type="submit">go</button>
        </form>
    );
};

export default CreateRedirect;