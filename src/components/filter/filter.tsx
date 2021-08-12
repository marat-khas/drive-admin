import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import addMonths from 'date-fns/addMonths';
import addWeeks from 'date-fns/addWeeks';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';
import { ORDER_STATUS_ID } from '@constants/order-status-id';
import { GetCarsAction } from '@state/cars/actions';
import { GetCitiesAction } from '@state/cities/actions';
import { FilterUpdateAction } from '@state/filter/actions';
import { OrderGetAction } from '@state/order/actions';
import { getCars, getCities, getFilter } from '@state/selectors';
import { queryString } from '@utils/query string';

import './filter.scss';

export const Filter: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();

    const filter = useSelector(getFilter);

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
                FilterUpdateAction({
                    dateFrom: from === 'default' ? null : from,
                })
            );
        },
    };

    const cars = useSelector(getCars);

    useEffect(() => {
        if (!cars) {
            dispatch(GetCarsAction(history));
        }
    }, [cars, dispatch, history]);

    const carFilter = cars
        ? {
              id: 1,
              options: [
                  {
                      label: 'Любая модель',
                      value: 'default',
                  },
                  ...cars.map((car) => ({
                      label: car.name,
                      value: car.id,
                  })),
              ],
              selectedValue: filter.carId,
              onChange: (id: string) => {
                  dispatch(
                      FilterUpdateAction({
                          carId: id === 'default' ? null : id,
                      })
                  );
              },
          }
        : null;

    const cities = useSelector(getCities);

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
                      FilterUpdateAction({
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
                FilterUpdateAction({
                    orderStatusId: id === 'default' ? null : id,
                })
            );
        },
    };

    const filters = [dateFilter];
    if (carFilter) {
        filters.push(carFilter);
    }
    if (cityFilter) {
        filters.push(cityFilter);
    }
    filters.push(statusFilter);

    const acessToken = localStorage.getItem('access_token');

    const applyHandle = () => {
        if (acessToken) {
            dispatch(
                FilterUpdateAction({
                    page: 1,
                })
            );
            dispatch(
                OrderGetAction(
                    {
                        access_token: acessToken,
                        filter: queryString({ ...filter, page: 1 }),
                    },
                    history
                )
            );
        }
    };

    const clearHandle = () => {
        const newFilter = {
            page: 1,
            cityId: null,
            carId: null,
            dateFrom: null,
            orderStatusId: null,
        };
        dispatch(FilterUpdateAction(newFilter));
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

    return (
        <div className='filter'>
            <div className='filter__wrapper'>
                <div className='filter__part'>
                    <div className='filter__props'>
                        {filters.map(
                            ({ id, options, selectedValue, onChange }) => (
                                <div className='filter__item' key={id}>
                                    <Select
                                        options={options}
                                        selectedValue={selectedValue}
                                        onChange={(e) => {
                                            onChange(
                                                e.target.selectedOptions[0]
                                                    .value
                                            );
                                        }}
                                    />
                                </div>
                            )
                        )}
                    </div>
                </div>
                <div className='filter__part'>
                    <div className='filter__action'>
                        <div className='filter__btn'>
                            <Button bg='red' onClick={clearHandle}>
                                Сбросить
                            </Button>
                        </div>
                        <div className='filter__btn'>
                            <Button onClick={applyHandle}>Применить</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
