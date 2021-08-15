import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import { AdminCard } from '@components/admin-card';
import { AdminCars } from '@components/admin-cars';
import { AdminOrders } from '@components/admin-orders';
import { Error } from '@components/error';
import { ROUTES } from '@constants/routes';

import './admin-body.scss';

export const AdminBody: FC = () => (
    <main className='admin__body'>
        <div className='admin__in'>
            <Switch>
                <Route exact path={ROUTES.ORDERS} component={AdminOrders} />
                <Route path={ROUTES.CARS} component={AdminCars} />
                <Route path={ROUTES.CARD} component={AdminCard} />
                <Route path={ROUTES.ERROR}>
                    <div className='admin__error'>
                        <Error
                            code='500'
                            title='Что то пошло не так'
                            desc='Попробуйте перезагрузить страницу'
                        />
                    </div>
                </Route>
            </Switch>
        </div>
    </main>
);
