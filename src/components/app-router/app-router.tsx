import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AuthRoute } from '@hocs/auth-route';
import { GuestRoute } from '@hocs/guest-route';
import { useAuth } from '@hooks/use-auth';
import { Admin } from '@pages/admin';
import { Error404 } from '@pages/error404';
import { Main } from '@pages/main';
import { UserCheckAction, UserRefreshAction } from '@state/user/actions';

export const AppRouter: FC = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    useEffect(() => {
        if (!auth) {
            if (accessToken) {
                dispatch(
                    UserCheckAction({
                        access_token: accessToken,
                    })
                );
            } else if (refreshToken) {
                dispatch(
                    UserRefreshAction({
                        refresh_token: refreshToken,
                    })
                );
            }
        }
    }, [auth, dispatch, accessToken, refreshToken]);

    return (
        <Switch>
            <GuestRoute path={ROUTES.MAIN} exact component={Main} auth={auth} />
            <AuthRoute path={ROUTES.ORDERS} component={Admin} auth={auth} />
            <Route component={Error404} />
        </Switch>
    );
};
