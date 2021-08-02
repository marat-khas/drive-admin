import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { ROUTES } from '@constants/routes';
import { Admin } from '@pages/admin';
import { Main } from '@pages/main';

export const AppRouter: FC = () => (
    <Switch>
        <Route path={ROUTES.MAIN} exact component={Main} />
        <Route path={ROUTES.ADMIN} component={Admin} />
    </Switch>
);
