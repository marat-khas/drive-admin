import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/common/button';
import { Filter } from '@components/filter';
import { Pagination } from '@components/pagination';
import { PointsAdd } from '@components/points/points-add';
import { PointsItem } from '@components/points/points-item';
import { GetCitiesAction } from '@state/cities/actions';
import { PointsFilterUpdateAction } from '@state/filter/actions';
import { PointsGetAction } from '@state/points/actions';
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

    const [addOpen, setAddOpen] = useState(false);

    useEffect(() => {
        if (!points) {
            dispatch(PointsGetAction(history));
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
            PointsGetAction(history, queryString({ ...filter, ...newFilter }))
        );
    };

    const clearHandle = () => {
        const newFilter = {
            page: 0,
            cityId: null,
        };
        dispatch(PointsFilterUpdateAction(newFilter));
        dispatch(
            PointsGetAction(history, queryString({ ...filter, ...newFilter }))
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
            PointsGetAction(
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
                <div className='entities__create'>
                    <Button
                        bg='green'
                        onClick={() => {
                            setAddOpen(true);
                        }}
                    >
                        Добавить новый офис
                    </Button>
                    <PointsAdd
                        open={addOpen}
                        closeHandle={() => {
                            setAddOpen(false);
                        }}
                    />
                </div>
                <div className='entities__table'>
                    <div className='entities__thead'>
                        <div className='entities__tr'>
                            <div className='entities__th'>Город</div>
                            <div className='entities__th'>Название</div>
                            <div className='entities__th'>Адрес</div>
                            <div className='entities__th' />
                        </div>
                    </div>
                    <div className='entities__tbody'>
                        {points ? (
                            points.map((point) => (
                                <PointsItem point={point} key={point.id} />
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
