import { FC, useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Filter } from '@components/filter';
import { OrdersItem } from '@components/orders/orders-item';
import { GetCategoriesAction } from '@state/categories/actions';
import { GetCitiesAction } from '@state/cities/actions';
import { OrderGetAction } from '@state/order/actions';
import { getCategories, getCities, getOrders } from '@state/selectors';

import './orders.scss';

export const Orders: FC = () => {
    const ORDERS_PER_PAGE = 10;

    const history = useHistory();
    const dispatch = useDispatch();

    const orders = useSelector(getOrders);
    const acessToken = localStorage.getItem('access_token');

    useEffect(() => {
        if (!orders && acessToken) {
            dispatch(
                OrderGetAction(
                    {
                        access_token: acessToken,
                    },
                    history
                )
            );
        }
    }, [acessToken, dispatch, history, orders]);

    const filterOrders = orders
        ? orders.filter((order) => {
              if (
                  selectedCity &&
                  selectedCity !== 'default' &&
                  order.cityId.id !== selectedCity
              ) {
                  return false;
              }
              if (
                  selectedCategory &&
                  selectedCategory !== 'default' &&
                  order.carId.categoryId?.id !== selectedCategory
              ) {
                  return false;
              }
              return true;
          })
        : null;

    const [pageNumber, setPageNumber] = useState(0);
    const [pageCount, setPageCount] = useState(0);

    const pagesVisited = pageNumber * ORDERS_PER_PAGE;

    const displayOrders = filterOrders ? (
        filterOrders
            .slice(pagesVisited, pagesVisited + ORDERS_PER_PAGE)
            .map((order) => <OrdersItem order={order} key={order.id} />)
    ) : (
        <p>Загрузка заказов ...</p>
    );

    useEffect(() => {
        setPageCount(Math.ceil((filterOrders?.length || 0) / ORDERS_PER_PAGE));
    }, [filterOrders]);

    const changePage = (selectedItem: { selected: number }) => {
        setPageNumber(selectedItem.selected);
    };

    return (
        <div className='orders'>
            <div className='orders__filter'>
                <Filter items={filters} />
            </div>
            <div className='orders__items'>{displayOrders}</div>
            {pageCount > 1 ? (
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
