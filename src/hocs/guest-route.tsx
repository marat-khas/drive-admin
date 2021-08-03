import { ElementType, FC } from 'react';
import { Redirect, Route, RouteProps } from 'react-router';

import { ROUTES } from '@constants/routes';

interface GuestRouteProps extends Omit<RouteProps, 'component'> {
    component: ElementType;
    auth: boolean;
    redirectTo?: string;
}

export const GuestRoute: FC<GuestRouteProps> = ({
    component: Component,
    auth,
    redirectTo = ROUTES.ORDERS,
    ...rest
}) => (
    <Route
        {...rest}
        render={(props) =>
            auth ? <Redirect to={redirectTo} /> : <Component {...props} />
        }
    />
);
