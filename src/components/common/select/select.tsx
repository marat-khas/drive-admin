import { FC } from 'react';

import './select.scss';

import { SelectProps } from './types';

export const Select: FC<SelectProps> = ({
    options,
    onChange,
    selectedValue,
}) => (
    <select className='select' onChange={onChange}>
        {options.map(({ label, value }) => (
            <option
                key={value}
                value={value}
                selected={value === selectedValue}
            >
                {label}
            </option>
        ))}
    </select>
);
