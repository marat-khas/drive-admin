import { ElementType, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { ROUTES } from '@constants/routes';

interface AuthRouteProps extends Omit<RouteProps, 'component'> {
    component: ElementType;
    auth: boolean;
    redirectTo?: string;
}

export const AuthRoute: FC<AuthRouteProps> = ({
    component: Component,
    auth,
    redirectTo = ROUTES.MAIN,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            auth ? <Component {...props} /> : <Redirect to={redirectTo} />
        }
    />
);
