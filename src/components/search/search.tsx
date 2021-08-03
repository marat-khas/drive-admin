import { FC } from 'react';

import './search.scss';

export const Search: FC = () => (
    <div className='search'>
        <input type='text' placeholder='Поиск ...' />
    </div>
);
