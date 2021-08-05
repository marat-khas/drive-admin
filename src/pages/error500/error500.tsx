import { FC } from 'react';

import { Error } from '@components/error';

import './error500.scss';

export const Error500: FC = () => (
    <div className='error500'>
        <Error
            code='500'
            title='Что то пошло не так'
            desc='Попробуйте перезагрузить страницу'
        />
    </div>
);
