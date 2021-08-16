import { FC } from 'react';

import './links.scss';

import { LinksItem } from './links-item';

const linkList = [
    {
        id: 0,
        to: '/',
        label: 'Ссылка 1',
    },
    {
        id: 1,
        to: '/',
        label: 'Ссылка 2',
    },
    {
        id: 2,
        to: '/',
        label: 'Ссылка 3',
    },
];

export const Links: FC = () => (
    <div className='links'>
        <div className='links__wrapper'>
            {linkList.map(({ id, to, label }) => (
                <div className='links__item' key={id}>
                    <LinksItem to={to}>{label}</LinksItem>
                </div>
            ))}
        </div>
    </div>
);
