import { FC } from 'react';

import { Filter } from '@components/filter';
import { OrdersItem } from '@components/orders/orders-item';

import './orders.scss';

const filterItems = [
    {
        id: 0,
        options: [
            {
                label: 'Сегодня',
                value: 'today',
            },
            {
                label: 'За неделю',
                value: 'week',
            },
            {
                label: 'За месяц',
                value: 'month',
            },
        ],
        onChange: () => {
            console.log('Изменилась дата');
        },
    },
    {
        id: 1,
        options: [
            {
                label: 'Ульяновск',
                value: 'uln',
            },
            {
                label: 'Саранск',
                value: 'sar',
            },
            {
                label: 'Самара',
                value: 'sam',
            },
        ],
        onChange: () => {
            console.log('Изменился город');
        },
    },
];

export const Orders: FC = () => (
    <div className='orders'>
        <div className='orders__filter'>
            <Filter items={filterItems} />
        </div>
        <div className='orders__items'>
            <OrdersItem />
        </div>
        <div className='orders__pagination' />
    </div>
);
