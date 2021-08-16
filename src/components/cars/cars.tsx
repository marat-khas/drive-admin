import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import CarPlaceholder from '@assets/img/car_placeholder.jpg';
import { Filter } from '@components/filter';
import { Pagination } from '@components/pagination';
import { GetCarsAction } from '@state/cars/actions';
import { GetCategoriesAction } from '@state/categories/actions';
import { CarsFilterUpdateAction } from '@state/filter/actions';
import {
    getCars,
    getCarsCount,
    getCarsFilter,
    getCategories,
} from '@state/selectors';
import { queryString } from '@utils/query string';

export const Cars: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const pageCount = useSelector(getCarsCount);

    const categories = useSelector(getCategories);

    const cars = useSelector(getCars);
    const filter = useSelector(getCarsFilter);

    useEffect(() => {
        if (!cars) {
            dispatch(GetCarsAction(history, queryString(filter)));
        }
    }, [cars, dispatch, filter.limit, filter, history]);

    useEffect(() => {
        if (!categories) {
            dispatch(GetCategoriesAction(history));
        }
    }, [categories, dispatch, history]);

    const categoryFilter = categories
        ? {
              id: 2,
              options: [
                  {
                      label: 'Любая категория',
                      value: 'default',
                  },
                  ...categories.map((category) => ({
                      label: category.name,
                      value: category.id,
                  })),
              ],
              selectedValue: filter.categoryId,
              onChange: (id: string) => {
                  dispatch(
                      CarsFilterUpdateAction({
                          categoryId: id === 'default' ? null : id,
                      })
                  );
              },
          }
        : null;

    const filterItems = [];

    if (categoryFilter) {
        filterItems.push(categoryFilter);
    }

    const applyHandle = () => {
        const newFilter = {
            page: 0,
        };
        dispatch(CarsFilterUpdateAction(newFilter));
        dispatch(
            GetCarsAction(history, queryString({ ...filter, ...newFilter }))
        );
    };

    const clearHandle = () => {
        const newFilter = {
            page: 0,
            categoryId: null,
        };
        dispatch(CarsFilterUpdateAction(newFilter));
        dispatch(
            GetCarsAction(history, queryString({ ...filter, ...newFilter }))
        );
    };

    const changePage = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected;
        dispatch(
            CarsFilterUpdateAction({
                page: newPage,
            })
        );
        dispatch(
            GetCarsAction(
                history,
                queryString({
                    ...filter,
                    page: newPage,
                })
            )
        );
    };

    return (
        <div className='entities cars'>
            <div className='entities__filter'>
                <Filter
                    filterItems={filterItems}
                    applyHandle={applyHandle}
                    clearHandle={clearHandle}
                />
            </div>
            <div className='entities__body'>
                <div className='entities__table'>
                    <div className='entities__thead'>
                        <div className='entities__tr'>
                            <div className='entities__th'>Изображение</div>
                            <div className='entities__th'>Название</div>
                            <div className='entities__th'>Стоимость</div>
                            <div className='entities__th'>Категория</div>
                            <div className='entities__th'>Цвета</div>
                        </div>
                    </div>
                    <div className='entities__tbody'>
                        {cars ? (
                            cars.map((car) => (
                                <Link
                                    key={car.id}
                                    to={`/admin/car/${car.id}`}
                                    className='entities__tr entities__link'
                                >
                                    <div className='entities__td'>
                                        <img
                                            src={
                                                car.thumbnail?.path ||
                                                CarPlaceholder
                                            }
                                            alt={car.name}
                                        />
                                    </div>
                                    <div className='entities__td'>
                                        {car.name}
                                    </div>
                                    <div className='entities__td'>{`${car.priceMin} - ${car.priceMax} ₽`}</div>
                                    <div className='entities__td'>
                                        {car.categoryId?.name}
                                    </div>
                                    <div className='entities__td'>
                                        {car.colors.join(', ')}
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <>Загрузка автомобилей</>
                        )}
                    </div>
                </div>
            </div>
            <div className='entities__pagination'>
                {pageCount > filter.limit && (
                    <Pagination
                        pageCount={Math.ceil(pageCount / filter.limit)}
                        onPageChange={changePage}
                    />
                )}
            </div>
        </div>
    );
};
