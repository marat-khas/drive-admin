import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Logo from '@assets/img/logo.svg';
import { Nav } from '@components/nav';
import { ROUTES } from '@constants/routes';

import './admin.scss';

export const Admin: FC = () => (
    <div className='admin'>
        <div className='admin__wrapper'>
            <aside className='admin__sidebar'>
                <div className='admin-sidebar'>
                    <div className='admin-sidebar__head'>
                        <div className='admin-sidebar__logo'>
                            <Logo />
                        </div>
                        <div className='admin-sidebar__name'>Need for car</div>
                    </div>

                    <div className='admin-sidebar__nav'>
                        <Nav />
                    </div>
                </div>
            </aside>
            <div className='admin__main'>
                <header className='admin__head' />
                <main className='admin__body'>
                    <Switch>
                        <Route exact path={ROUTES.ORDERS}>
                            <div>Заказы</div>
                        </Route>
                        <Route path={ROUTES.CARS}>
                            <div>Список авто</div>
                        </Route>
                        <Route path={ROUTES.CARD}>
                            <div>Карточка автомобиля</div>
                        </Route>
                        <Route>
                            <div>500 Error</div>
                        </Route>
                    </Switch>
                </main>
                <footer className='admin__foot' />
            </div>
        </div>
        <aside />
    </div>
);
