import { FC } from 'react';

import './search.scss';

export const Search: FC = () => (
    <div className='search'>
        <input type='search' placeholder='Поиск ...' />
    </div>
);
