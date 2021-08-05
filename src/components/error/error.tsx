import { FC } from 'react';
import { Link } from 'react-router-dom';

import { ROUTES } from '@constants/routes';

import './error.scss';

import { ErrorProps } from './types';

export const Error: FC<ErrorProps> = ({ code, title, desc }) => (
    <div className='error'>
        <div className='error__code'>{code}</div>
        <div className='error__title'>{title}</div>
        <div className='error__desc'>{desc}</div>
        <div className='error__btn'>
            <Link to={ROUTES.MAIN} className='button'>
                Назад
            </Link>
        </div>
    </div>
);
