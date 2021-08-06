import { FC } from 'react';

import MenuIco3 from '@assets/img/ico_add.svg';
import MenuIco1 from '@assets/img/ico_edit.svg';
import MenuIco2 from '@assets/img/ico_list.svg';
import { NavItem } from '@components/nav/nav-item/nav-item';
import { ROUTES } from '@constants/routes';

import { NavProps } from './types';

export const Nav: FC<NavProps> = ({ itemClickHandle }) => {
    const items = [
        {
            id: 0,
            ico: MenuIco3,
            label: 'Заказы',
            to: ROUTES.ORDERS,
        },
        {
            id: 1,
            ico: MenuIco2,
            label: 'Список авто',
            to: ROUTES.CARS,
        },
        {
            id: 2,
            ico: MenuIco1,
            label: 'Карточка автомобиля',
            to: ROUTES.CARD,
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
