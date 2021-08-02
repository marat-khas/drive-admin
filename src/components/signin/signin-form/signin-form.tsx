import { FC } from 'react';

import { Button } from '@components/common/button';
import { Input } from '@components/common/input/input';

import './signin-form.scss';

export const SigninForm: FC = () => {
    const fields = [
        {
            id: 'signin-email',
            type: 'email',
            label: 'Почта',
        },
        {
            id: 'signin-password',
            type: 'password',
            label: 'Пароль',
        },
    ];
    return (
        <div className='signin-form'>
            {fields.map(({ id, type, label }) => (
                <div className='signin-form__item' key={id}>
                    <Input id={id} type={type} label={label} />
                </div>
            ))}
            <div className='signin-form__foot'>
                <div className='signin-form__access'>
                    <a href='/'>Запросить доступ</a>
                </div>
                <div className='signin-form__submit'>
                    <Button>Войти</Button>
                </div>
            </div>
        </div>
    );
};
