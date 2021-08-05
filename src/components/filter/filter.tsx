import { FC } from 'react';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';

import './filter.scss';

import { FilterProps } from './types';

export const Filter: FC<FilterProps> = ({ items }) => {

    const handlers: ((data: string) => void)[] = [];

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
