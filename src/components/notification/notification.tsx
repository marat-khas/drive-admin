import { FC } from 'react';

import NotificationIco from '@assets/img/ico_notification.svg';

import './notification.scss';

export const Notification: FC = () => (
    <div className='notification'>
        <div className='notification__ico'>
            <NotificationIco />
        </div>
        <div className='notification__counter'>2</div>
    </div>
);
