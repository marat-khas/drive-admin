import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { AuthRoute } from '@hocs/auth-route';
import { useAuth } from '@hooks/use-auth';
import { Admin } from '@pages/admin';
import { Main } from '@pages/main';

export const AppRouter: FC = () => {
    const auth = useAuth();
    return (
        <Switch>
            <Route path={ROUTES.MAIN} exact component={Main} />
            <AuthRoute path={ROUTES.ADMIN} component={Admin} auth={auth} />
        </Switch>
    );
};
