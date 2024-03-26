import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const GoHome: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect the user to "/"
        navigate('/');
    }, [navigate]); // Add navigate to the dependency array

    return null;
};

export default GoHome;