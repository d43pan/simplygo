import { withAuthenticationRequired, WithAuthenticationRequiredOptions } from "@auth0/auth0-react";
import React, { ComponentType } from "react";
import  LoadingDots  from "./LoadingDots";

interface AuthenticationGuardProps {
    component: ComponentType;
}

export const AuthenticationGuard: React.FC<AuthenticationGuardProps> = ({ component }) => {
    const options: WithAuthenticationRequiredOptions = {
        onRedirecting: () => (
            <div className="page-layout">
                <LoadingDots />
            </div>
        ),
    };

    const Component = withAuthenticationRequired(component, options);

    return <Component />;
};