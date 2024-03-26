import  { useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';

export const Login = () => {
  const { loginWithRedirect } = useAuth0();

  useEffect(() => {
    loginWithRedirect();
  }, [loginWithRedirect]);

  return null; // This component doesn't render anything
};

export default Login;