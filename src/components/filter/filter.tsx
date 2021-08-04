import { FC } from 'react';

import { Button } from '@components/common/button';
import { Select } from '@components/common/select';

import './filter.scss';

import { FilterProps } from './types';

export const Filter: FC<FilterProps> = ({ items }) => (
    <div className='filter'>
        <div className='filter__wrapper'>
            <div className='filter__part'>
                <div className='filter__props'>
                    {items.map(({ id, options, onChange }) => (
                        <div className='filter__item' key={id}>
                            <Select options={options} onChange={onChange} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='filter__part'>
                <div className='filter__apply'>
                    <Button>Применить</Button>
                </div>
            </div>
        </div>
    </div>
);
