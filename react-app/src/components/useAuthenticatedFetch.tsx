import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;
const redirect_uri = import.meta.env.VITE_AUTH0_CALLBACK_URL;


export const useAuthenticatedFetch = (url) => {
    const { getAccessTokenSilently } = useAuth0();
    const [state, setState] = useState({ data: null, loading: true });

    useEffect(() => {
        (async () => {
            try {
                console.log("before gettokensilently")
                const token = await getAccessTokenSilently({
                    authorizationParams: {
                        redirect_uri : redirect_uri,
                        scope: 'openid profile email',
                      }
                }
 


                );
                
                console.log("before fetch")

                const res = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("before await")

                const data = await res.json();

                setState({ data, loading: false });
            } catch (error) {
                console.error(error);
                setState({ data: null, loading: false });
            }
        })();
    }, [getAccessTokenSilently, url]);

    return state;
};