
//import { useAuth0 } from '@auth0/auth0-react';
import { useAuthenticatedFetch } from './useAuthenticatedFetch';
import LoadingDots from './LoadingDots';

const Account = () => {
    
    //const { user, isAuthenticated, isLoading } = useAuth0();

    const { data: userMetadata, loading } = useAuthenticatedFetch(`http://${import.meta.env.VITE_APP_SERVER_URL}/api/user/account`);

    if (loading) {
        return < LoadingDots />;
    }

    return (
        <div>
            <h3>User:  </h3>
            
            {userMetadata ? (
                <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
            ) : (
                'No user found'
            )}
        </div>
    );
};

export default Account;