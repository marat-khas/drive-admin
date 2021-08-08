import { FC, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import Logo from '@assets/img/logo.svg';
import { CarCard } from '@components/car-card';
import { CarSettings } from '@components/car-settings';
import { Error } from '@components/error';
import { Links } from '@components/links/links';
import { Nav } from '@components/nav';
import { Notification } from '@components/notification';
import { Orders } from '@components/orders';
import { Search } from '@components/search';
import { User } from '@components/user';
import { ROUTES } from '@constants/routes';

import './admin.scss';

export const Admin: FC = () => {
    const [navOpen, setNavOpen] = useState(false);
    const navClasses = classNames('admin-sidebar__nav', {
        isOpen: navOpen,
    });

    return (
        <div className='admin'>
            <div className='admin__wrapper'>
                <aside className='admin__sidebar'>
                    <div className='admin-sidebar'>
                        <div className='admin-sidebar__head'>
                            <div className='admin-sidebar__logo'>
                                <Logo />
                            </div>
                            <div className='admin-sidebar__name'>
                                Need for car
                            </div>
                        </div>
                        <div className={navClasses}>
                            <Nav
                                itemClickHandle={() => {
                                    setNavOpen(false);
                                }}
                            />
                        </div>
                        <button
                            className='admin-sidebar__close'
                            onClick={() => setNavOpen(!navOpen)}
                            type='button'
                        >
                            <span />
                        </button>
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
                                    <div className='admin__container'>
                                        <div className='admin__row'>
                                            <div className='admin__col'>
                                                <div className='admin__wrap'>
                                                    <Orders />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Route>
                                <Route path={ROUTES.CARS}>
                                    <div className='admin__title'>
                                        <h1>Entities</h1>
                                    </div>
                                    <div className='admin__container'>
                                        <div className='admin__row'>
                                            <div className='admin__col'>
                                                <div className='admin__wrap'>
                                                    [Список авто]
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Route>
                                <Route path={ROUTES.CARD}>
                                    <div className='admin__title'>
                                        <h1>Карточка автомобиля</h1>
                                    </div>
                                    <div className='admin__container'>
                                        <div className='admin__row'>
                                            <div className='admin__col admin__col--card'>
                                                <div className='admin__wrap'>
                                                    <CarCard />
                                                </div>
                                            </div>
                                            <div className='admin__col admin__col--settings'>
                                                <div className='admin__wrap'>
                                                    <div className='admin__subtitle'>
                                                        <h2>
                                                            Настройки автомобиля
                                                        </h2>
                                                    </div>
                                                    <CarSettings />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Route>
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
                    <footer className='admin__foot'>
                        <div className='admin-foot'>
                            <div className='admin-foot__item'>
                                <Links />
                            </div>
                            <div className='admin-foot__item'>
                                <div className='admin-copyright'>
                                    Copyright © 2021 Simbirsoft
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
            <aside />
        </div>
    );
};
