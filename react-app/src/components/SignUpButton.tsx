import { useAuth0 } from '@auth0/auth0-react';

export const SignUpButton = () => {
    const { loginWithRedirect } = useAuth0();

    const handleLogin = async() => {
        await loginWithRedirect({
            appState: {
                returnTo: "/u/account",
            },
            authorizationParams: {
                screen_hint: "signup",
            },
        });
    };

    return (
        <button onClick={() => handleLogin()}>
            Sign Up
        </button>
    )
};

export default SignUpButton;