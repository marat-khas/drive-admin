import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AuthRoute } from '@hocs/auth-route';
import { GuestRoute } from '@hocs/guest-route';
import { useAuth } from '@hooks/use-auth';
import { Admin } from '@pages/admin';
import { Main } from '@pages/main';
import { UserRefreshAction } from '@state/user/actions';

export const AppRouter: FC = () => {
    const dispatch = useDispatch();
    const auth = useAuth();
    const refreshToken = localStorage.getItem('refresh_token');

    useEffect(() => {
        if (refreshToken) {
            dispatch(
                UserRefreshAction({
                    refresh_token: refreshToken,
                })
            );
        }
    }, [dispatch, refreshToken]);

    return (
        <Switch>
            <GuestRoute path={ROUTES.MAIN} exact component={Main} auth={auth} />
            <AuthRoute path={ROUTES.ADMIN} component={Admin} auth={auth} />
        </Switch>
    );
};
