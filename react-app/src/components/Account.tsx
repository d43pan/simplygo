import { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingDots from './LoadingDots';
import { useNavigate } from 'react-router-dom';

const Account = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login'); // Redirect to the login page if the user is not authenticated
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        return <LoadingDots />;
    }

    return (
        <div>
            <h3>User:  </h3>
            
            {user ? (
                <pre>{JSON.stringify(user, null, 2)}</pre>
            ) : (
                'No user found'
            )}
        </div>
    );
};

export default Account;