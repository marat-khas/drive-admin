import { FC, useEffect } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Filter } from '@components/filter';
import { OrdersItem } from '@components/orders/orders-item';
import { FilterUpdateAction } from '@state/filter/actions';
import { OrderGetAction } from '@state/order/actions';
import { getFilter, getOrders, getOrdersCount } from '@state/selectors';
import { queryString } from '@utils/query string';

import './orders.scss';

export const Orders: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const orders = useSelector(getOrders);
    const acessToken = localStorage.getItem('access_token');
    const filter = useSelector(getFilter);

    const pageCount = useSelector(getOrdersCount);
    const { limit } = useSelector(getFilter);

    const changePage = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected + 1;
        dispatch(
            FilterUpdateAction({
                page: newPage,
            })
        );
        if (acessToken) {
            dispatch(
                OrderGetAction(
                    {
                        access_token: acessToken,
                        filter: queryString({
                            ...filter,
                            page: newPage,
                        }),
                    },
                    history
                )
            );
        }
    };

    useEffect(() => {
        if (!orders && acessToken) {
            dispatch(
                OrderGetAction(
                    {
                        access_token: acessToken,
                        filter: queryString(filter),
                    },
                    history
                )
            );
        }
    }, [acessToken, dispatch, filter, history, orders]);

    return (
        <div className='orders'>
            <div className='orders__filter'>
                <Filter />
            </div>
            <div className='orders__items'>
                {orders ? (
                    orders.map((order) => (
                        <OrdersItem order={order} key={order.id} />
                    ))
                ) : (
                    <p>Загрузка заказов ...</p>
                )}
            </div>
            {pageCount > 1 ? (
                <div className='orders__pagination orders-pagination'>
                    <ReactPaginate
                        previousLabel='«'
                        nextLabel='»'
                        pageCount={Math.ceil(pageCount / limit)}
                        onPageChange={changePage}
                        containerClassName='orders-pagination__container'
                        pageClassName='orders-pagination__page'
                        previousClassName='orders-pagination__page orders-pagination__page--prev'
                        nextClassName='orders-pagination__page orders-pagination__page--next'
                        breakClassName='orders-pagination__page orders-pagination__page--break'
                        disabledClassName='isDisabled'
                        activeClassName='isActive'
                        pageRangeDisplayed={2}
                        marginPagesDisplayed={2}
                    />
                </div>
            ) : null}
        </div>
    );
};
