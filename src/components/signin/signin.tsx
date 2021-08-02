import { FC } from 'react';

import Logo from '@assets/img/logo.svg';
import { SigninForm } from '@components/signin/signin-form';

import './signin.scss';

export const Signin: FC = () => (
    <div className='signin'>
        <div className='signin__wrapper'>
            <div className='signin__head'>
                <div className='signin__logo'>
                    <Logo />
                </div>
                <div className='signin__title'>
                    <h1>Need for drive</h1>
                </div>
            </div>
            <div className='signin__body'>
                <div className='signin__subtitle'>Вход</div>
                <SigninForm />
            </div>
        </div>
    </div>
);
