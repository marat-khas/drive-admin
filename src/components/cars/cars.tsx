import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';

import CarPlaceholder from '@assets/img/car_placeholder.jpg';
import { Pagination } from '@components/pagination';
import { GetCarsAction } from '@state/cars/actions';
import { CarsFilterUpdateAction } from '@state/filter/actions';
import { getCars, getCarsCount, getCarsFilter } from '@state/selectors';
import { queryString } from '@utils/query string';

export const Cars: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const pageCount = useSelector(getCarsCount);

    const cars = useSelector(getCars);
    const filter = useSelector(getCarsFilter);
    const filterStr = queryString(filter);

    useEffect(() => {
        if (!cars || cars.length > filter.limit) {
            dispatch(GetCarsAction(history, filterStr));
        }
    }, [cars, dispatch, filter.limit, filterStr, history]);

    const changePage = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected + 1;
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
            <div className='entities__filter' />
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
                {pageCount > 1 && (
                    <Pagination
                        pageCount={
                            pageCount
                                ? Math.ceil(pageCount / filter.limit) - 1
                                : 0
                        }
                        onPageChange={changePage}
                    />
                )}
            </div>
        </div>
    );
};
