import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoadingDots from './LoadingDots';
import { useNavigate } from 'react-router-dom';
//import { useFullUserAccount } from '../hooks/useUsers';

const Account = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
   // const fullUserAccount = useFullUserAccount(user?.sub); // Pass the user's ID to the useFullUserAccount hook

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/'); // Redirect to the login page if the user is not authenticated
        }
    }, [isLoading, isAuthenticated, navigate]);

    if (isLoading) {
        return <LoadingDots />;
    }

    return (
        <div>
            <h3>User: </h3>
            {JSON.stringify(user, null, 2)}
          {/*}  {fullUserAccount ? ( // Use the fullUserAccount data
                <>
                    <h2>{fullUserAccount.name}</h2>
                    <img src={fullUserAccount.picture} />
                    {JSON.stringify(fullUserAccount, null, 2)}
                </>
            ) : (
                'No user found'
            )}

            */}
        </div>
    );
};

export default Account;