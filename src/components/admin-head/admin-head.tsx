import { FC } from 'react';

import { Notification } from '@components/notification';
import { Search } from '@components/search';
import { User } from '@components/user';

export const AdminHead: FC = () => (
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
);
