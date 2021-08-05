import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Filter } from '@components/filter';
import { OrdersItem } from '@components/orders/orders-item';
import { OrderGetAction } from '@state/order/actions';
import { getOrders } from '@state/selectors';

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

export const Orders: FC = () => {
    const dispatch = useDispatch();

    const orders = useSelector(getOrders);
    const acessToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (!orders && acessToken) {
            dispatch(
                OrderGetAction({
                    access_token: acessToken,
                })
            );
        }
    }, [acessToken, dispatch, orders]);

    return (
        <div className='orders'>
            <div className='orders__filter'>
                <Filter items={filterItems} />
            </div>
            <div className='orders__items'>
                {orders ? (
                    orders?.map((order) => (
                        <OrdersItem order={order} key={order.id} />
                    ))
                ) : (
                    <p>Загрузка заказов ...</p>
                )}
            </div>
            <div className='orders__pagination' />
        </div>
    );
};
