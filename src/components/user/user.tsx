import { FC } from 'react';
import { useDispatch } from 'react-redux';

import userAvatar from '@assets/img/user_avatar.jpg';
import { UserLogoutAction } from '@state/user/actions';

import './user.scss';

export const User: FC = () => {
    const dispatch = useDispatch();

    const accessToken = localStorage.getItem('access_token');

    const exitHandle = () => {
        if (accessToken) {
            dispatch(UserLogoutAction({ access_token: accessToken }));
        }
    };

    return (
        <div className='user'>
            <div className='user__avatar'>
                <img src={userAvatar} alt='Avatar' />
            </div>
            <div className='user__login'>
                <span>Admin</span>
            </div>
            <div className='user__dropdown'>
                <div className='user__nav'>
                    <ul>
                        <li>
                            <a href='/' onClick={exitHandle}>
                                Выйти
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};
