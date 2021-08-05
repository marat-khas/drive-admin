import { FC } from 'react';

import { Error } from '@components/error';

export const Error404: FC = () => (
    <div className='app__error'>
        <Error
            code='404'
            title='Что то пошло не так'
            desc='Страница не найдена'
        />
    </div>
);
