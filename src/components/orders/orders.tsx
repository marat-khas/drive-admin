import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
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
    const ORDERS_PER_PAGE = 5;

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

    const [pageNumber, setPageNumber] = useState(0);

    const pagesVisited = pageNumber * ORDERS_PER_PAGE;

    console.log(orders);
    const displayOrders = orders ? (
        orders
            .slice(pagesVisited, pagesVisited + ORDERS_PER_PAGE)
            .map((order) => <OrdersItem order={order} key={order.id} />)
    ) : (
        <p>Загрузка заказов ...</p>
    );

    const pageCount = Math.ceil((orders?.length || 0) / ORDERS_PER_PAGE);

    const changePage = (selectedItem: { selected: number }) => {
        setPageNumber(selectedItem.selected);
    };

    return (
        <div className='orders'>
            <div className='orders__filter'>
                <Filter items={filterItems} />
            </div>
            <div className='orders__items'>{displayOrders}</div>
            <div className='orders__pagination orders-pagination'>
                <ReactPaginate
                    previousLabel='«'
                    nextLabel='»'
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName='orders-pagination__container'
                    pageClassName='orders-pagination__page'
                    previousClassName='orders-pagination__page orders-pagination__page--prev'
                    nextClassName='orders-pagination__page orders-pagination__page--next'
                    breakClassName='orders-pagination__page orders-pagination__page--break'
                    activeClassName='isActive'
                    pageRangeDisplayed={2}
                    marginPagesDisplayed={2}
                />
            </div>
        </div>
    );
};
