import { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { User } from '../interfaces/User';

const server_url = import.meta.env.VITE_APP_SERVER_URL;

export const useUsers = () => {
  const [user, setUser] = useState<User>();
  const { getAccessTokenSilently, user: auth0User } = useAuth0();

  useEffect(() => {
    const fetchUserAccount = async () => {
      try {
        const token = await getAccessTokenSilently();
        const response = await fetch(`${server_url}/api/users/account`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

 
  }, [getAccessTokenSilently]);

  const createOrUpdateUser = async (token: any) => {
    console.log('createOrUpdateUser - auth0User: ', auth0User)
    try {
      const requestData = {
        auth0_sub: auth0User?.sub,
        email: auth0User?.email,
        // Add any other user properties you need
      };
      const response = await fetch(`${server_url}/api/users/createOrUpdate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestData),
      });

      console.log('Response status:', response.status);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

  
      const data = await response.json();

      setUser(data);

      return data;
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return { user, createOrUpdateUser };
};