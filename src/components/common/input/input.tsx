import { FC } from 'react';

import './input.scss';

import { InputProps } from './types';

export const Input: FC<InputProps> = ({ id, type = 'text', label }) => (
    <div className='input'>
        <label htmlFor={id} className='input__label'>
            {label}
        </label>
        <input type={type} id={id} className='input__inp' />
        <span className='input__error' />
    </div>
);
