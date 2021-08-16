import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { addMonths, addWeeks } from 'date-fns';
import Cookies from 'js-cookie';

import { Filter } from '@components/filter';
import { OrdersItem } from '@components/orders/orders-item';
import { Pagination } from '@components/pagination';
import { ORDER_STATUS_ID } from '@constants/order-status-id';
import { GetCitiesAction } from '@state/cities/actions';
import { OrdersFilterUpdateAction } from '@state/filter/actions';
import { GetModelsAction } from '@state/models/actions';
import { OrderGetAction } from '@state/order/actions';
import {
    getCities,
    getModels,
    getOrders,
    getOrdersCount,
    getOrdersFilter,
} from '@state/selectors';
import { queryString } from '@utils/query string';

export const Orders: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const filter = useSelector(getOrdersFilter);
    const models = useSelector(getModels);
    const cities = useSelector(getCities);
    const orders = useSelector(getOrders);
    const pageCount = useSelector(getOrdersCount);

    const acessToken = Cookies.get('access_token');

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

    const dateFilter = {
        id: 0,
        options: [
            {
                label: 'За все время',
                value: 'delault',
            },
            {
                label: 'За неделю',
                value: addWeeks(new Date(), -1).getTime().toString(),
            },
            {
                label: 'За месяц',
                value: addMonths(new Date(), -1).getTime().toString(),
            },
        ],
        selectedValue: filter.cityId,
        onChange: (from: string) => {
            dispatch(
                OrdersFilterUpdateAction({
                    dateFrom: from === 'default' ? null : from,
                })
            );
        },
    };

    useEffect(() => {
        if (!models) {
            dispatch(GetModelsAction(history));
        }
    }, [dispatch, history, models]);

    const modelFilter = models
        ? {
              id: 1,
              options: [
                  {
                      label: 'Любая модель',
                      value: 'default',
                  },
                  ...models.map((model) => ({
                      label: model.name,
                      value: model.id,
                  })),
              ],
              selectedValue: filter.carId,
              onChange: (id: string) => {
                  dispatch(
                      OrdersFilterUpdateAction({
                          carId: id === 'default' ? null : id,
                      })
                  );
              },
          }
        : null;

    useEffect(() => {
        if (!cities) {
            dispatch(GetCitiesAction(history));
        }
    }, [cities, dispatch, history]);

    const cityFilter = cities
        ? {
              id: 2,
              options: [
                  {
                      label: 'Любой город',
                      value: 'default',
                  },
                  ...cities.map((city) => ({
                      label: city.name,
                      value: city.id,
                  })),
              ],
              selectedValue: filter.cityId,
              onChange: (id: string) => {
                  dispatch(
                      OrdersFilterUpdateAction({
                          cityId: id === 'default' ? null : id,
                      })
                  );
              },
          }
        : null;

    const statusFilter = {
        id: 3,
        options: [
            {
                label: 'Любой статус',
                value: 'default',
            },
            {
                label: 'Новый',
                value: ORDER_STATUS_ID.NEW,
            },
            {
                label: 'Подтвержден',
                value: ORDER_STATUS_ID.CONFIRM,
            },
            {
                label: 'Отменен',
                value: ORDER_STATUS_ID.CANCEL,
            },
        ],
        selectedValue: filter.cityId,
        onChange: (id: string) => {
            dispatch(
                OrdersFilterUpdateAction({
                    orderStatusId: id === 'default' ? null : id,
                })
            );
        },
    };

    const filterItems = [dateFilter];
    if (modelFilter) {
        filterItems.push(modelFilter);
    }
    if (cityFilter) {
        filterItems.push(cityFilter);
    }
    filterItems.push(statusFilter);

    const applyHandle = () => {
        if (acessToken) {
            const newFilter = {
                page: 0,
            };
            dispatch(OrdersFilterUpdateAction(newFilter));
            dispatch(
                OrderGetAction(
                    {
                        access_token: acessToken,
                        filter: queryString({ ...filter, ...newFilter }),
                    },
                    history
                )
            );
        }
    };

    const clearHandle = () => {
        const newFilter = {
            page: 0,
            cityId: null,
            carId: null,
            dateFrom: null,
            orderStatusId: null,
        };
        dispatch(OrdersFilterUpdateAction(newFilter));
        if (acessToken) {
            dispatch(
                OrderGetAction(
                    {
                        access_token: acessToken,
                        filter: queryString({
                            ...filter,
                            ...newFilter,
                        }),
                    },
                    history
                )
            );
        }
    };

    const changePage = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected;
        dispatch(
            OrdersFilterUpdateAction({
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

    return (
        <div className='entities orders'>
            <div className='entities__filter'>
                <Filter
                    filterItems={filterItems}
                    applyHandle={applyHandle}
                    clearHandle={clearHandle}
                />
            </div>
            <div className='entities__items'>
                {orders ? (
                    orders.map((order) => (
                        <OrdersItem order={order} key={order.id} />
                    ))
                ) : (
                    <p>Загрузка заказов ...</p>
                )}
            </div>
            {pageCount > filter.limit && (
                <Pagination
                    pageCount={Math.ceil(pageCount / filter.limit)}
                    onPageChange={changePage}
                />
            )}
        </div>
    );
};
