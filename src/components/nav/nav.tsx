import { FC } from 'react';

import MenuIco0 from '@assets/img/ico_add.svg';
import MenuIco1 from '@assets/img/ico_list.svg';
import { NavItem } from '@components/nav/nav-item/nav-item';
import { ROUTES } from '@constants/routes';

import { NavProps } from './types';

export const Nav: FC<NavProps> = ({ itemClickHandle }) => {
    const items = [
        {
            id: 0,
            ico: MenuIco0,
            label: 'Заказы',
            to: ROUTES.ORDERS,
        },
        {
            id: 1,
            ico: MenuIco1,
            label: 'Автомобили',
            to: ROUTES.CARS,
        },
        {
            id: 2,
            ico: MenuIco1,
            label: 'Офисы',
            to: ROUTES.POINTS,
        },
    ];
    return (
        <nav className='nav'>
            <ul>
                {items.map(({ id, ico, label, to }) => (
                    <NavItem
                        key={id}
                        to={to}
                        ico={ico}
                        clickHandle={itemClickHandle}
                    >
                        {label}
                    </NavItem>
                ))}
            </ul>
        </nav>
    );
};
