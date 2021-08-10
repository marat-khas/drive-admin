import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';
import { GetCitiesAction } from '@state/cities/actions';
import { getCities } from '@state/selectors';

import './filter.scss';

export const Filter: FC = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const cities = useSelector(getCities);
    const [selectedCity, setSelectedCity] = useState<string | null>(null);

    useEffect(() => {
        if (!cities) {
            dispatch(GetCitiesAction(history));
        }
    }, [cities, dispatch, history]);

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
              onChange: (id: string) => {
                  setSelectedCity(id);
              },
          }
        : null;

    const categories = useSelector(getCategories);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(
        null
    );

    useEffect(() => {
        if (!categories) {
            dispatch(GetCategoriesAction(history));
        }
    }, [categories, dispatch, history]);

    const categoryFilter = categories
        ? {
              id: 1,
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
              onChange: (id: string) => {
                  setSelectedCategory(id);
              },
          }
        : null;

    const filters = [];
    if (cityFilter) {
        filters.push(cityFilter);
    }
    if (categoryFilter) {
        filters.push(categoryFilter);
    }

    const clearHandle = () => {
        Array.from(document.querySelectorAll('.filter__props select')).forEach(
            (select) => {
                (select as HTMLSelectElement).selectedIndex = 0;
            }
        );

        handlers.forEach((handler) => {
            handler('default');
        });
    };

    return (
        <div className='filter'>
            <div className='filter__wrapper'>
                <div className='filter__part'>
                    <div className='filter__props'>
                        {items.map(({ id, options, onChange }) => {
                            handlers.push(onChange);
                            return (
                                <div className='filter__item' key={id}>
                                    <Select
                                        options={options}
                                        onChange={(e) => {
                                            onChange(
                                                e.target.selectedOptions[0]
                                                    .value
                                            );
                                        }}
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>
                <div className='filter__part'>
                    <div className='filter__clear'>
                        <Button bg='red' onClick={clearHandle}>
                            Сбросить
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
