import { FC } from 'react';
import { Link } from 'react-router-dom';

import './links-item.scss';

import { LinksItemProps } from './types';

export const LinksItem: FC<LinksItemProps> = ({ children, to }) => (
    <div className='links-item'>
        <Link to={to}>{children}</Link>
    </div>
);
