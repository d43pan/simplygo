import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import SignUpButton from './SignUpButton';

const AuthenticationButton: React.FC = () => {
    const { isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
      <div>
        {!isAuthenticated && (
            <>
              <SignUpButton />
              <LoginButton />
            </>
          )}
          {isAuthenticated && (
            <>
              <LogoutButton />
            </>
          )}
     </div>
    );
};

export default AuthenticationButton;