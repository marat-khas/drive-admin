import { FC } from 'react';

import userAvatar from '@assets/img/user_avatar.jpg';

import './user.scss';

export const User: FC = () => (
    <div className='user'>
        <div className='user__avatar'>
            <img src={userAvatar} alt='Avatar' />
        </div>
        <div className='user__login'>
            <span>Admin</span>
        </div>
    </div>
);
