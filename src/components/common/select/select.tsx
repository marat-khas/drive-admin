import { FC } from 'react';

import './select.scss';

import { SelectProps } from './types';

export const Select: FC<SelectProps> = ({ options, onChange }) => (
    <select className='select' onChange={onChange}>
        {options.map(({ label, value }) => (
            <option key={value} value={value}>
                {label}
            </option>
        ))}
    </select>
);
