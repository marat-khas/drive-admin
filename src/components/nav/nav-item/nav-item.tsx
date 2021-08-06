import { FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

import './nav-item.scss';

import { NavItemProps } from './types';

export const NavItem: FC<NavItemProps> = ({
    children,
    to,
    ico: Ico,
    clickHandle,
}) => {
    const { pathname } = useLocation();
    const classes = classNames('nav-item', {
        isActive: pathname === to,
    });
    return (
        <li className={classes}>
            <Link to={to} className='nav-item__link' onClick={clickHandle}>
                <div className='nav-item__ico'>
                    <Ico />
                </div>
                <div className='nav-item__label'>{children}</div>
            </Link>
        </li>
    );
};
