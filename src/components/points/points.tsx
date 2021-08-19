import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Filter } from '@components/filter';
import { Pagination } from '@components/pagination';
import { GetCitiesAction } from '@state/cities/actions';
import { PointsFilterUpdateAction } from '@state/filter/actions';
import { GetPointsAction } from '@state/points/actions';
import {
    getCities,
    getPoints,
    getPointsCount,
    getPointsFilter,
} from '@state/selectors';
import { queryString } from '@utils/query string';

export const Points: FC = () => {
    const dispatch = useDispatch();
    const history = useHistory();

    const pageCount = useSelector(getPointsCount);

    const points = useSelector(getPoints);
    const filter = useSelector(getPointsFilter);
    const cities = useSelector(getCities);

    useEffect(() => {
        if (!points) {
            dispatch(GetPointsAction(history));
        }
    }, [points]);

    useEffect(() => {
        if (!cities) {
            dispatch(GetCitiesAction(history));
        }
    }, [cities]);

    const cityFilter = cities
        ? {
              id: 0,
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
                      PointsFilterUpdateAction({
                          cityId: id === 'default' ? null : id,
                      })
                  );
              },
          }
        : null;

    const filterItems = [];

    if (cityFilter) {
        filterItems.push(cityFilter);
    }

    const applyHandle = () => {
        const newFilter = {
            page: 0,
        };
        dispatch(PointsFilterUpdateAction(newFilter));
        dispatch(
            GetPointsAction(history, queryString({ ...filter, ...newFilter }))
        );
    };

    const clearHandle = () => {
        const newFilter = {
            page: 0,
            cityId: null,
        };
        dispatch(PointsFilterUpdateAction(newFilter));
        dispatch(
            GetPointsAction(history, queryString({ ...filter, ...newFilter }))
        );
    };

    const changePage = (selectedItem: { selected: number }) => {
        const newPage = selectedItem.selected;
        dispatch(
            PointsFilterUpdateAction({
                page: newPage,
            })
        );
        dispatch(
            GetPointsAction(
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
                            <div className='entities__th'>Город</div>
                            <div className='entities__th'>Название</div>
                            <div className='entities__th'>Адрес</div>
                        </div>
                    </div>
                    <div className='entities__tbody'>
                        {points ? (
                            points.map((point) => (
                                <div
                                    className='entities__tr entities__link'
                                    key={point.id}
                                >
                                    <div className='entities__td'>
                                        {point.cityId?.name}
                                    </div>
                                    <div className='entities__td'>
                                        {point.name}
                                    </div>
                                    <div className='entities__td'>
                                        {point.address}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <>Загрузка пунктов выдачи</>
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
