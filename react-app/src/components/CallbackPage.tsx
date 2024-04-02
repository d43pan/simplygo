import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

import { useNavigate } from 'react-router-dom';
import LoadingDots from './LoadingDots';
import { useUsers } from '../hooks/useUsers';


const CallbackPage = () => {
    const { user, handleRedirectCallback, getAccessTokenSilently } = useAuth0();
    const { createOrUpdateUser } = useUsers();
    const [auth0User, setUser]= useState(false);
    let token;
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const server_url = import.meta.env.VITE_APP_SERVER_URL;
/*
    useEffect( () => {
        const processCallback = async () => {
            try {
                await handleRedirectCallback();
                token = await getAccessTokenSilently();
            } catch (error ) {
                console.log("error processing callback: ", error)
            }
        }

        const processUser = async (u: any, t: any) => {
            try {
            await createOrUpdateUser(u, t);
            } catch (error) {
                console.error("Error processing the user in callback: ", error)
            }
        }


        processCallback();
        processUser(user, token);
        setLoading(false);
        navigate("/");
        

    }, [handleRedirectCallback, createOrUpdateUser, getAccessTokenSilently]);

    if (loading){
        <LoadingDots />
    }
        */

    useEffect(() => {
        (async () => {
          try {
            const token = await getAccessTokenSilently({});
            const response = await createOrUpdateUser(token);
            setUser(response);
            navigate('/');
          } catch (e) {
            console.error(e);
          }
        })();
      }, [getAccessTokenSilently, createOrUpdateUser]);

    return (
        <div>
            {auth0User}
        </div>
    );
};

export default CallbackPage;