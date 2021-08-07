import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import userAvatar from '@assets/img/user_avatar.jpg';
import { getUser } from '@state/selectors';
import { UserLogoutAction } from '@state/user/actions';

import './user.scss';

export const User: FC = () => {
    const dispatch = useDispatch();

    const user = useSelector(getUser);

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
                <span>{user ? user.username : 'Admin'}</span>
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
