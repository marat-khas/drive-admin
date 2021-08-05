import { FC } from 'react';
import { Route, Switch } from 'react-router-dom';

import Logo from '@assets/img/logo.svg';
import { Links } from '@components/links/links';
import { Nav } from '@components/nav';
import { Notification } from '@components/notification';
import { Orders } from '@components/orders';
import { Search } from '@components/search';
import { User } from '@components/user';
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
                <header className='admin__head'>
                    <div className='admin-head'>
                        <div className='admin-head__item admin-head__item--search'>
                            <Search />
                        </div>
                        <div className='admin-head__item admin-head__item--notification'>
                            <Notification />
                        </div>
                        <div className='admin-head__item admin-head__item--user'>
                            <User />
                        </div>
                    </div>
                </header>
                <main className='admin__body'>
                    <div className='admin__in'>
                        <Switch>
                            <Route exact path={ROUTES.ORDERS}>
                                <div className='admin__title'>
                                    <h1>Заказы</h1>
                                </div>
                                <div className='admin__row'>
                                    <div className='admin__col'>
                                        <div className='admin__wrap'>
                                            <Orders />
                                        </div>
                                    </div>
                                </div>
                            </Route>
                            <Route path={ROUTES.CARS}>
                                <div className='admin__title'>
                                    <h1>Entities</h1>
                                </div>
                                <div className='admin__row'>
                                    <div className='admin__col'>
                                        <div className='admin__wrap'>
                                            [Список авто]
                                        </div>
                                    </div>
                                </div>
                            </Route>
                            <Route path={ROUTES.CARD}>
                                <div className='admin__title'>
                                    <h1>Карточка автомобиля</h1>
                                </div>
                                <div className='admin__row'>
                                    <div className='admin__col admin__col--card'>
                                        <div className='admin__wrap'>
                                            [Автомобиль]
                                        </div>
                                    </div>
                                    <div className='admin__col'>
                                        <div className='admin__wrap'>
                                            [Настройки]
                                        </div>
                                    </div>
                                </div>
                            </Route>
                            <Route>
                                <div>500 Error</div>
                            </Route>
                        </Switch>
                    </div>
                </main>
                <footer className='admin__foot'>
                    <div className='admin-foot'>
                        <div className='admin-foot__item'>
                            <Links />
                        </div>
                        <div className='admin-foot__item'>
                            <div className='admin-copyright'>
                                Copyright © 2020 Simbirsoft
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
        <aside />
    </div>
);
