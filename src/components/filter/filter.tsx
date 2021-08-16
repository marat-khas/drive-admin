import { FC } from 'react';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';

import './filter.scss';

import { FilterProps } from './types';

export const Filter: FC<FilterProps> = ({
    filterItems,
    applyHandle,
    clearHandle,
}) => (
    <div className='filter'>
        <div className='filter__wrapper'>
            <div className='filter__part'>
                <div className='filter__props'>
                    {filterItems.map(
                        ({ id, options, selectedValue, onChange }) => (
                            <div className='filter__item' key={id}>
                                <Select
                                    options={options}
                                    selectedValue={selectedValue}
                                    onChange={(e) => {
                                        onChange!(
                                            e.target.selectedOptions[0].value
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
