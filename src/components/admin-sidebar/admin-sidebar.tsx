import { FC, useState } from 'react';
import classNames from 'classnames';

import Logo from '@assets/img/logo.svg';
import { Nav } from '@components/nav';

import './admin-sidebar.scss';

export const AdminSidebar: FC = () => {
    const [navOpen, setNavOpen] = useState(false);
    const navClasses = classNames('admin-sidebar__nav', {
        isOpen: navOpen,
    });
    return (
        <aside className='admin__sidebar'>
            <div className='admin-sidebar'>
                <header className='admin-sidebar__head'>
                    <div className='admin-sidebar__logo'>
                        <Logo />
                    </div>
                    <div className='admin-sidebar__name'>Need for car</div>
                </header>
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
    );
};
